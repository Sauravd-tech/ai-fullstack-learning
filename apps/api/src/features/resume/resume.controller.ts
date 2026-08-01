import { Request, Response, NextFunction } from 'express';
import { resumeService } from './resume.service';
import { ApiSuccess } from '@ai-fullstack-learning/types';

export const handleResumeAnalysis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestId = req.requestId;
    const file = req.file;

    if (!file) {
      const error: any = new Error('Resume PDF file is required');
      error.status = 400;
      throw error;
    }

    const { jobDescription } = req.body;

    const analysis = await resumeService.analyzeResume({
      fileBuffer: file.buffer,
      jobDescription,
      requestId,
    });

    const response: ApiSuccess<typeof analysis> = {
      success: true,
      data: analysis,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
