import express from 'express';
import cors from 'cors';
import { ENV } from '@ai-fullstack-learning/shared';
import { chatRoutes } from './features/chat';
import { resumeRoutes } from './features/resume';
import { requestIdMiddleware } from './middleware/requestId.middleware';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
const port = ENV.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/resume', resumeRoutes);

// Global Error Handler
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
