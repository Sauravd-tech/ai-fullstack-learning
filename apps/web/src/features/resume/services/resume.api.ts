export const analyzeResume = async (resumeText: string) => {
  const response = await fetch('http://localhost:3000/api/resume/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText }),
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};
