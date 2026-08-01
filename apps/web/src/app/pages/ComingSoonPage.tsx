import React from 'react';

const ComingSoonPage = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-textMain">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg opacity-70">This feature is coming soon in the next phase!</p>
    </div>
  );
};

export default ComingSoonPage;
