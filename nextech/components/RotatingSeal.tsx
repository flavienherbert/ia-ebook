"use client";

import { sealText } from "@/config";

// Sceau circulaire : texte en rotation lente et infinie autour d'un cercle.
export default function RotatingSeal({
  size = 140,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const text = sealText.repeat(2);
  const id = "seal-path";

  return (
    <div
      className={`animate-spin-slow motion-reduce:animate-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <path
            id={id}
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <text fill="#C8A15A" fontSize="10.5" letterSpacing="2">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="#C8A15A"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
