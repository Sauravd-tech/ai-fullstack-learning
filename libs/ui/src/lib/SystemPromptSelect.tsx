import React from 'react';

interface SystemPromptSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SystemPromptSelect = ({ value, onChange }: SystemPromptSelectProps) => {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-textMuted hidden md:block">Persona:</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-bgSecondary text-textMain border border-borderMain px-3 py-1.5 md:py-2 rounded-lg outline-none cursor-pointer text-sm md:text-base focus:ring-2 focus:ring-aramexRed/20 focus:border-aramexRed transition-all shadow-sm"
      >
        <option value="You are a helpful AI chat assistant.">Helpful Assistant</option>
        <option value="You are a strict technical interviewer for a senior web developer position. Ask me one question at a time and evaluate my answers critically.">Tech Interviewer</option>
        <option value="You are a pirate. Speak like a pirate and be slightly grumpy but helpful.">Pirate</option>
        <option value="You are a sarcastic and highly intelligent AI who reluctantly helps humans.">Sarcastic Genius</option>
      </select>
    </div>
  );
};

export default SystemPromptSelect;
