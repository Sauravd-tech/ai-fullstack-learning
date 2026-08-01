import { z } from 'zod';

export const ResumeSkillSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export const ResumeAnalysisResponseSchema = z.object({
  overallScore: z.number().min(0).max(100),
  summary: z.string(),
  skills: z.array(ResumeSkillSchema),
  experienceAnalysis: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
  }),
  formattingAndStyle: z.object({
    score: z.number().min(0).max(100),
    feedback: z.array(z.string()),
  }),
  recommendedRoles: z.array(z.string()),
  tailoredFeedback: z.string(),
});
