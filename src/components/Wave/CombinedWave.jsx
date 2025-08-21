import React from "react";

export default function CombinedWave({ A1, A2, l1, l2, phase, size }) {
  const { w, h } = size;
  const samples = 400;
  let d = "";
  const k1 = (2 * Math.PI) / l1;
  const k2 = (2 * Math.PI) / l2;

  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * w;
    const y = h / 2 - (A1 * Math.sin(k1 * x + phase) + A2 * Math.sin(k2 * x + phase));
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  return (
    <svg width={w} height={h} className="w-full rounded-2xl bg-gradient-to-b from-white to-indigo-50 shadow-inner">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={3} className="text-blue-600" />
      <line x1={0} x2={w} y1={h / 2} y2={h / 2} className="stroke-gray-300" strokeDasharray={6} />
    </svg>
  );
}
