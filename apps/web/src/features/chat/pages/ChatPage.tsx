import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble, ChatInput, SystemPromptSelect } from '@ai-fullstack-learning/ui';
import { sendChatMessage } from '../services/chat.api';

export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [systemInstruction, setSystemInstruction] = useState("You are a helpful AI chat assistant.");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
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

      const reader = response.body.getReader();
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
    <div className="flex flex-col h-full w-full">
      <header className="chat-header shrink-0">
        <div>AI Chat Assistant</div>
        <SystemPromptSelect value={systemInstruction} onChange={setSystemInstruction} />
      </header>

      <div className="chat-messages flex-1 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center opacity-50 mt-10">
            Send a message to start chatting!
          </div>
        )}
        
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
        
        {loading && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 p-4 bg-bgMain border-t border-borderMain">
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


