import React from "react";

interface LeafDecorationProps {
  className?: string;
  variant?: "small" | "medium" | "large";
  flip?: boolean;
}

const LeafDecoration: React.FC<LeafDecorationProps> = ({
  className = "",
  variant = "medium",
  flip = false,
}) => {
  const sizes = {
    small: { width: 40, height: 60 },
    medium: { width: 60, height: 90 },
    large: { width: 100, height: 150 },
  };

  const { width, height } = sizes[variant];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`leaf-decoration animate-float ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M30 5C15 15 5 35 5 55C5 75 20 85 30 85C40 85 55 75 55 55C55 35 45 15 30 5Z"
        fill="hsl(217 91% 60% / 0.3)"
        stroke="hsl(217 91% 60% / 0.5)"
        strokeWidth="1"
      />
      <path
        d="M30 15C30 15 30 75 30 75"
        stroke="hsl(217 91% 60% / 0.4)"
        strokeWidth="1.5"
      />
      <path
        d="M30 30C25 35 18 38 18 38"
        stroke="hsl(217 91% 60% / 0.3)"
        strokeWidth="1"
      />
      <path
        d="M30 45C35 50 42 53 42 53"
        stroke="hsl(217 91% 60% / 0.3)"
        strokeWidth="1"
      />
      <path
        d="M30 55C25 60 18 63 18 63"
        stroke="hsl(217 91% 60% / 0.3)"
        strokeWidth="1"
      />
    </svg>
  );
};

export const LeafCluster: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <LeafDecoration
        variant="small"
        className="absolute -top-2 -left-4 animate-float"
      />
      <LeafDecoration
        variant="medium"
        className="absolute top-0 left-0 animate-float-slow delay-200"
      />
      <LeafDecoration
        variant="small"
        flip
        className="absolute top-4 left-8 animate-float delay-300"
      />
    </div>
  );
};

export default LeafDecoration;
