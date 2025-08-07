import React from 'react';
import { User, Bot, Paperclip } from 'lucide-react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 sm:mb-6`}>
      <div className={`flex space-x-2 sm:space-x-3 max-w-xs sm:max-w-2xl lg:max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
          }`}
        >
          {isUser ? (
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
          ) : (
            <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
              isUser
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900 border border-gray-200'
            }`}
          >
            <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
            
            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 sm:mt-3 space-y-2">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className={`flex items-center space-x-2 p-1.5 sm:p-2 rounded-lg ${
                      isUser
                        ? 'bg-blue-700'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <Paperclip className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium truncate">
                      {attachment.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;