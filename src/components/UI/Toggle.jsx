import React from "react";

export default function Toggle({ label, checked, onChange, id }) {
  const inputId = id || label.replace(/\s+/g, "-").toLowerCase();
  return (
    <label htmlFor={inputId} className="flex items-center gap-3 cursor-pointer select-none">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className={`relative w-12 h-6 inline-flex items-center rounded-full px-1 transition ${checked ? "bg-indigo-600" : "bg-gray-300"}`}>
        <span className={`h-5 w-5 bg-white rounded-full shadow transform transition ${checked ? "translate-x-6" : "translate-x-0"}`}></span>
      </span>
      <input
        id={inputId}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </label>
  );
}
