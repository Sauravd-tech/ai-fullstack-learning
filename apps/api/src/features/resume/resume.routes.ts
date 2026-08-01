import express from 'express';
import multer from 'multer';
import { handleResumeAnalysis } from './resume.controller';
import { APP_CONFIG } from '@ai-fullstack-learning/shared';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: APP_CONFIG.MAX_UPLOAD_SIZE_MB,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

router.post('/analyze', upload.single('resume'), handleResumeAnalysis);

export default router;
