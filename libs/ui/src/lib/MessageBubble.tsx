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
  const isUser = msg.role === 'user';
  
  return (
    <div className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl leading-relaxed break-words animate-fade-in shadow-sm ${
      isUser 
        ? 'self-end bg-blue-600 text-white rounded-br-sm' 
        : 'self-start bg-bgSecondary border border-borderMain text-textMain rounded-bl-sm'
    }`}>
      {isUser ? (
        msg.text
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose-custom prose-sm md:prose-base dark:prose-invert">
          {msg.text}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MessageBubble;
