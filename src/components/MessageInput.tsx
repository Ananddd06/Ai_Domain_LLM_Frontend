import React, { useState, useRef } from 'react';
import { Send, Paperclip, X, Image, FileText } from 'lucide-react';
import { Attachment } from '../types';
import { uploadFile } from '../utils/api';

interface MessageInputProps {
  onSendMessage: (message: string, attachments: Attachment[], model: string) => void;
  isLoading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [selectedModel, setSelectedModel] = useState('quen'); // default model = Quen
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments, selectedModel);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleFileSelect = async (files: FileList) => {
    const newAttachments: Attachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const attachment = await uploadFile(file);
        newAttachments.push(attachment);
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
    }
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-gray-200 bg-white p-3 sm:p-4">
      {/* Model Selector (separate, above input box) */}
      <div className="mb-3 flex justify-end">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm px-2 py-1 bg-white"
          disabled={isLoading}
        >
          <option value="quen">Quen</option>
          <option value="llama">LLaMA</option>
        </select>
      </div>

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center space-x-2 bg-gray-100 px-2 sm:px-3 py-2 rounded-lg"
            >
              {attachment.type.startsWith('image/') ? (
                <Image className="w-4 h-4 text-blue-600" />
              ) : (
                <FileText className="w-4 h-4 text-gray-600" />
              )}
              <span className="text-xs sm:text-sm font-medium truncate max-w-20 sm:max-w-32">
                {attachment.name}
              </span>
              <button
                onClick={() => removeAttachment(attachment.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <div
          className={`relative border-2 border-dashed rounded-xl transition-all ${
            dragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex items-end space-x-2 sm:space-x-3 p-3 sm:p-4">
            {/* File Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
              title="Attach files"
            >
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Message Input */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type your message..."
              className="flex-1 resize-none border-none outline-none bg-transparent text-gray-900 placeholder-gray-500 max-h-32 min-h-[36px] sm:min-h-[40px] text-sm sm:text-base"
              rows={1}
              disabled={isLoading}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={(!message.trim() && attachments.length === 0) || isLoading}
              className="p-1.5 sm:p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Drop Zone Overlay */}
          {dragOver && (
            <div className="absolute inset-0 bg-blue-50 bg-opacity-90 border-2 border-blue-400 border-dashed rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Paperclip className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-600 font-medium text-sm sm:text-base">Drop files here to attach</p>
              </div>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          accept="image/*,.pdf,.doc,.docx,.txt,.json,.csv,.py,.js,.ts,.jsx,.tsx"
        />
      </form>
    </div>
  );
};

export default MessageInput;
