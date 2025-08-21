import React from "react";

export default function WaveSVG({ width, height, A, lambda, phase, samples = 300 }) {
  const k = (2 * Math.PI) / lambda;
  let d = "";
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * width;
    const y = height / 2 - A * Math.sin(k * x + phase);
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return (
    <svg role="img" aria-label="Animated wave" width={width} height={height} className="w-full rounded-2xl bg-gradient-to-b from-white to-indigo-50 shadow-inner">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={3} className="text-indigo-600" />
      <line x1={0} x2={width} y1={height / 2} y2={height / 2} className="stroke-gray-300" strokeDasharray={6} />
    </svg>
  );
}
