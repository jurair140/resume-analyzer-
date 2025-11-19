import { useEffect, useState } from "react";

interface ScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const ScoreCircle = ({ score, size = 200, strokeWidth = 12 }: ScoreCircleProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animatedScore < score) {
        setAnimatedScore(prev => Math.min(prev + 1, score));
      }
    }, 20);

    return () => clearTimeout(timer);
  }, [animatedScore, score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "hsl(var(--primary))";
    if (score >= 60) return "hsl(45 93% 47%)";
    return "hsl(var(--destructive))";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold" style={{ color: getScoreColor(score) }}>
            {animatedScore}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            out of 100
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-xl font-semibold" style={{ color: getScoreColor(score) }}>
          {getScoreLabel(score)}
        </div>
        <div className="text-sm text-muted-foreground">ATS Compatibility</div>
      </div>
    </div>
  );
};

export default ScoreCircle;
