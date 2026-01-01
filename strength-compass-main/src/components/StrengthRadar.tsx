import { motion } from 'framer-motion';
import { StrengthType, STRENGTHS } from '@/types/strength';
import { cn } from '@/lib/utils';

interface StrengthRadarProps {
  scores: Record<StrengthType, number>;
  size?: number;
}

export function StrengthRadar({ scores, size = 300 }: StrengthRadarProps) {
  const strengthTypes = Object.keys(STRENGTHS) as StrengthType[];
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size * 0.4;

  const strengthColorValues: Record<StrengthType, string> = {
    analytical: '#3b82f6',
    creative: '#a855f7',
    problem: '#14b8a6',
    leadership: '#f97316',
    emotional: '#ec4899',
    learning: '#0ea5e9',
    communication: '#22c55e',
    strategic: '#8b5cf6',
  };

  // Calculate polygon points
  const getPoint = (index: number, value: number) => {
    const angle = (index * 360) / strengthTypes.length - 90;
    const radian = (angle * Math.PI) / 180;
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
    };
  };

  // Generate polygon path
  const polygonPoints = strengthTypes
    .map((type, i) => {
      const point = getPoint(i, scores[type] || 0);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  // Generate grid circles
  const gridCircles = [20, 40, 60, 80, 100];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridCircles.map((value) => (
          <circle
            key={value}
            cx={centerX}
            cy={centerY}
            r={(value / 100) * maxRadius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {strengthTypes.map((_, i) => {
          const endPoint = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          points={polygonPoints}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Data points */}
        {strengthTypes.map((type, i) => {
          const point = getPoint(i, scores[type] || 0);
          return (
            <motion.circle
              key={type}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              cx={point.x}
              cy={point.y}
              r="6"
              fill={strengthColorValues[type]}
              stroke="white"
              strokeWidth="2"
              className="drop-shadow-md"
            />
          );
        })}
      </svg>

      {/* Labels */}
      {strengthTypes.map((type, i) => {
        const labelPoint = getPoint(i, 120);
        const strength = STRENGTHS[type];
        return (
          <motion.div
            key={type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 + 0.5 }}
            className="absolute text-center transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: labelPoint.x, top: labelPoint.y }}
          >
            <div className="text-lg mb-1">{strength.icon}</div>
            <div className="text-xs font-medium text-foreground whitespace-nowrap">
              {strength.name.split(' ')[0]}
            </div>
            <div className="text-xs text-muted-foreground">{scores[type]}%</div>
          </motion.div>
        );
      })}
    </div>
  );
}
