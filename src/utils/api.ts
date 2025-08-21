import { Message, Conversation, Attachment } from '../types';

// Example static mock conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Machine Learning Model Analysis',
    messages: [
      {
        id: '1',
        content: 'Can you help me analyze this neural network architecture?',
        role: 'user',
        timestamp: new Date('2025-01-21T10:00:00Z'),
      },
      {
        id: '2',
        content:
          "I'd be happy to help you analyze your neural network architecture. As a domain-specific AI with expertise in ML/AI, I can provide detailed insights into model design, performance optimization, and architectural improvements. Please share your architecture details or diagrams.",
        role: 'assistant',
        timestamp: new Date('2025-01-21T10:01:00Z'),
      },
    ],
    createdAt: new Date('2025-01-21T10:00:00Z'),
    updatedAt: new Date('2025-01-21T10:01:00Z'),
  },
  {
    id: '2',
    title: 'Data Pipeline Optimization',
    messages: [
      {
        id: '3',
        content: 'What are the best practices for optimizing data pipelines?',
        role: 'user',
        timestamp: new Date('2025-01-20T15:30:00Z'),
      },
      {
        id: '4',
        content:
          'Excellent question! Data pipeline optimization is crucial for ML workflows. Here are the key best practices: 1) Implement data validation and quality checks, 2) Use efficient data formats like Parquet or Arrow, 3) Implement proper caching strategies, 4) Optimize batch sizes and parallel processing, 5) Monitor pipeline performance and bottlenecks.',
        role: 'assistant',
        timestamp: new Date('2025-01-20T15:31:00Z'),
      },
    ],
    createdAt: new Date('2025-01-20T15:30:00Z'),
    updatedAt: new Date('2025-01-20T15:31:00Z'),
  },
];

// Helper to read file content for text-based formats
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

// Validate API configuration
const validateApiConfig = (): string => {
  const apiKey = import.meta.env.VITE_OPENROUTER_LLAMA_KEY;

  if (!apiKey) {
    throw new Error('OpenRouter API key is missing. Please add VITE_OPENROUTER_API_KEY to your .env file.');
  }

  // OpenRouter API keys can have different formats, so we'll be more flexible
  if (!apiKey.startsWith('sk-')) {
    console.warn('API key format may be incorrect. OpenRouter keys typically start with "sk-"');
  }

  return apiKey;
};

// Create request payload
const createRequestPayload = (finalMessage: string) => {
  return {
    model: 'meta-llama/llama-3.3-70b-instruct:free', // Using OpenRouter free model
    messages: [
      {
        role: 'system',
        content: 'You are a helpful AI assistant specialized in AI/ML and file content analysis. Provide clear, accurate, and helpful responses.'
      },
      {
        role: 'user',
        content: finalMessage
      },
    ],
    max_tokens: 2000,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
};

// Enhanced error handling
const handleApiError = (error: any, res?: Response): string => {
  console.error('API Error Details:', error);

  if (error instanceof Error) {
    // Network errors
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return 'Network error: Unable to connect to the API. Please check your internet connection and try again.';
    }

    // API key errors
    if (error.message.includes('API key')) {
      return 'API key error: Please check that your OpenRouter API key is correctly configured in your .env file.';
    }

    // Other custom errors
    if (error.message.includes('OpenRouter API error')) {
      return error.message;
    }
  }

  // HTTP status errors
  if (res) {
    switch (res.status) {
      case 401:
        return 'Authentication failed: Invalid API key. Please check your OpenRouter API key.';
      case 402:
        return 'Payment required: Your OpenRouter account may be out of credits.';
      case 429:
        return 'Rate limit exceeded: Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error: The OpenRouter API is currently experiencing issues. Please try again later.';
      case 503:
        return 'Service unavailable: The API is temporarily unavailable. Please try again later.';
      default:
        return `API error (${res.status}): ${res.statusText}. Please try again.`;
    }
  }

  return 'An unexpected error occurred. Please try again or check the console for more details.';
};

export const sendMessage = async (message: string, attachments: Attachment[] = []): Promise<Message> => {
  try {
    console.log('🚀 Starting sendMessage...');

    // Validate API configuration
    const apiKey = validateApiConfig();
    console.log('✅ API key validated');

    let finalMessage = message;

    // Process attachments
    if (attachments.length > 0) {
      console.log(`📎 Processing ${attachments.length} attachments...`);

      for (const att of attachments) {
        if (att.file instanceof File) {
          const isTextFile = att.type.startsWith('text/') ||
            /\.(json|csv|py|js|ts|md|txt|html|css|xml|yaml|yml)$/i.test(att.name);

          if (isTextFile && att.size < 1000000) { // Limit to 1MB for text files
            try {
              const fileText = await readFileAsText(att.file);
              finalMessage += `\n\n---\nFile: ${att.name}\nType: ${att.type}\nSize: ${att.size} bytes\nContent:\n${fileText}\n---`;
              console.log(`✅ Processed text file: ${att.name}`);
            } catch (err) {
              console.warn(`⚠️ Could not read file ${att.name}:`, err);
              finalMessage += `\n\n[Could not read file: ${att.name}]`;
            }
          } else if (att.size >= 1000000) {
            finalMessage += `\n\n[File too large: ${att.name} (${Math.round(att.size / 1024 / 1024 * 100) / 100}MB) - Please use smaller files]`;
          } else {
            finalMessage += `\n\n[Attached file: ${att.name} (${att.type}) - Binary file not processed]`;
          }
        } else {
          finalMessage += `\n\n[Attached file: ${att.name} - ${att.url}]`;
        }
      }
    }

    // Create request payload
    const requestPayload = createRequestPayload(finalMessage);
    console.log('📝 Request payload created:', {
      model: requestPayload.model,
      messageLength: finalMessage.length,
      maxTokens: requestPayload.max_tokens
    });

    // Make API request with timeout (matching OpenRouter format)
    console.log('🌐 Sending request to OpenRouter API...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for free model

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin, // Required by OpenRouter
        'X-Title': 'AI Chat Assistant', // Optional site title for rankings
      },
      body: JSON.stringify(requestPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log(`📡 Response received: ${res.status} ${res.statusText}`);

    // Handle non-OK responses
    if (!res.ok) {
      let errorText = '';
      try {
        errorText = await res.text();
        console.error('❌ API Error Response:', errorText);
      } catch (e) {
        console.error('❌ Could not read error response:', e);
      }

      throw new Error(`OpenRouter API error: ${res.status} ${res.statusText}${errorText ? ` - ${errorText}` : ''}`);
    }

    // Parse response
    const data = await res.json();
    console.log('✅ API Response parsed successfully');

    // Validate response structure
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error('❌ Invalid response structure:', data);
      throw new Error('Invalid response structure: No choices array found');
    }

    const choice = data.choices[0];
    if (!choice.message || typeof choice.message.content !== 'string') {
      console.error('❌ Invalid message structure:', choice);
      throw new Error('Invalid response structure: No message content found');
    }

    const reply = choice.message.content.trim();
    if (!reply) {
      throw new Error('Empty response from model');
    }

    console.log('✅ Message processed successfully');

    // Log usage if available
    if (data.usage) {
      console.log('📊 Token usage:', data.usage);
    }

    return {
      id: Date.now().toString(),
      content: reply,
      role: 'assistant',
      timestamp: new Date(),
    };

  } catch (error) {
    console.error('❌ sendMessage error:', error);

    const errorMessage = handleApiError(error);

    return {
      id: Date.now().toString(),
      content: `❌ ${errorMessage}`,
      role: 'assistant',
      timestamp: new Date(),
    };
  }
};

export const uploadFile = async (file: File): Promise<Attachment> => {
  try {
    console.log('📤 Uploading file:', file.name, `(${Math.round(file.size / 1024 * 100) / 100}KB)`);

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error(`File too large: ${Math.round(file.size / 1024 / 1024 * 100) / 100}MB. Maximum size is 10MB.`);
    }

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const attachment: Attachment = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      url: URL.createObjectURL(file),
      file, // Keep original file so we can read its content later
    };

    console.log('✅ File uploaded successfully:', attachment.name);
    return attachment;

  } catch (error) {
    console.error('❌ Upload error:', error);
    throw error;
  }
};

// Utility function to test API connection
export const testApiConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const apiKey = validateApiConfig();

    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (res.ok) {
      return { success: true, message: 'API connection successful!' };
    } else {
      return { success: false, message: `API connection failed: ${res.status} ${res.statusText}` };
    }
  } catch (error) {
    return { success: false, message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
};

// Streaming version of sendMessage
export const sendMessageStream = async (
  message: string,
  attachments: Attachment[] = [],
  onChunk: (chunk: string) => void
): Promise<Message> => {
  try {
    console.log('🚀 Starting streaming message...');

    const apiKey = validateApiConfig();
    let finalMessage = message;

    // Process attachments (same as before)
    if (attachments.length > 0) {
      for (const att of attachments) {
        if (att.file instanceof File) {
          const isTextFile = att.type.startsWith('text/') ||
            /\.(json|csv|py|js|ts|md|txt|html|css|xml|yaml|yml)$/i.test(att.name);

          if (isTextFile && att.size < 1000000) {
            try {
              const fileText = await readFileAsText(att.file);
              finalMessage += `\n\n---\nFile: ${att.name}\nContent:\n${fileText}\n---`;
            } catch (err) {
              finalMessage += `\n\n[Could not read file: ${att.name}]`;
            }
          }
        }
      }
    }

    const requestPayload = {
      ...createRequestPayload(finalMessage),
      stream: true,
    };

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Chat Assistant',
      },
      body: JSON.stringify(requestPayload),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    let fullContent = '';
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                fullContent += content;
                onChunk(content);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return {
      id: Date.now().toString(),
      content: fullContent,
      role: 'assistant',
      timestamp: new Date(),
    };

  } catch (error) {
    console.error('❌ Streaming error:', error);
    const errorMessage = handleApiError(error);

    return {
      id: Date.now().toString(),
      content: `❌ ${errorMessage}`,
      role: 'assistant',
      timestamp: new Date(),
    };
  }
};

// Clean up object URLs when component unmounts
export const cleanupAttachments = (attachments: Attachment[]) => {
  attachments.forEach(att => {
    if (att.url.startsWith('blob:')) {
      URL.revokeObjectURL(att.url);
    }
  });
};