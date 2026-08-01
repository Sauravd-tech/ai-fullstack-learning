export const sendChatMessage = async (message: string, history: any[], systemInstruction: string) => {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, systemInstruction }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};
