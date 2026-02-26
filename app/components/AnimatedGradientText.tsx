'use client';

type AnimatedGradientTextProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
};

export function AnimatedGradientText({
  children,
  className = '',
  speed = 1,
  colorFrom = '#111',
  colorTo = '#737373',
}: AnimatedGradientTextProps) {
  const duration = 3 / speed;

  return (
    <span
      className={`inline-block ${className}`.trim()}
      style={
        {
          background: `linear-gradient(90deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          animation: `animated-gradient-text ${duration}s linear infinite`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
