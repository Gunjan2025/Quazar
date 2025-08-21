import React, { useState } from "react";

export default function QuizMCQ({ q, options, answerIdx, onResult }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const correct = selected === answerIdx;

  const submit = () => {
    if (selected === null) return;
    setRevealed(true);
    onResult?.(correct);
  };

  return (
    <div className="rounded-2xl border p-4 shadow-sm bg-white">
      <p className="font-semibold mb-2">{q}</p>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`text-left rounded-xl border px-3 py-2 transition ${
              selected === i ? "border-indigo-600 ring-2 ring-indigo-200" : "hover:border-gray-400"
            }`}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button onClick={submit} className="rounded-xl bg-indigo-600 px-3 py-2 text-white font-medium hover:bg-indigo-700">Check</button>
        {revealed && (
          <span className={`text-sm font-semibold ${correct ? "text-green-600" : "text-red-600"}`}>
            {correct ? "Correct!" : `Not quite. Answer: ${String.fromCharCode(65 + answerIdx)}`}
          </span>
        )}
      </div>
    </div>
  );
}
