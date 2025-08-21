import React from "react";

export default function Footer() {
  return (
    <footer className="border-t bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-600">
        © {new Date().getFullYear()} Waves – Interactive Module. 
        Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border">Space</kbd> to Play/Pause.
      </div>
    </footer>
  );
}
