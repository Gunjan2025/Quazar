import React from "react";

export default function Header({ paused, setPaused, onReset }) {
  return (
    <header className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Waves – Interactive Module (Class 10)</h1>
          <p className="text-sm text-gray-600 mt-1">
            Explore amplitude, wavelength, frequency, speed (v = fλ), and superposition with live simulations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPaused((p) => !p)}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700"
          >
            {paused ? "Play (Space)" : "Pause (Space)"}
          </button>
          <button
            onClick={onReset}
            className="rounded-xl border px-4 py-2 font-semibold hover:bg-white"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
