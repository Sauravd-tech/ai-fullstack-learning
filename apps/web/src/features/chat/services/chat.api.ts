export const sendChatMessage = async (message: string, history: any[], systemInstruction: string) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, systemInstruction }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};
