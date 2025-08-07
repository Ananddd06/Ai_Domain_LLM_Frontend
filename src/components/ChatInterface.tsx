import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { Message, Attachment, Conversation } from '../types';
import { sendMessage } from '../utils/api';
import logo from '../Images/bedrock.png'; // ✅ Image import

const ChatInterface: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteConversation = (idToDelete: string) => {
    setConversations(prev => prev.filter(conversation => conversation.id !== idToDelete));
    if (selectedConversationId === idToDelete) {
      setSelectedConversationId(null);
    }
  };

  useEffect(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations([newConversation]);
    setSelectedConversationId(newConversation.id);
  }, []);

  const currentConversation = conversations.find(c => c.id === selectedConversationId);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const handleSendMessage = async (content: string, attachments: Attachment[]) => {
    if (!selectedConversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversationId
          ? { ...conv, messages: [...conv.messages, userMessage], updatedAt: new Date() }
          : conv
      )
    );

    setIsLoading(true);

    try {
      const aiResponse = await sendMessage(content, attachments);
      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversationId
            ? { ...conv, messages: [...conv.messages, aiResponse], updatedAt: new Date() }
            : conv
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversationId(newConversation.id);
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} sm:block fixed sm:relative z-30 h-full`}>
        <Sidebar
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={(id) => {
            setSelectedConversationId(id);
            setSidebarOpen(false);
          }}
          onNewConversation={() => {
            handleNewConversation();
            setSidebarOpen(false);
          }}
          onDeleteConversation={handleDeleteConversation}
        />
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* ✅ Logo image instead of Brain */}
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {currentConversation?.title || 'DomainAI Assistant'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Specialized AI for technical domains
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          {currentConversation?.messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center px-4">
                {/* ✅ Logo in welcome */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Welcome to DomainAI
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-md">
                  I'm your specialized AI assistant with deep expertise in technical domains. 
                  Ask me anything about AI/ML, upload files for analysis, or get help with complex problems.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {currentConversation?.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex justify-start mb-6">
                  <div className="flex space-x-3 max-w-3xl">
                    {/* ✅ Logo in loading */}
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-sm text-gray-500">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <MessageInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
