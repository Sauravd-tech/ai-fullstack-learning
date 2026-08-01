import React from 'react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: (e?: React.FormEvent) => void;
  loading: boolean;
}

const ChatInput = ({ input, setInput, handleSend, loading }: ChatInputProps) => {
  return (
    <form className="flex gap-3 max-w-4xl mx-auto w-full" onSubmit={handleSend}>
      <input 
        type="text" 
        className="flex-1 px-5 py-4 rounded-full border border-borderMain bg-bgSecondary text-textMain focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        disabled={loading}
      />
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-full w-14 h-14 flex justify-center items-center cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex-shrink-0"
        disabled={!input.trim() || loading}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-[-2px]">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
