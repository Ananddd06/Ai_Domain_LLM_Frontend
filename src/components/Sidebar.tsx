import React from 'react';
import { MessageSquare, Plus, User, LogOut, Settings, Trash2 } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import { Conversation } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedConversationId,
  conversations,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}) => {
  const { signOut, user } = useClerk();

  const renderConversationItem = (conversation: Conversation) => {
    const isSelected = selectedConversationId === conversation.id;
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    const messagePreview = lastMessage?.content
      ? lastMessage.content.slice(0, 5) + (lastMessage.content.length > 5 ? '...' : '')
      : 'No messages yet';

    // Dynamically generate a title from the first message, or use the conversation's original title as a fallback.
    const displayTitle = conversation.messages[0]?.content
      ? conversation.messages[0].content.split(' ').slice(0, 3).join(' ') + '...'
      : conversation.title; // Use conversation.title as the fallback

    return (
      <div key={conversation.id} className="relative group">
        <button
          onClick={() => onSelectConversation(conversation.id)}
          className={`w-full text-left p-2 pr-10 sm:p-3 sm:pr-12 rounded-lg transition-colors ${
            isSelected
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <div className="flex items-start space-x-0 sm:space-x-3">
            <MessageSquare className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0 hidden sm:block">
              {/* --- MODIFIED LINE --- */}
              <div className="text-sm font-medium truncate">{displayTitle}</div>
              <div className="text-xs text-gray-400 mt-1 truncate">
                {messagePreview}
              </div>
            </div>
          </div>
        </button>
        <button
          onClick={() => onDeleteConversation(conversation.id)}
          className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all z-10"
          title="Delete conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="w-full sm:w-80 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center sm:justify-start space-x-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">New Conversation</span>
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2">
        {conversations.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-4">No conversations yet</p>
        ) : (
          conversations.map(renderConversationItem)
        )}
      </div>

      {/* User Profile */}
      <div className="p-2 sm:p-4 border-t border-gray-700">
        <div className="flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0 hidden sm:block">
            <div className="text-sm font-medium truncate">{user?.firstName || 'User'}</div>
            <div className="text-xs text-gray-400 truncate">{user?.primaryEmailAddress?.emailAddress}</div>
          </div>
        </div>

        <div className="flex justify-center sm:justify-start space-x-2">
          <button
            className="flex-1 sm:flex-initial p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => signOut()}
            className="flex-1 sm:flex-initial p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;