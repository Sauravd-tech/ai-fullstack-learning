import React from 'react';

interface SystemPromptSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SystemPromptSelect = ({ value, onChange }: SystemPromptSelectProps) => {
  return (
    <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label style={{ fontSize: '0.9rem', opacity: 0.8 }}>Persona:</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: 'var(--input-bg)',
          color: 'var(--text-color)',
          border: '1px solid var(--border-color)',
          padding: '5px 10px',
          borderRadius: '5px',
          outline: 'none',
          cursor: 'pointer'
        }}
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
