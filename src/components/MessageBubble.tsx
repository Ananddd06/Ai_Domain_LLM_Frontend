import React from 'react';
import { Paperclip } from 'lucide-react';
import { Message } from '../types';
import llmLogo from '../Images/bedrock.png'; // <-- your LLM logo
import { useUser } from '@clerk/clerk-react'; // <-- to get user profile info
import FormattedMessageContent from './FormatedMessageContent'; // <-- 1. IMPORT THE FORMATTER

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const { user } = useUser();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 sm:mb-6`}>
      {/* For non-user messages (LLM) */}
      {!isUser && (
        <img
          src={llmLogo}
          alt="LLM Logo"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0 bg-white p-0.5 mr-3"
        />
      )}

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900 border border-gray-200'
          }`}
        >
          {/* 2. REPLACE THE ORIGINAL CONTENT DIV WITH THIS CONDITIONAL BLOCK */}
          <div className="text-sm sm:text-base leading-relaxed">
            {isUser ? (
              <div className="whitespace-pre-wrap">{message.content}</div>
            ) : (
              <FormattedMessageContent content={message.content} />
            )}
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
        <div
          className={`text-xs text-gray-500 mt-1 px-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {/* For user messages */}
      {isUser && (
        <img
          src={user?.imageUrl || '/default-avatar.png'}
          alt="User profile"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0 ml-3"
        />
      )}
    </div>
  );
};

export default MessageBubble;
