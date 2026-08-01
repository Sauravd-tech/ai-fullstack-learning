import { generateChatStream } from '@ai-fullstack-learning/ai';

export const chatService = {
  async processChat(message: string, history: any[], systemInstruction: string | undefined, onChunk: (chunk: string) => void) {
    return generateChatStream(message, history, systemInstruction, onChunk);
  }
};
