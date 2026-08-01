import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  msg: {
    role: string;
    text: string;
  };
}

const MessageBubble = ({ msg }: MessageBubbleProps) => {
  return (
    <div className={`message-bubble ${msg.role === 'user' ? 'message-user' : 'message-ai'}`}>
      {msg.role === 'user' ? (
        msg.text
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {msg.text}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MessageBubble;
