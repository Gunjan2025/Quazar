// src/App.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Toggle from "./components/UI/Toggle";
import LabeledSlider from "./components/UI/LabeledSlider";
import SpeedBadge from "./components/UI/SpeedBadge";
import Pill from "./components/UI/Pill";
import WaveSVG from "./components/Wave/WaveSVG";
import CombinedWave from "./components/Wave/CombinedWave";
import QuizMCQ from "./components/Quiz/QuizMCQ";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function WavesModule() {
  // Primary wave state
  const [amplitude, setAmplitude] = useState(40);      // px
  const [frequency, setFrequency] = useState(1);       // Hz
  const [wavelength, setWavelength] = useState(200);   // px

  // Superposition toggle + second wave state
  const [superpose, setSuperpose] = useState(false);
  const [f2, setF2] = useState(1.5);
  const [A2, setA2] = useState(25);
  const [lambda2, setLambda2] = useState(160);

  // Animation + sizing
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState(0);
  const boxRef = useRef(null);
  const [size, setSize] = useState({ w: 800, h: 240 });

  // Responsive sizing using ResizeObserver
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setSize({ w, h: clamp(Math.round(w * 0.3), 200, 320) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Animate phase: ω = 2πf
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t) => {
      const dt = (t - last) / 1000;
      last = t;
      if (!paused) setPhase((p) => p + 2 * Math.PI * frequency * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [frequency, paused]);

  // Derived quantities
  const speed = useMemo(() => frequency * wavelength, [frequency, wavelength]);
  const speed2 = useMemo(() => f2 * lambda2, [f2, lambda2]);

  // Spacebar Play/Pause
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset to defaults
  const reset = () => {
    setAmplitude(40);
    setFrequency(1);
    setWavelength(200);
    setPhase(0);
    setA2(25);
    setF2(1.5);
    setLambda2(160);
    setSuperpose(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-gray-900">
      <Header paused={paused} setPaused={setPaused} onReset={reset} />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        {/* Concept Cards */}
        <section className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="font-bold">Key Ideas</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li><strong>Amplitude (A)</strong>: maximum displacement from the midline.</li>
              <li><strong>Wavelength (λ)</strong>: distance between two crests/troughs.</li>
              <li><strong>Frequency (f)</strong>: waves per second (Hz).</li>
              <li><strong>Speed (v)</strong>: how fast the disturbance travels. <em>v = f × λ</em>.</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="font-bold">Try This</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Increase <em>f</em>. What happens to <em>v</em> if <em>λ</em> is fixed?</li>
              <li>Decrease <em>λ</em>. How does the wave look?</li>
              <li>Turn on <strong>Superposition</strong> and observe beats/complex shapes.</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="font-bold">Learning Outcomes</h2>
            <p className="mt-2 text-sm text-gray-700">
              By the end, you can define A, λ, f, v; calculate speed from f and λ; and explain constructive vs destructive interference qualitatively.
            </p>
          </div>
        </section>

        {/* Simulation */}
        <section className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="font-bold mb-3">Live Wave</h3>
            <div ref={boxRef} className="w-full">
              <div className="rounded-2xl overflow-hidden">
                <WaveSVG
                  width={size.w}
                  height={size.h}
                  A={amplitude}
                  lambda={wavelength}
                  phase={phase}
                />
              </div>
            </div>
            <div className="mt-3">
              <SpeedBadge v={speed} f={frequency} lambda={wavelength} />
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="font-bold mb-3">Controls</h3>
            <div className="space-y-4">
              <LabeledSlider
                label="Amplitude (A)"
                value={amplitude}
                min={5}
                max={80}
                step={1}
                unit="u"
                onChange={(v) => setAmplitude(clamp(v, 5, 80))}
              />
              <LabeledSlider
                label="Frequency (f)"
                value={frequency}
                min={0.2}
                max={3}
                step={0.1}
                unit="Hz"
                onChange={(v) => setFrequency(clamp(v, 0.2, 3))}
              />
              <LabeledSlider
                label="Wavelength (λ)"
                value={wavelength}
                min={100}
                max={400}
                step={5}
                unit="u"
                onChange={(v) => setWavelength(clamp(v, 100, 400))}
              />
              <Toggle
                label="Superposition (add a second wave)"
                checked={superpose}
                onChange={setSuperpose}
              />
            </div>
          </div>
        </section>

        {/* Superposition */}
        {superpose && (
          <section className="grid lg:grid-cols-5 gap-6 mt-6">
            <div className="lg:col-span-3 rounded-2xl border bg-white p-4 shadow-sm">
              <h3 className="font-bold mb-3">Resultant Wave (Two Waves Added)</h3>
              <CombinedWave
                A1={amplitude}
                A2={A2}
                l1={wavelength}
                l2={lambda2}
                phase={phase}
                size={size}
              />
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <Pill>Wave 1: f₁ = {frequency.toFixed(2)} Hz, λ₁ = {wavelength.toFixed(0)} u</Pill>
                <Pill>Wave 2: f₂ = {f2.toFixed(2)} Hz, λ₂ = {lambda2.toFixed(0)} u</Pill>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                Notice regions where crests align (constructive) and where crest meets trough (destructive).
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl border bg-white p-4 shadow-sm">
              <h3 className="font-bold mb-3">Second Wave Controls</h3>
              <div className="space-y-4">
                <LabeledSlider
                  label="Amplitude A₂"
                  value={A2}
                  min={0}
                  max={80}
                  step={1}
                  unit="u"
                  onChange={(v) => setA2(clamp(v, 0, 80))}
                />
                <LabeledSlider
                  label="Frequency f₂"
                  value={f2}
                  min={0.2}
                  max={3}
                  step={0.1}
                  unit="Hz"
                  onChange={(v) => setF2(clamp(v, 0.2, 3))}
                />
                <LabeledSlider
                  label="Wavelength λ₂"
                  value={lambda2}
                  min={100}
                  max={400}
                  step={5}
                  unit="u"
                  onChange={(v) => setLambda2(clamp(v, 100, 400))}
                />
                <div className="text-sm text-gray-700">
                  <SpeedBadge v={speed2} f={f2} lambda={lambda2} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quizzes */}
        <section className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="font-bold mb-3">Checkpoint: Calculate Speed</h3>
            <p className="text-sm text-gray-700 mb-2">
              Given f = 2 Hz and λ = 1.5 m, what is v?
            </p>
            <QuizMCQ
              q="Choose the correct value for wave speed v"
              options={["1.5 m/s", "3.0 m/s", "0.75 m/s", "4.0 m/s"]}
              answerIdx={1}
            />
          </div>

          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="font-bold mb-3">Predict & Test</h3>
            <p className="text-sm text-gray-700">
              Before touching the sliders: If you double the frequency while keeping λ fixed, what happens to v?
            </p>
            <QuizMCQ
              q="Doubling frequency with constant wavelength causes..."
              options={["v stays same", "v doubles", "v halves", "v becomes zero"]}
              answerIdx={1}
            />
          </div>
        </section>

        {/* Tasks */}
        <section className="mt-8 rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="font-bold mb-2">Tasks (For Students)</h3>
          <ol className="list-decimal pl-6 text-sm text-gray-800 space-y-1">
            <li>Set A = 60 u, f = 1.2 Hz, λ = 240 u. Report v and describe how the graph looks.</li>
            <li>Turn on Superposition. Try f₂ ≈ f to observe slow beats. Describe what you see.</li>
            <li>Find any settings that nearly flatten the resultant at some points (destructive interference).</li>
          </ol>
        </section>

        {/* About */}
        <section className="mt-8 rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="font-bold mb-2">About This Module</h3>
          <p className="text-sm text-gray-700">
            Built with React and SVG for smooth, performant visuals. No physics libraries—just core maths so learners see the relationship directly. Designed for Class 10 with concise text, large touch targets, and immediate feedback.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
