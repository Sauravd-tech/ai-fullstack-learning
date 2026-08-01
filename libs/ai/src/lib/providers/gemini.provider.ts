import { GoogleGenerativeAI, ResponseSchema } from '@google/generative-ai';
import { ENV, APP_CONFIG } from '@ai-fullstack-learning/shared';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY || 'MISSING_KEY');

export const generateChatStream = async (
  message: string, 
  history: any[], 
  systemInstruction: string, 
  onChunk: (chunk: string) => void
) => {
  const model = genAI.getGenerativeModel({
    model: APP_CONFIG.DEFAULT_LLM_MODEL,
    systemInstruction: systemInstruction || "You are a helpful AI chat assistant."
  });

  const chat = model.startChat({
    history: history || [],
  });

  const result = await chat.sendMessageStream(message);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    if (chunkText) {
      onChunk(chunkText);
    }
  }
};

export const generateStructuredData = async (
  prompt: string,
  systemInstruction: string,
  schema: ResponseSchema,
  pdfBuffer?: Buffer
) => {
  const model = genAI.getGenerativeModel({
    model: APP_CONFIG.DEFAULT_LLM_MODEL,
    systemInstruction: systemInstruction,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    }
  });

  const parts: any[] = [prompt];
  
  if (pdfBuffer) {
    parts.push({
      inlineData: {
        data: pdfBuffer.toString("base64"),
        mimeType: "application/pdf"
      }
    });
  }

  const result = await model.generateContent(parts);
  return result.response.text();
};
