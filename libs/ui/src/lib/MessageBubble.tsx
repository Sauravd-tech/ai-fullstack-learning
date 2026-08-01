import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  msg: {
    role: string;
    text: string;
    isStreaming?: boolean;
  };
}

const MessageBubble = ({ msg }: MessageBubbleProps) => {
  const isUser = msg.role === 'user';
  
  return (
    <div className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl leading-relaxed break-words animate-fade-in shadow-sm ${
      isUser 
        ? 'self-end bg-brandRed text-white rounded-br-sm' 
        : `self-start bg-bgSecondary border border-borderMain text-textMain rounded-bl-sm ${msg.isStreaming ? 'animate-shimmer bg-gradient-to-r from-bgSecondary via-slate-100 dark:via-slate-800 to-bgSecondary bg-[length:200%_100%]' : ''}`
    }`}>
      {isUser ? (
        msg.text
      ) : (
        <div className="prose-custom prose-sm md:prose-base dark:prose-invert relative">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {msg.text}
          </ReactMarkdown>
          {msg.isStreaming && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-brandRed animate-pulse align-middle"></span>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
