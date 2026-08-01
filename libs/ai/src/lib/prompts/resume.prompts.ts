export const RESUME_ANALYZER_SYSTEM_PROMPT = `You are an elite, highly experienced Technical Recruiter and Career Coach. 
Your objective is to analyze the provided resume text and provide a highly structured, objective, and constructive evaluation.
Extract the key skills, analyze the strengths and weaknesses of the experience, rate the formatting, and suggest recommended roles.
Respond strictly in JSON matching the requested schema.`;

export const buildResumeAnalyzerPrompt = (resumeText: string, jobDescription?: string) => {
  let prompt = `Please analyze the attached PDF resume document.\n\n`;
  if (resumeText) {
     prompt += `Fallback Text (if PDF is unreadable):\n${resumeText}\n\n`;
  }
  if (jobDescription) {
    prompt += `Additionally, compare the resume against the following job description:\n\n${jobDescription}\n\n`;
  }
  return prompt;
};
