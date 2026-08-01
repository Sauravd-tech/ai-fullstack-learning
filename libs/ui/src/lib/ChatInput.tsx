import React from 'react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: (e?: React.FormEvent) => void;
  loading: boolean;
}

const ChatInput = ({ input, setInput, handleSend, loading }: ChatInputProps) => {
  return (
    <form className="chat-input-container" onSubmit={handleSend}>
      <input 
        type="text" 
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        disabled={loading}
      />
      <button 
        type="submit" 
        className="send-button"
        disabled={!input.trim() || loading}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
