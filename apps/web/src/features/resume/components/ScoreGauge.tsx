import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = 'text-red-500'; // 0-59
  let bgColor = 'text-red-500/20';
  if (score >= 80) {
    color = 'text-emerald-500';
    bgColor = 'text-emerald-500/20';
  } else if (score >= 60) {
    color = 'text-yellow-500';
    bgColor = 'text-yellow-500/20';
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`${bgColor} transition-colors duration-300`}
        />
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-4xl font-extrabold ${color} drop-shadow-sm`}>
          {score}
        </span>
        <span className="text-xs font-semibold text-textMuted uppercase tracking-wider">
          Score
        </span>
      </div>
    </div>
  );
};
