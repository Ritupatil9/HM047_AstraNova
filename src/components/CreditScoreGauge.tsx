import { useEffect, useState } from "react";

interface CreditScoreGaugeProps {
  score: number;
  maxScore?: number;
}

const getScoreCategory = (score: number) => {
  if (score >= 750) return { label: "Excellent", color: "hsl(150, 70%, 40%)" };
  if (score >= 700) return { label: "Good", color: "hsl(170, 60%, 45%)" };
  if (score >= 650) return { label: "Fair", color: "hsl(45, 95%, 55%)" };
  if (score >= 550) return { label: "Poor", color: "hsl(25, 95%, 53%)" };
  return { label: "Needs Work", color: "hsl(0, 72%, 51%)" };
};

export const CreditScoreGauge = ({ score, maxScore = 900 }: CreditScoreGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const category = getScoreCategory(score);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-48 h-48 score-gauge">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          {/* Score circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={category.color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isAnimating ? circumference : strokeDashoffset}
            className="transition-all duration-[1500ms] ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-display font-bold text-foreground">
            {displayScore}
          </span>
          <span className="text-sm text-muted-foreground mt-1">out of {maxScore}</span>
        </div>
      </div>
      
      {/* Category badge */}
      <div 
        className="mt-4 px-4 py-2 rounded-full text-sm font-medium"
        style={{ 
          backgroundColor: `${category.color}20`,
          color: category.color 
        }}
      >
        {category.label}
      </div>
    </div>
  );
};
