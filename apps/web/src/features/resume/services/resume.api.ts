export const analyzeResume = async (resumeText: string) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/resume/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText }),
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};
