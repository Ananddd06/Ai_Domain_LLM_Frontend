import { Message, Conversation, Attachment } from '../types';

// Mock API functions - replace with actual API calls
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
        content: 'I\'d be happy to help you analyze your neural network architecture. As a domain-specific AI with expertise in ML/AI, I can provide detailed insights into model design, performance optimization, and architectural improvements. Please share your architecture details or diagrams.',
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
        content: 'Excellent question! Data pipeline optimization is crucial for ML workflows. Here are the key best practices: 1) Implement data validation and quality checks, 2) Use efficient data formats like Parquet or Arrow, 3) Implement proper caching strategies, 4) Optimize batch sizes and parallel processing, 5) Monitor pipeline performance and bottlenecks.',
        role: 'assistant',
        timestamp: new Date('2025-01-20T15:31:00Z'),
      },
    ],
    createdAt: new Date('2025-01-20T15:30:00Z'),
    updatedAt: new Date('2025-01-20T15:31:00Z'),
  },
];

export const sendMessage = async (message: string, attachments: Attachment[] = []): Promise<Message> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: Date.now().toString(),
    content: `This is a simulated response to: "${message}". As your domain-specific AI assistant, I'm analyzing your query and providing contextual insights based on my specialized knowledge in AI/ML, computer science, and technical domains.`,
    role: 'assistant',
    timestamp: new Date(),
  };
};

export const uploadFile = async (file: File): Promise<Attachment> => {
  // Simulate file upload
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: Date.now().toString(),
    name: file.name,
    type: file.type,
    size: file.size,
    url: URL.createObjectURL(file),
  };
};