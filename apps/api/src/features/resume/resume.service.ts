
import { APP_CONFIG } from '@ai-fullstack-learning/shared';
import { llmService, RESUME_ANALYZER_SYSTEM_PROMPT, buildResumeAnalyzerPrompt } from '@ai-fullstack-learning/ai';
import { ResumeAnalysisResponseSchema } from './resume.schema';

import { SchemaType } from '@google/generative-ai';

// Gemini SDK requires JSON Schema properties for structured output
const geminiResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    overallScore: { type: SchemaType.NUMBER },
    summary: { type: SchemaType.STRING },
    skills: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          category: { type: SchemaType.STRING },
          items: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        },
        required: ["category", "items"],
      },
    },
    experienceAnalysis: {
      type: SchemaType.OBJECT,
      properties: {
        strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        weaknesses: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      },
      required: ["strengths", "weaknesses"],
    },
    formattingAndStyle: {
      type: SchemaType.OBJECT,
      properties: {
        score: { type: SchemaType.NUMBER },
        feedback: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      },
      required: ["score", "feedback"],
    },
    recommendedRoles: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    tailoredFeedback: { type: SchemaType.STRING },
  },
  required: [
    "overallScore",
    "summary",
    "skills",
    "experienceAnalysis",
    "formattingAndStyle",
    "recommendedRoles",
    "tailoredFeedback",
  ],
};

export const resumeService = {
  async analyzeResume(params: {
    fileBuffer: Buffer;
    jobDescription?: string;
    requestId: string;
  }) {
    const { fileBuffer, jobDescription, requestId } = params;

    const startTotalTime = Date.now();
    console.log(`[${requestId}] Upload received, tracking started.`);

    // 1. Pass PDF directly to Gemini
    // We completely skip pdf-parse because Gemini natively supports multi-modal PDF parsing!
    const extractedText = 'Resume PDF provided as inline data.';

    // 2. Validate PDF exists
    if (!fileBuffer || fileBuffer.length === 0) {
      const error: any = new Error(
        'Empty PDF file uploaded.'
      );
      error.status = 422;
      throw error;
    }

    // 3. AI Request
    console.log(`[${requestId}] AI request started (Direct PDF Multimodal).`);
    const startAiTime = Date.now();

    const prompt = buildResumeAnalyzerPrompt('', jobDescription); // Text prompt is empty, we rely on the inline PDF
    const rawAiResponse = await llmService.generateStructuredData(
      prompt,
      RESUME_ANALYZER_SYSTEM_PROMPT,
      geminiResponseSchema as any,
      fileBuffer
    );

    const aiDuration = Date.now() - startAiTime;
    console.log(`[${requestId}] AI response received in ${aiDuration}ms.`);

    // 4. Validate AI JSON Response
    let parsedJson;
    try {
      const cleanedResponse = rawAiResponse.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
      parsedJson = JSON.parse(cleanedResponse);
    } catch (e) {
      console.error(`[${requestId}] Failed to parse AI response as JSON:`, rawAiResponse);
      const error: any = new Error('Received malformed response from AI provider.');
      error.status = 502;
      throw error;
    }

    const validationResult = ResumeAnalysisResponseSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      console.error(
        `[${requestId}] AI response schema validation failed:`,
        validationResult.error.format()
      );
      const error: any = new Error('AI response did not match the expected schema.');
      error.status = 502;
      throw error;
    }

    console.log(
      `[${requestId}] Total request duration: ${Date.now() - startTotalTime}ms.`
    );

    return validationResult.data;
  },
};
