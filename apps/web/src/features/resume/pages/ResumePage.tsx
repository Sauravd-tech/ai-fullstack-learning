import React, { useState, useRef } from 'react';
import { ApiResponse, ResumeAnalysisResponse } from '@ai-fullstack-learning/types';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Briefcase, Star } from 'lucide-react';
import { ScoreGauge } from '../components/ScoreGauge';

export const ResumePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be under 5MB.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/resume/analyze`, {
        method: 'POST',
        body: formData,
      });

      const responseData: ApiResponse<ResumeAnalysisResponse> = await res.json();

      if (!responseData.success) {
        setError(responseData.error.message || 'An error occurred during analysis.');
      } else {
        setResult(responseData.data);
      }
    } catch (err: any) {
      setError(err.message || 'Network error or server is unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-4 sm:p-8">
      <div className="flex flex-col items-center justify-start min-h-full max-w-5xl mx-auto space-y-8 pb-12">
      <div className="text-center mt-4 md:mt-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brandRed to-brandRedDark tracking-tight drop-shadow-sm">
          AI Resume Analyzer
        </h1>
        <p className="text-textMuted max-w-2xl mx-auto text-lg">
          Upload your resume and optional job description for a deep AI-driven analysis.
        </p>
      </div>

      {!result && !loading && (
        <div className="w-full max-w-2xl bg-bgSecondary border border-borderMain rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-6 animate-slide-up">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 md:p-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              file ? 'border-emerald-500 bg-emerald-500/10' : 'border-borderMain hover:border-brandRed hover:bg-brandRed/5 hover:shadow-lg hover:shadow-brandRed/10'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />
            {file ? (
              <>
                <FileText className="w-14 h-14 text-emerald-500 mb-4 animate-pulse-slow" />
                <div className="font-semibold text-lg text-textMain">{file.name}</div>
                <div className="text-textMuted text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </>
            ) : (
              <>
                <UploadCloud className="w-14 h-14 text-brandRed mb-4 opacity-80" />
                <div className="font-semibold text-lg mb-2 text-textMain">Drag and drop your resume (PDF)</div>
                <div className="text-textMuted text-sm">or click to browse from your computer (Max 5MB)</div>
              </>
            )}
          </div>

          <div className="space-y-3">
            <label className="font-semibold text-sm text-textMuted uppercase tracking-wide">Target Job Description (Optional)</label>
            <textarea
              className="w-full bg-bgMain border border-borderMain rounded-xl p-4 h-32 focus:outline-none focus:border-brandRed focus:ring-2 focus:ring-brandRed/20 transition-all text-textMain resize-none"
              placeholder="Paste the job description here to tailor the analysis..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full bg-gradient-to-r from-brandRed to-brandRedDark hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-xl hover:shadow-brandRed/20 flex justify-center items-center gap-2 text-lg transform hover:-translate-y-1 active:translate-y-0 disabled:transform-none"
          >
            Analyze Resume
          </button>
        </div>
      )}

      {loading && (
        <div className="w-full max-w-4xl space-y-8 animate-pulse-slow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-48 bg-bgSecondary border border-borderMain rounded-3xl shadow-sm"></div>
            <div className="h-48 md:col-span-2 bg-bgSecondary border border-borderMain rounded-3xl shadow-sm"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-bgSecondary border border-borderMain rounded-3xl shadow-sm"></div>
            <div className="h-64 bg-bgSecondary border border-borderMain rounded-3xl shadow-sm"></div>
          </div>
          <div className="flex flex-col items-center mt-8 space-y-4">
             <div className="w-12 h-12 border-4 border-brandRed border-t-transparent rounded-full animate-spin"></div>
             <p className="text-textMuted font-medium animate-pulse">Our AI is reading your resume...</p>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="w-full max-w-5xl space-y-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bgSecondary border border-borderMain rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-transform duration-300 animate-slide-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <ScoreGauge score={result.overallScore} />
              <div className="mt-4 font-semibold text-textMuted uppercase tracking-wide text-sm">Overall Match Score</div>
            </div>
            <div className="md:col-span-2 bg-bgSecondary border border-borderMain rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-4 transform hover:scale-[1.01] transition-transform duration-300 animate-slide-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <h3 className="text-2xl font-bold flex items-center gap-2 text-textMain">
                <Star className="w-6 h-6 text-yellow-500 drop-shadow-sm" />
                Executive Summary
              </h3>
              <p className="text-textMuted leading-relaxed text-lg">{result.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bgSecondary border border-borderMain rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-5 animate-slide-up delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <h3 className="text-2xl font-bold flex items-center gap-2 text-textMain">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                Key Strengths
              </h3>
              <ul className="space-y-3">
                {result.experienceAnalysis.strengths.map((str, i) => (
                  <li key={i} className="flex gap-3 text-textMuted items-start">
                    <span className="text-emerald-500 mt-1 text-lg leading-none">•</span> 
                    <span className="leading-relaxed">{str}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Areas for Improvement */}
            <div className="bg-bgSecondary rounded-3xl p-8 border border-borderMain shadow-sm animate-slide-up delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-textMain">
                <AlertCircle className="w-6 h-6 text-red-500" />
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {result.experienceAnalysis.weaknesses.map((weak, i) => (
                  <li key={i} className="flex gap-3 text-textMuted items-start">
                    <span className="text-red-500 mt-1 text-lg leading-none">•</span> 
                    <span className="leading-relaxed">{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-bgSecondary border border-borderMain rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-6 animate-slide-up delay-500 opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h3 className="text-2xl font-bold flex items-center gap-2 text-textMain">
              <Briefcase className="w-6 h-6 text-purple-500" />
              Skill Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.skills.map((skillGroup, i) => (
                <div key={i} className="space-y-4">
                  <div className="font-bold text-textMain border-b border-borderMain pb-2">{skillGroup.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, j) => (
                      <span
                        key={j}
                        className="px-3 py-1.5 bg-brandRed/10 text-brandRed dark:text-red-400 border border-brandRed/20 rounded-lg text-sm font-medium hover:bg-brandRed/20 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button
              onClick={() => {
                setResult(null);
                setFile(null);
                setJobDescription('');
              }}
              className="px-8 py-4 bg-bgSecondary text-textMain border border-borderMain hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-bold transition-colors shadow-sm"
            >
              Analyze Another Resume
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
