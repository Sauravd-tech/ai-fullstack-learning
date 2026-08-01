export interface ResumeAnalysisRequest {
  jobDescription?: string;
}

export interface ResumeSkill {
  category: string;
  items: string[];
}

export interface ResumeAnalysisResponse {
  overallScore: number;
  summary: string;
  skills: ResumeSkill[];
  experienceAnalysis: {
    strengths: string[];
    weaknesses: string[];
  };
  formattingAndStyle: {
    score: number;
    feedback: string[];
  };
  recommendedRoles: string[];
  tailoredFeedback: string;
}
