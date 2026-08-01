import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  GEMINI_API_KEY: process.env['GEMINI_API_KEY'] || '',
  PORT: process.env['PORT'] || '3000',
  NODE_ENV: process.env['NODE_ENV'] || 'development',
};

// Validate required environment variables here if necessary
if (!ENV.GEMINI_API_KEY) {
  console.warn('WARNING: GEMINI_API_KEY is missing from environment variables.');
}
