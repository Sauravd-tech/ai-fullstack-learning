import { ResponseSchema } from '@google/generative-ai';
import { generateStructuredData } from '../providers/gemini.provider';

export const llmService = {
  async generateStructuredData(
    prompt: string,
    systemInstruction: string,
    schema: ResponseSchema,
    pdfBuffer?: Buffer
  ): Promise<string> {
    // In the future, this can dynamically route to OpenAI, Claude, etc based on config or load
    return await generateStructuredData(prompt, systemInstruction, schema, pdfBuffer);
  }
};
