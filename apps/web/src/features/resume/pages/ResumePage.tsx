import React, { useState, useRef } from 'react';
import { ApiResponse, ResumeAnalysisResponse } from '@ai-fullstack-learning/types';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Briefcase, Star, Loader2 } from 'lucide-react';

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
      const res = await fetch('http://localhost:3000/api/resume/analyze', {
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
      <div className="flex flex-col items-center justify-start min-h-full max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          AI Resume Analyzer
        </h1>
        <p className="opacity-80 max-w-2xl mx-auto text-lg">
          Upload your resume and optional job description for a deep AI-driven analysis.
        </p>
      </div>

      {!result && (
        <div className="w-full max-w-2xl bg-bgMain border border-borderMain rounded-2xl p-8 shadow-xl space-y-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
              file ? 'border-green-500 bg-green-500/10' : 'border-borderMain hover:border-blue-500 hover:bg-blue-500/5'
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
                <FileText className="w-12 h-12 text-green-500 mb-4" />
                <div className="font-semibold text-lg">{file.name}</div>
                <div className="opacity-60 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-blue-500 mb-4" />
                <div className="font-semibold text-lg mb-2">Drag and drop your resume (PDF)</div>
                <div className="opacity-60 text-sm">or click to browse from your computer (Max 5MB)</div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-sm opacity-80">Target Job Description (Optional)</label>
            <textarea
              className="w-full bg-bgDark border border-borderMain rounded-lg p-3 h-32 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Paste the job description here to tailor the analysis..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              'Analyze Resume'
            )}
          </button>
        </div>
      )}

      {result && (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bgMain border border-borderMain rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center space-y-2">
              <div className="text-5xl font-bold text-blue-500">{result.overallScore}/100</div>
              <div className="font-semibold opacity-80">Overall Match Score</div>
            </div>
            <div className="md:col-span-2 bg-bgMain border border-borderMain rounded-2xl p-6 shadow-lg space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Executive Summary
              </h3>
              <p className="opacity-80 leading-relaxed">{result.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bgMain border border-borderMain rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Key Strengths
              </h3>
              <ul className="space-y-2">
                {result.experienceAnalysis.strengths.map((str, i) => (
                  <li key={i} className="flex gap-2 text-sm opacity-80">
                    <span className="text-green-500 mt-1">•</span> {str}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bgMain border border-borderMain rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {result.experienceAnalysis.weaknesses.map((weak, i) => (
                  <li key={i} className="flex gap-2 text-sm opacity-80">
                    <span className="text-red-500 mt-1">•</span> {weak}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-bgMain border border-borderMain rounded-2xl p-6 shadow-lg space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-500" />
              Skill Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.skills.map((skillGroup, i) => (
                <div key={i} className="space-y-3">
                  <div className="font-semibold">{skillGroup.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs"
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
              className="px-6 py-3 border border-borderMain hover:bg-bgDark rounded-lg transition-colors"
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
