import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble, ChatInput, SystemPromptSelect } from '@ai-fullstack-learning/ui';
import { sendChatMessage } from '../services/chat.api';

export const ChatPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [systemInstruction, setSystemInstruction] = useState("You are a helpful AI chat assistant.");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;

    const userMessage = { text: input, role: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await sendChatMessage(userMessage.text, history, systemInstruction);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      setMessages(prev => [...prev, { text: '', role: 'model', isStreaming: true }]);
      setLoading(false); 

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader found');
      
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            text: newMessages[lastIndex].text + chunkText
          };
          return newMessages;
        });
      }

      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        newMessages[lastIndex] = {
          ...newMessages[lastIndex],
          isStreaming: false
        };
        return newMessages;
      });

    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, { text: "Error: Could not connect to the server.", role: 'model' }]);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto bg-bgMain shadow-2xl shadow-slate-200/10 dark:shadow-none transition-all duration-300">
      <header className="shrink-0 p-4 md:p-6 border-b border-borderMain bg-bgSecondary/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 sticky top-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            AI Chat Assistant
          </h2>
          <p className="text-sm text-textMuted hidden md:block">Real-time streaming conversation</p>
        </div>
        <SystemPromptSelect value={systemInstruction} onChange={setSystemInstruction} />
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center mt-20 flex flex-col items-center justify-center animate-fade-in">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-textMain mb-2">How can I help you today?</h3>
            <p className="text-textMuted max-w-md">Send a message to start chatting. I can write code, analyze data, or just have a conversation.</p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col w-full">
            <MessageBubble msg={msg} />
          </div>
        ))}
        
        {loading && (
          <div className="self-start bg-bgSecondary border border-borderMain px-4 py-3 rounded-2xl rounded-bl-sm flex gap-2 items-center animate-pulse shadow-sm">
            <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="shrink-0 p-4 md:p-6 bg-bgMain border-t border-borderMain">
        <ChatInput 
          input={input} 
          setInput={setInput} 
          handleSend={handleSend} 
          loading={loading || (messages.length > 0 && messages[messages.length - 1].isStreaming)} 
        />
      </div>
    </div>
  );
};


