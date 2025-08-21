import React from "react";

export default function LabeledSlider({ label, value, min, max, step = 1, unit = "", onChange, id }) {
  const inputId = id || label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-end justify-between">
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="text-xs text-gray-500">{min}{unit} – {max}{unit}</div>
      </div>
      <div className="flex items-center gap-3">
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            step={step}
            min={min}
            max={max}
            onChange={(e) => onChange?.(Number(e.target.value))}
            className="w-20 rounded border px-2 py-1 text-sm"
          />
          <span className="text-sm text-gray-600">{unit}</span>
        </div>
      </div>
    </div>
  );
}
