import { Request, Response } from 'express';
import { chatService } from './chat.service';

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message, history, systemInstruction } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key is missing in backend' });
    }

    // Set headers for Server-Sent Events (SSE) or chunked streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    await chatService.processChat(message, history, systemInstruction, (chunk) => {
      // Write each chunk to the response stream
      res.write(chunk);
    });

    // End the response once streaming is complete
    res.end();

  } catch (error) {
    console.error('Error generating AI response:', error);
    // If headers have not been sent, we can send a 500 status.
    // Otherwise, we just have to end the stream.
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate response' });
    } else {
      res.write('\n\n[ERROR: Failed to finish generating response]');
      res.end();
    }
  }
};
