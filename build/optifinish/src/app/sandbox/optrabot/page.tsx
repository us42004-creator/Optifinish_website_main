'use client';

import { useEffect, useState } from 'react';
import OptraBot from './OptraBot';

export default function OptraBotSandbox() {
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // normalise to -1 … +1
      setMouseX((e.clientX / window.innerWidth) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#f1efea] flex flex-col items-center justify-center gap-10 p-10">

      {/* Label */}
      <div className="text-center">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ink/30">
          OptraBot — Character Sandbox
        </span>
        <p className="mt-1 text-[0.75rem] text-ink/40">Move your cursor to tilt the head</p>
      </div>

      {/* Bot on light bg */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[0.55rem] uppercase tracking-widest text-ink/25 mb-2">Light background</span>
        <OptraBot mouseX={mouseX} />
      </div>

      {/* Bot on dark bg */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[0.55rem] uppercase tracking-widest text-ink/25 mb-2">Dark background</span>
        <div className="rounded-2xl bg-ink p-10">
          <OptraBot mouseX={mouseX} />
        </div>
      </div>

      {/* Size variants */}
      <div className="flex items-end gap-10">
        {[0.4, 0.65, 1].map((scale) => (
          <div key={scale} className="flex flex-col items-center gap-2">
            <span className="text-[0.55rem] uppercase tracking-widest text-ink/25">{Math.round(scale * 100)}%</span>
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}>
              <OptraBot mouseX={mouseX} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
