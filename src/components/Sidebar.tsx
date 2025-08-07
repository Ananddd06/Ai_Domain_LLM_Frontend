import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  User,
  LogOut,
  Settings,
  Trash2,
  Search,
} from 'lucide-react';
import logo from '../Images/bedrock.png';
import { useClerk } from '@clerk/clerk-react';
import { Conversation } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onSearchChange?: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedConversationId,
  conversations,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onSearchChange,
}) => {
  const { signOut, user } = useClerk();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const renderConversationItem = (conversation: Conversation) => {
    const isSelected = selectedConversationId === conversation.id;
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    const messagePreview = lastMessage?.content
      ? lastMessage.content.slice(0, 5) + (lastMessage.content.length > 5 ? '...' : '')
      : 'No messages yet';

    const displayTitle = conversation.messages[0]?.content
      ? conversation.messages[0].content.split(' ').slice(0, 3).join(' ') + '...'
      : conversation.title;

    return (
      <div key={conversation.id} className="relative group">
        <button
          onClick={() => onSelectConversation(conversation.id)}
          className={`w-full text-left p-2 pr-10 sm:p-3 sm:pr-12 rounded-lg transition-colors ${
            isSelected
              ? 'bg-[#2c2c2c] text-white'
              : 'text-gray-300 hover:bg-[#2c2c2c] hover:text-white'
          }`}
        >
          <div className="flex items-start space-x-3">
            <MessageSquare className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{displayTitle}</div>
              <div className="text-xs text-gray-400 mt-1 truncate">{messagePreview}</div>
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
    <div className="w-full sm:w-72 bg-[#1e1e1e] text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Bedrock Logo"
            className="h-10 sm:h-12 object-contain"
          />
        </div>

        {/* New Chat Button */}
        <button
          onClick={onNewConversation}
          className="flex items-center gap-2 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Chat</span>
        </button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search chats..."
            className="w-full pl-10 pr-3 py-2 bg-gray-800 text-sm text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h2 className="text-sm text-gray-400 uppercase mb-2">Chats</h2>
        {conversations.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-4">No conversations yet</p>
        ) : (
          conversations.map(renderConversationItem)
        )}
      </div>

      {/* Footer - User Info + Actions */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={user?.imageUrl}
            alt="User profile"
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.firstName || 'User'}</div>
            <div className="text-xs text-gray-400 truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => signOut()}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
