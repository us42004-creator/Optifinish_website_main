'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   REUSABLE PRIMITIVES
───────────────────────────────────────────────────────────── */

function ImageViewport({
  label,
  src,
  aspect = 'aspect-[16/9]',
  className = '',
  isDark = false,
  objectFit = 'cover',
}: {
  label: string;
  src?: string;
  aspect?: string;
  className?: string;
  isDark?: boolean;
  objectFit?: 'cover' | 'contain';
}) {
  if (src) {
    if (objectFit === 'contain') {
      return (
        <div className={`relative flex items-center justify-center overflow-hidden rounded-[1.1rem] ${aspect} ${className} ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#f1efea]'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={label} className="max-h-full max-w-full rounded-[0.75rem] object-contain" />
        </div>
      );
    }
    return (
      <div className={`relative overflow-hidden rounded-[1.1rem] ${aspect} ${className} ${isDark ? 'bg-white/[0.03]' : 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-[1.1rem] border ${
        isDark
          ? 'border-white/[0.06] bg-white/[0.025]'
          : 'border-black/[0.07] bg-black/[0.03]'
      } ${aspect} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(254,206,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,206,0,1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(10,10,10,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: isDark ? 0.04 : 1,
        }}
      />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-[#FECE00]/25" />
      <div className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-[0.18em] ${
        isDark ? 'border-white/[0.1] bg-white/[0.05] text-white/30' : 'border-black/[0.08] bg-white/80 text-[#0A0A0A]/40'
      }`}>
        Image viewport
      </div>
      <span className={`relative text-[0.65rem] font-medium uppercase tracking-[0.2em] ${isDark ? 'text-white/20' : 'text-[#0A0A0A]/25'}`}>
        {label}
      </span>
    </div>
  );
}

function SpecRow({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) {
  return (
    <div className={`flex justify-between gap-6 border-b py-3 ${dark ? 'border-white/[0.07]' : 'border-black/[0.06]'}`}>
      <span className={`text-[0.72rem] ${dark ? 'text-white/40' : 'text-[#0A0A0A]/45'}`}>{label}</span>
      <span className={`text-right text-[0.72rem] font-semibold ${dark ? 'text-white/80' : 'text-[#0A0A0A]/80'}`}>{value}</span>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-black/[0.1] bg-black/[0.04] px-3 py-1 text-[0.62rem] font-medium text-[#0A0A0A]/55">
      {label}
    </span>
  );
}

function LineDiagramSVG() {
  /* zone config: color accent per zone */
  const zones = [
    { name: 'Pretreatment',  sub: 'PT LINE',          num: '01', active: false, accent: 'rgba(56,130,210,0.22)',  border: 'rgba(56,130,210,0.75)',  label: '#2B6FC7' },
    { name: 'Dry-off Oven',  sub: '120°C PRE-HEAT',   num: '02', active: false, accent: 'rgba(230,140,30,0.20)',  border: 'rgba(230,140,30,0.72)',  label: '#C97A0A' },
    { name: 'Powder Booth',  sub: 'MANUAL GUN HERE',  num: '03', active: true,  accent: 'rgba(254,206,0,0.20)',   border: 'rgba(201,165,0,0.95)',   label: '#A87D00' },
    { name: 'Curing Oven',   sub: '180–200°C',         num: '04', active: false, accent: 'rgba(210,70,40,0.18)',   border: 'rgba(210,70,40,0.72)',   label: '#C03A20' },
    { name: 'Inspection',    sub: 'QC · OFF-LOAD',     num: '05', active: false, accent: 'rgba(40,160,80,0.18)',   border: 'rgba(40,160,80,0.72)',   label: '#1A8A40' },
  ];

  const ZW = 228, ZX = (i: number) => 30 + i * ZW;
  const RAIL_Y = 58;
  const partXs = [90, 185, 325, 420, 568, 658, 798, 893, 1033, 1128];
  const boothPartXs = new Set([568, 658]);
  const activePartX = 658;
  const pTop = 82, pH = 76;

  /* spray fan lines from nozzle (x=625, y=159) → workpiece column at x=658 */
  const nozzleX = 625, nozzleY = 159;
  const sprayTargets = [84, 96, 108, 120, 132, 144, 156];

  return (
    <svg
      viewBox="0 0 1200 410"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', display: 'block', borderRadius: '1.1rem', background: '#f5f3ee', border: '1px solid rgba(10,10,10,0.07)' }}
    >
      <defs>
        {/* Subtle grid texture */}
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(10,10,10,0.07)" strokeWidth="0.6" />
        </pattern>

        {/* Spray line dash animation */}
        <style>{`
          @keyframes spray {
            0%   { stroke-dashoffset: 12; opacity: 0.95; }
            100% { stroke-dashoffset: 0;  opacity: 0.45; }
          }
          @keyframes boothPulse {
            0%, 100% { opacity: 0.75; }
            50%       { opacity: 1.0;  }
          }
          @keyframes heatRise {
            0%   { transform: translateY(0px);   opacity: 0.9; }
            100% { transform: translateY(-14px); opacity: 0;   }
          }
          @keyframes partGlow {
            0%, 100% { opacity: 0.5; }
            50%       { opacity: 1.0; }
          }
          @keyframes ptWave {
            0%   { stroke-dashoffset: 20; }
            100% { stroke-dashoffset: 0;  }
          }
          .spray-line { stroke-dasharray: 4 3; animation: spray 0.9s linear infinite; }
          .spray-line:nth-child(2) { animation-delay: -0.13s; }
          .spray-line:nth-child(3) { animation-delay: -0.26s; }
          .spray-line:nth-child(4) { animation-delay: -0.39s; }
          .spray-line:nth-child(5) { animation-delay: -0.52s; }
          .spray-line:nth-child(6) { animation-delay: -0.65s; }
          .spray-line:nth-child(7) { animation-delay: -0.78s; }
          .booth-pulse { animation: boothPulse 2s ease-in-out infinite; }
          .heat { stroke-dasharray: 6 4; animation: heatRise 1.6s ease-in infinite; }
          .heat-d1 { animation-delay: -0.4s; }
          .heat-d2 { animation-delay: -0.8s; }
          .heat-d3 { animation-delay: -1.2s; }
          .heat-d4 { animation-delay: -1.6s; }
          .part-glow { animation: partGlow 1.8s ease-in-out infinite; }
          .pt-wave { stroke-dasharray: 8 4; animation: ptWave 1.4s linear infinite; }
        `}</style>
      </defs>

      {/* ── Grid background ── */}
      <rect x="0" y="0" width="1200" height="410" fill="url(#grid)" />

      {/* ── Zone fills ── */}
      {zones.map((z, i) => (
        <rect key={i} x={ZX(i)} y={48} width={ZW} height={290} fill={z.accent} />
      ))}

      {/* ── Zone top accent bars ── */}
      {zones.map((z, i) => (
        <rect key={i} x={ZX(i)} y={48} width={ZW} height={5} fill={z.border} />
      ))}

      {/* ── Zone vertical dividers ── */}
      {[1,2,3,4].map(i => (
        <line key={i} x1={ZX(i)} y1={48} x2={ZX(i)} y2={338}
          stroke="rgba(10,10,10,0.22)" strokeWidth="1.2" />
      ))}

      {/* ── Booth dashed border (animated pulse) ── */}
      <rect x={ZX(2)} y={48} width={ZW} height={290} fill="none"
        stroke="rgba(201,165,0,0.95)" strokeWidth="1.8" strokeDasharray="7 3"
        className="booth-pulse" />

      {/* ── Zone number labels (top-left of each zone) ── */}
      {zones.map((z, i) => (
        <text key={i} x={ZX(i) + 10} y={65}
          fill={z.label} fontSize="8.5" fontWeight="800"
          fontFamily="system-ui,sans-serif" letterSpacing="0.5">
          {z.num}
        </text>
      ))}

      {/* ── Overhead conveyor rail ── */}
      <rect x={30} y={RAIL_Y - 5} width={1140} height={6} rx="1" fill="rgba(10,10,10,0.75)" />
      <rect x={30} y={RAIL_Y - 1} width={1140} height={1.5} fill="rgba(255,255,255,0.35)" />
      <text x={600} y={44} textAnchor="middle"
        fill="rgba(10,10,10,0.5)" fontSize="5.5" fontWeight="700"
        fontFamily="system-ui,sans-serif" letterSpacing="3">OVERHEAD CONVEYOR RAIL</text>

      {/* ── Conveyor trolleys ── */}
      {partXs.map(x => (
        <g key={x}>
          <rect x={x - 7} y={RAIL_Y - 4} width={14} height={6} rx="1"
            fill={boothPartXs.has(x) ? 'rgba(10,10,10,0.7)' : 'rgba(10,10,10,0.38)'} />
          <circle cx={x - 3} cy={RAIL_Y + 2} r={2.5}
            fill={boothPartXs.has(x) ? 'rgba(10,10,10,0.6)' : 'rgba(10,10,10,0.28)'} />
          <circle cx={x + 3} cy={RAIL_Y + 2} r={2.5}
            fill={boothPartXs.has(x) ? 'rgba(10,10,10,0.6)' : 'rgba(10,10,10,0.28)'} />
        </g>
      ))}

      {/* ── Hanging drop rods + parts ── */}
      {partXs.map(x => {
        const inBooth = boothPartXs.has(x);
        const isActive = x === activePartX;
        const rodStroke = inBooth ? 'rgba(10,10,10,0.65)' : 'rgba(10,10,10,0.35)';
        return (
          <g key={x}>
            {/* Drop rod */}
            <line x1={x} y1={RAIL_Y + 4} x2={x} y2={pTop}
              stroke={rodStroke} strokeWidth="1.2" />
            {/* Hook */}
            <path d={`M ${x} ${pTop} Q ${x+5} ${pTop+5} ${x+5} ${pTop+10}`}
              fill="none" stroke={rodStroke} strokeWidth="1.2" />
            {/* Part body */}
            <rect x={x - 14} y={pTop + 8} width={28} height={pH} rx="2"
              fill={isActive ? 'rgba(10,10,10,0.1)' : inBooth ? 'rgba(10,10,10,0.08)' : 'rgba(10,10,10,0.05)'}
              stroke={isActive ? 'rgba(201,165,0,0.85)' : rodStroke}
              strokeWidth={isActive ? 1.8 : 1.1} />
            {/* Active part: powder stripe lines */}
            {isActive && [10,22,34,46,58,70].map(dy => (
              <line key={dy} x1={x - 11} y1={pTop + 8 + dy} x2={x + 11} y2={pTop + 8 + dy}
                stroke="#FECE00" strokeWidth="1.2" className="part-glow" />
            ))}
            {/* Active part: outer glow rect */}
            {isActive && (
              <rect x={x - 17} y={pTop + 5} width={34} height={pH + 6} rx="3"
                fill="none" stroke="rgba(254,206,0,0.7)" strokeWidth="1.5" className="part-glow" />
            )}
            {/* Powder drip tail (booth parts only) */}
            {inBooth && !isActive && [0, 5, 9].map((dy, k) => (
              <line key={k}
                x1={x} y1={pTop + 8 + pH + dy}
                x2={x} y2={pTop + 8 + pH + dy + 3}
                stroke="rgba(201,165,0,0.7)" strokeWidth={1.6 - k * 0.3} />
            ))}
          </g>
        );
      })}

      {/* ── Booth side walls ── */}
      <rect x={ZX(2) - 2} y={64} width={5} height={274} rx="1" fill="rgba(10,10,10,0.42)" />
      <rect x={ZX(3) - 3} y={64} width={5} height={274} rx="1" fill="rgba(10,10,10,0.42)" />

      {/* ── PRETREATMENT: wash tank illustration ── */}
      <g transform="translate(144,215)">
        <rect x={-52} y={-26} width={104} height={54} rx="4"
          fill="rgba(56,130,210,0.15)" stroke="rgba(56,130,210,0.7)" strokeWidth="1.5" />
        {[-12, -2, 8].map((y, k) => (
          <path key={k}
            d={`M -38 ${y} C -22 ${y-6} -8 ${y+6} 0 ${y} C 8 ${y-6} 22 ${y+6} 38 ${y}`}
            fill="none" stroke="rgba(56,130,210,0.8)" strokeWidth="1.4"
            className="pt-wave" style={{ animationDelay: `${-k * 0.47}s` }} />
        ))}
        {/* Nozzles */}
        {[-24, 0, 24].map(x => (
          <g key={x}>
            <line x1={x} y1={-26} x2={x} y2={-14}
              stroke="rgba(56,130,210,0.8)" strokeWidth="2" />
            <circle cx={x} cy={-12} r={3} fill="rgba(56,130,210,0.75)" />
          </g>
        ))}
      </g>

      {/* ── DRY-OFF OVEN: heat waves ── */}
      <g transform="translate(372,215)">
        <rect x={-58} y={-30} width={116} height={66} rx="4"
          fill="rgba(230,140,30,0.15)" stroke="rgba(230,140,30,0.7)" strokeWidth="1.5" />
        {[-32,-12,12,32].map((x, k) => (
          <path key={k}
            d={`M ${x} 20 Q ${x+6} 8 ${x} -2 Q ${x-6} -14 ${x} -24`}
            fill="none" stroke="rgba(230,140,30,0.85)" strokeWidth="1.6"
            className={`heat heat-d${(k % 4) + 1}`} />
        ))}
        <text x={0} y={44} textAnchor="middle"
          fill="rgba(230,140,30,0.9)" fontSize="7" fontWeight="700"
          fontFamily="system-ui" letterSpacing="1">120°C</text>
      </g>

      {/* ── POWDER BOOTH: operator + gun + spray ── */}

      {/* Operator — solid filled pictogram */}
      {/* Head */}
      <ellipse cx={508} cy={152} rx={9} ry={10}
        fill="rgba(10,10,10,0.78)" />
      {/* Hard hat */}
      <path d="M 499 149 Q 508 138 517 149 Z"
        fill="rgba(10,10,10,0.88)" />
      <rect x={497} y={149} width={22} height={2.5} rx="1.2"
        fill="rgba(10,10,10,0.82)" />
      {/* Torso */}
      <rect x={501} y={163} width={14} height={30} rx="3"
        fill="rgba(10,10,10,0.72)" />
      {/* Left arm (down) */}
      <rect x={497} y={165} width={5} height={22} rx="2.5"
        fill="rgba(10,10,10,0.68)" />
      {/* Right arm (raised toward gun) */}
      <path d="M 514 167 L 528 160 L 555 157"
        fill="none" stroke="rgba(10,10,10,0.75)" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Legs */}
      <rect x={502} y={193} width={5} height={28} rx="2.5"
        fill="rgba(10,10,10,0.68)" transform="rotate(4, 504, 193)" />
      <rect x={509} y={193} width={5} height={28} rx="2.5"
        fill="rgba(10,10,10,0.68)" transform="rotate(-4, 511, 193)" />

      {/* Gun body */}
      <rect x={554} y={151} width={32} height={13} rx="3"
        fill="rgba(10,10,10,0.88)" />
      {/* Gun grip */}
      <rect x={561} y={164} width={11} height={14} rx="2.5"
        fill="rgba(10,10,10,0.78)" />
      {/* Barrel */}
      <rect x={586} y={154} width={38} height={7} rx="3.5"
        fill="rgba(10,10,10,0.92)" />
      {/* Nozzle tip */}
      <circle cx={nozzleX} cy={nozzleY} r={5}
        fill="#FECE00" stroke="rgba(10,10,10,0.6)" strokeWidth="1" />

      {/* 60–80 kV callout */}
      <line x1={570} y1={149} x2={560} y2={132}
        stroke="rgba(10,10,10,0.35)" strokeWidth="1" />
      <text x={558} y={128} textAnchor="middle"
        fill="rgba(10,10,10,0.85)" fontSize="7.5" fontWeight="800"
        fontFamily="system-ui,sans-serif" letterSpacing="0.3">GEMA OptiFlex Pro</text>
      <text x={558} y={140} textAnchor="middle"
        fill="rgba(180,130,0,1)" fontSize="7" fontWeight="800"
        fontFamily="monospace" letterSpacing="0.5">60–80 kV</text>

      {/* Animated spray fan lines */}
      {sprayTargets.map((y2, i) => (
        <line key={i}
          x1={nozzleX} y1={nozzleY}
          x2={647} y2={y2}
          stroke="rgba(254,206,0,0.9)" strokeWidth="1.4"
          className="spray-line" />
      ))}

      {/* Grounded workpiece callout */}
      <line x1={660} y1={163} x2={692} y2={195}
        stroke="rgba(180,130,0,0.6)" strokeWidth="1" />
      <text x={695} y={194} fill="rgba(150,100,0,1)"
        fontSize="6.5" fontWeight="700"
        fontFamily="system-ui,sans-serif" letterSpacing="1.5">GROUNDED</text>
      <text x={695} y={206} fill="rgba(150,100,0,1)"
        fontSize="6.5" fontWeight="700"
        fontFamily="system-ui,sans-serif" letterSpacing="1.5">WORKPIECE</text>

      {/* Electrostatic label */}
      <text x={600} y={288} textAnchor="middle"
        fill="rgba(150,100,0,0.85)" fontSize="6" fontWeight="700"
        fontFamily="system-ui,sans-serif" letterSpacing="2.5">ELECTROSTATIC ATTRACTION</text>

      {/* ── CURING OVEN: strong heat waves ── */}
      <g transform="translate(828,215)">
        <rect x={-58} y={-30} width={116} height={66} rx="4"
          fill="rgba(210,70,40,0.15)" stroke="rgba(210,70,40,0.7)" strokeWidth="1.5" />
        {[-32,-12,12,32].map((x, k) => (
          <path key={k}
            d={`M ${x} 20 Q ${x+7} 6 ${x} -4 Q ${x-7} -16 ${x} -26`}
            fill="none" stroke="rgba(210,70,40,0.88)" strokeWidth="1.8"
            className={`heat heat-d${(k % 4) + 1}`} />
        ))}
        <text x={0} y={44} textAnchor="middle"
          fill="rgba(210,70,40,0.95)" fontSize="7" fontWeight="700"
          fontFamily="system-ui" letterSpacing="1">180–200°C</text>
      </g>

      {/* ── INSPECTION: magnifier icon ── */}
      <g transform="translate(1056,210)">
        <circle cx={0} cy={0} r={22} fill="rgba(40,160,80,0.14)" stroke="rgba(40,160,80,0.65)" strokeWidth="1.5" />
        {/* Magnifier lens */}
        <circle cx={-5} cy={-5} r={13} fill="none" stroke="rgba(40,160,80,0.9)" strokeWidth="3" />
        {/* Handle */}
        <line x1={5} y1={5} x2={16} y2={16}
          stroke="rgba(40,160,80,0.9)" strokeWidth="4.5" strokeLinecap="round" />
        {/* Check mark inside lens */}
        <path d="M -13 -5 L -8 0 L -1 -8"
          fill="none" stroke="rgba(40,160,80,0.95)" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ── Bottom separator ── */}
      <line x1={30} y1={338} x2={1170} y2={338}
        stroke="rgba(10,10,10,0.2)" strokeWidth="1" />

      {/* ── Zone label strip ── */}
      {zones.map((z, i) => {
        const cx = ZX(i) + ZW / 2;
        return (
          <g key={i}>
            {z.active && (
              <rect x={cx - 62} y={344} width={124} height={46} rx="5"
                fill="rgba(254,206,0,0.18)" stroke="rgba(201,165,0,0.7)" strokeWidth="1.2" />
            )}
            <text x={cx} y={360} textAnchor="middle"
              fill={z.active ? 'rgba(10,10,10,0.9)' : 'rgba(10,10,10,0.55)'}
              fontSize={z.active ? 10 : 8.5} fontWeight={z.active ? 800 : 600}
              fontFamily="system-ui,sans-serif" letterSpacing="0.3">
              {z.name}
            </text>
            <text x={cx} y={376} textAnchor="middle"
              fill={z.active ? z.label : 'rgba(10,10,10,0.38)'}
              fontSize="6" fontWeight="700"
              fontFamily="system-ui,sans-serif" letterSpacing="2.2">
              {z.sub}
            </text>
          </g>
        );
      })}

      {/* ── Footer line ── */}
      <text x={32} y={405} fill="rgba(10,10,10,0.38)" fontSize="5.5" fontWeight="600"
        fontFamily="system-ui" letterSpacing="2">DIRECTION OF TRAVEL →</text>
      <text x={1168} y={405} textAnchor="end" fill="rgba(10,10,10,0.38)" fontSize="5.5" fontWeight="600"
        fontFamily="system-ui" letterSpacing="1.5">GEMA OPTIFLEX PRO · OPTIFINISH INDIA</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE DATA
───────────────────────────────────────────────────────────── */

const MODELS = [
  {
    id: 'pro-q',
    label: 'OptiFlex Pro Q',
    tag: 'Quick Colour Change',
    headline: 'Colour change in 35 seconds.',
    body: 'The Pro Q is built for operations running multiple powder colours daily. MagicPlug® tool-free disassembly lets the operator strip the gun for cleaning in seconds — the fastest colour changeover in its class. Box-fed or hopper-fed configurations available.',
    specs: [
      { l: 'Colour change time', v: '35 seconds (fastest in class)' },
      { l: 'Feed system', v: 'Box-fed or hopper-fed' },
      { l: 'Disassembly', v: 'MagicPlug® — tool-free' },
      { l: 'Best for', v: 'Job coaters, custom colour shops' },
    ],
    imageLabel: 'OptiFlex Pro Q · quick colour change gun',
    imageSrc: '/images/products/gema/manual-gun/optiflex_pro_manual_gun.jpg',
  },
  {
    id: 'pro-f',
    label: 'OptiFlex Pro F Spray',
    tag: 'High Output',
    headline: 'Up to 600 g/min. Non-stop production.',
    body: 'The Pro F Spray delivers the highest powder output in the OptiFlex range — designed for high-throughput production environments where maintaining coating speed without sacrificing finish quality is the priority.',
    specs: [
      { l: 'Max powder output', v: '600 g/min' },
      { l: 'Feed system', v: 'Hopper-fed (high capacity)' },
      { l: 'Disassembly', v: 'MagicPlug® — tool-free' },
      { l: 'Best for', v: 'High-volume production lines' },
    ],
    imageLabel: 'OptiFlex Pro F Spray · high-output gun',
    imageSrc: '/images/products/gema/manual-gun/optiflex-gun.jpeg',
    objectFit: 'contain' as const,
  },
  {
    id: 'pro-c',
    label: 'OptiFlex Pro C',
    tag: 'All-Round',
    headline: 'The standard. Reliable across every application.',
    body: 'The Pro C is the all-round model — gravity-fed, hopper-fed, or wall-mount configurations, programmable kV and µA via MagicControl 4.0, and MagicPlug® disassembly. The right choice for batch operations, job coaters, and mixed-product environments.',
    specs: [
      { l: 'Feed system', v: 'Gravity / hopper / wall-mount' },
      { l: 'Control', v: 'Programmable kV and µA via MagicControl 4.0' },
      { l: 'Disassembly', v: 'MagicPlug® — tool-free' },
      { l: 'Best for', v: 'Batch shops, mixed-product environments' },
    ],
    imageLabel: 'OptiFlex Pro C · all-round manual gun',
    imageSrc: '/images/products/gema/manual-gun/optiflex-c.png',
    objectFit: 'contain' as const,
  },
];

const HOW_IT_WORKS: { n: string; title: string; body: string; imageSrc: string; objectFit?: 'cover' | 'contain' }[] = [
  {
    n: '01',
    title: 'Powder fed via Venturi',
    body: 'Powder coating material is drawn from the hopper or box feed through a Venturi system — pressurised air creates suction that pulls the powder into the gun barrel at a consistent, controlled rate.',
    imageSrc: '/images/products/gema/manual-gun/gun-open.png',
  },
  {
    n: '02',
    title: 'MagicControl 4.0 charges the powder',
    body: 'As the powder passes the electrode tip inside the gun barrel, the MagicControl 4.0 generator applies a programmable electrostatic charge. The kV and µA output is set to match the powder type and part geometry.',
    imageSrc: '/images/products/gema/manual-gun/magic-control.jpg',
  },
  {
    n: '03',
    title: 'Charged particles adhere to the part',
    body: 'Electrostatically charged powder particles are attracted to the grounded part. The charge forces the particles toward the surface — wrapping around edges and into recesses — where they adhere electrostatically until the part enters the curing oven.',
    imageSrc: '/images/products/gema/manual-gun/homepage-img.jpg',
  },
];

const RELATED = [
  {
    name: 'Automatic Powder Coating Gun',
    sub: 'OptiGun with PowerBoost®',
    cat: 'GEMA · Authorised Partner',
    href: '/products/gema/automatic-gun',
    imageLabel: 'GEMA OptiGun automatic gun',
    imageSrc: '/images/products/gema/automatic-gun/optigun-ga04.png',
  },
  {
    name: 'Reciprocators & Automation Axes',
    sub: 'ZA Series + XT / UA / YT',
    cat: 'GEMA · Authorised Partner',
    href: '/products/gema/reciprocators',
    imageLabel: 'GEMA ZA reciprocator',
    imageSrc: '/images/products/gema/reciprocators/gema-reciprocator-01.jpg',
  },
  {
    name: 'OptiCentre Powder Management',
    sub: 'OC08 — Fully Automatic',
    cat: 'GEMA · Authorised Partner',
    href: '/products/gema/opticentre',
    imageLabel: 'GEMA OC08 OptiCentre',
    imageSrc: '/images/products/gema/opticentre/gema-opticenter-oc07-oc08-01.jpg',
  },
];

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */

export default function GemaManualGunPage() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);
  const [showSoundBtn, setShowSoundBtn] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const toggleSound = () => {
    const cmd = videoMuted ? 'unMute' : 'mute';
    videoRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: cmd, args: [] }), '*'
    );
    setVideoMuted(!videoMuted);
  };

  return (
    <div className="min-h-screen bg-[#f1efea]">

      {/* ══════════════════════════════════════════════════════
          S1 — PRODUCT HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#f1efea] pb-16 pt-[80px] md:pb-20 md:pt-[88px]">
        {/* Grid drift — dual layer */}
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />

        {/* Breadcrumb — constrained */}
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <nav className="mb-8 flex items-center gap-2">
            {[
              { label: 'Products', href: '/products' },
              { label: 'GEMA', href: '/products/gema' },
              { label: 'Manual Powder Coating Gun', href: null },
            ].map((crumb, i, arr) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/30 transition-colors hover:text-[#0A0A0A]/60"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/60">
                    {crumb.label}
                  </span>
                )}
                {i < arr.length - 1 && (
                  <span className="text-[0.6rem] text-[#0A0A0A]/20">/</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Hero grid — left constrained, right bleeds to edge */}
        <div
          className="relative grid items-stretch gap-12 lg:grid-cols-[1fr_1.3fr]"
          style={{ paddingLeft: 'max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))', paddingRight: 'max(0.75rem, calc((100vw - 80rem) / 2 + 0.5rem))' }}
        >
          {/* Left — copy */}
          <div>
            {/* Partner tag */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#0A0A0A]/20 px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/55">
                Authorised Partner
              </span>
              <span className="rounded-full border border-[#0A0A0A]/10 px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/40">
                GEMA Switzerland
              </span>
            </div>

            <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/38">
              OptiFlex Pro Series — Gravity / Box / Hopper Fed
            </p>

            <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#0A0A0A]">
              Manual powder<br />
              coating gun.<br />
              <span className="text-[#FECE00]">Swiss standard.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[0.88rem] leading-relaxed text-[#0A0A0A]/55">
              GEMA&apos;s OptiFlex Pro is the world reference for manual electrostatic powder coating guns — covering quick colour change, high-output production, and standard all-round use. Supplied and supported in India by OptiFinish.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { v: '35 sec', l: 'Fastest colour change' },
                { v: '600 g/min', l: 'Max powder output' },
                { v: '3 Models', l: 'Pro Q · Pro F · Pro C' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-[#0A0A0A]/10 bg-[#0A0A0A]/[0.04] px-5 py-3"
                >
                  <div className="font-display text-[1.5rem] font-black leading-none text-[#0A0A0A]">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-[#0A0A0A]/40">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact?product=gema-manual-gun"
                className="rounded-full bg-[#0A0A0A] px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#0A0A0A]/80"
              >
                Get a Quote →
              </Link>
              <button className="rounded-full border border-[#0A0A0A]/[0.12] px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/45 transition-all hover:border-[#0A0A0A]/25 hover:text-[#0A0A0A]/70">
                Download Brochure
              </button>
            </div>
          </div>

          {/* Right — hero video */}
          <div
            className="relative min-h-[320px] w-full overflow-hidden rounded-[1.1rem] lg:h-full mr-5 md:mr-8 bg-black"
            onMouseEnter={() => setShowSoundBtn(true)}
            onMouseLeave={() => setShowSoundBtn(false)}
          >
            <iframe
              ref={videoRef}
              src="https://www.youtube.com/embed/hNxPofBZBqg?autoplay=1&mute=1&loop=1&playlist=hNxPofBZBqg&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&showinfo=0"
              title="OptiFlex Pro Animation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
              style={{ position: 'absolute', top: '-16%', left: '0', width: '100%', height: '132%' }}
            />
            {/* Transparent overlay — blocks YouTube hover UI */}
            <div className="absolute inset-0 z-[5]" />
            {/* Sound toggle — appears on hover */}
            <button
              onClick={toggleSound}
              className={`absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] backdrop-blur-sm transition-all duration-200 ${
                showSoundBtn ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } ${
                videoMuted
                  ? 'border-white/20 bg-black/50 text-white/60 hover:border-white/40 hover:text-white/90'
                  : 'border-[#FECE00]/40 bg-black/50 text-[#FECE00] hover:border-[#FECE00]/70'
              }`}
            >
              {videoMuted ? (
                <><span>🔇</span> Sound off</>
              ) : (
                <><span>🔊</span> Sound on</>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S2 — PROBLEM / POSITIONING
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 md:grid-cols-2">

            {/* Left */}
            <div>
              <p className="mb-3 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
                Why it matters
              </p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
                Manual application<br />
                <span className="text-[#FECE00]">should never be the weak link.</span>
              </h2>
              <p className="mt-5 text-[0.82rem] leading-relaxed text-white/42">
                In a well-run powder coating line, the gun is where quality is made or lost. Inconsistent kV, poor colour-change discipline, and slow cleaning routines cost finish quality and production time every shift. The OptiFlex Pro eliminates all three.
              </p>
            </div>

            {/* Right — benefit cards */}
            <div className="flex flex-col gap-3">
              {[
                {
                  t: 'Fastest colour change in class',
                  b: 'Pro Q changes colour in 35 seconds with MagicPlug® tool-free disassembly — keeping multi-colour batch lines moving.',
                },
                {
                  t: 'Programmable kV and µA control',
                  b: 'MagicControl 4.0 lets the operator set and recall the exact electrostatic parameters for each powder type — no guesswork, consistent results across shifts.',
                },
                {
                  t: 'Handles every powder type',
                  b: 'Standard epoxy, metallic, thermoplastic, and hot melt formulations — the OptiFlex range covers all powder classes used in Indian production.',
                },
              ].map((item) => (
                <div
                  key={item.t}
                  className="flex gap-4 rounded-[1rem] border border-[#FECE00]/[0.08] bg-[#FECE00]/[0.04] p-5"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FECE00]" />
                  <div>
                    <p className="font-display text-[0.88rem] font-black text-white">{item.t}</p>
                    <p className="mt-1 text-[0.72rem] leading-relaxed text-white/42">{item.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S3 — MODEL SELECTOR
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-20 md:py-24">
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/40">
              Three models — one system
            </p>
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-black leading-tight tracking-[-0.04em] text-[#0A0A0A]">
              Choose your OptiFlex Pro
            </h2>
          </div>

          {/* Model pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {MODELS.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActiveModel(i)}
                className={`rounded-full px-5 py-2 text-[0.63rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                  activeModel === i
                    ? 'border border-[#0A0A0A] bg-[#0A0A0A] text-white'
                    : 'border border-[#0A0A0A]/[0.14] text-[#0A0A0A]/40 hover:border-[#0A0A0A]/30 hover:text-[#0A0A0A]/70'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Active model panel */}
          <div className="grid gap-8 md:grid-cols-[1fr_1fr]">

            {/* Image viewport */}
            <ImageViewport
              label={MODELS[activeModel].imageLabel}
              src={MODELS[activeModel].imageSrc}
              aspect="aspect-[4/3]"
              objectFit={MODELS[activeModel].objectFit ?? 'cover'}
            />

            {/* Content */}
            <div className="flex flex-col justify-center">
              <span className="mb-2 self-start rounded-full border border-[#0A0A0A]/15 bg-[#0A0A0A]/[0.06] px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.15em] text-[#0A0A0A]/60">
                {MODELS[activeModel].tag}
              </span>
              <h3 className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
                {MODELS[activeModel].headline}
              </h3>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-[#0A0A0A]/55">
                {MODELS[activeModel].body}
              </p>

              {/* Model specs */}
              <div className="mt-6 rounded-[1rem] border border-[#0A0A0A]/[0.08] bg-white/60 p-5">
                {MODELS[activeModel].specs.map((s) => (
                  <SpecRow key={s.l} label={s.l} value={s.v} />
                ))}
              </div>

              <Link
                href="/contact?product=gema-manual-gun"
                className="mt-5 self-start rounded-full bg-[#0A0A0A] px-5 py-2 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#FECE00] hover:text-[#0A0A0A]"
              >
                Enquire about {MODELS[activeModel].label} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S4 — HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
              The process
            </p>
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-black leading-tight tracking-[-0.03em] text-white">
              How electrostatic powder<br />application works
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">

            {/* Step selector */}
            <div className="flex flex-col gap-3">
              {HOW_IT_WORKS.map((step, i) => (
                <button
                  key={step.n}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-start gap-4 rounded-[1rem] border p-5 text-left transition-all duration-200 ${
                    activeStep === i
                      ? 'border-[#FECE00]/30 bg-[#FECE00]/[0.06]'
                      : 'border-white/[0.05] bg-white/[0.02] hover:border-white/[0.1]'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-[0.68rem] font-black ${
                      activeStep === i
                        ? 'bg-[#FECE00] text-[#0A0A0A]'
                        : 'bg-white/[0.07] text-white/30'
                    }`}
                  >
                    {step.n}
                  </span>
                  <div>
                    <p
                      className={`font-display text-[0.88rem] font-black leading-tight ${
                        activeStep === i ? 'text-white' : 'text-white/45'
                      }`}
                    >
                      {step.title}
                    </p>
                    {activeStep === i && (
                      <p className="mt-2 text-[0.72rem] leading-relaxed text-white/42">
                        {step.body}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Step visual */}
            <div className="flex flex-col gap-4">
              <ImageViewport
                label={`Step ${HOW_IT_WORKS[activeStep].n} · ${HOW_IT_WORKS[activeStep].title} · diagram`}
                src={HOW_IT_WORKS[activeStep].imageSrc}
                aspect="aspect-[4/3]"
                className="border-[#FECE00]/[0.07]"
                isDark={true}
                objectFit={HOW_IT_WORKS[activeStep].objectFit ?? 'cover'}
              />
              <div className="rounded-[1rem] border border-[#FECE00]/[0.1] bg-[#FECE00]/[0.04] p-5">
                <p className="mb-1 text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#FECE00]/50">
                  {HOW_IT_WORKS[activeStep].n} — {HOW_IT_WORKS[activeStep].title}
                </p>
                <p className="text-[0.78rem] leading-relaxed text-white/55">
                  {HOW_IT_WORKS[activeStep].body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S5 — LINE INTEGRATION
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/35">
              Where it fits
            </p>
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              The manual gun in your line
            </h2>
          </div>

          {/* Flow diagram */}
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { label: 'Pretreatment', sub: 'PT Line', active: false },
              null,
              { label: 'Dry-off Oven', sub: 'Pre-heat', active: false },
              null,
              { label: 'Powder Booth', sub: 'Manual Gun here', active: true },
              null,
              { label: 'Curing Oven', sub: '180–200°C', active: false },
              null,
              { label: 'Inspection', sub: 'Off-load', active: false },
            ].map((node, i) =>
              node === null ? (
                <span key={i} className="shrink-0 text-[#0A0A0A]/20 text-xl font-light">→</span>
              ) : (
                <div
                  key={i}
                  className={`shrink-0 rounded-[0.8rem] border px-4 py-3 text-center transition-all ${
                    node.active
                      ? 'border-[#C9A500]/50 bg-[#FECE00]/[0.12]'
                      : 'border-black/[0.07] bg-white/60'
                  }`}
                >
                  <p className={`font-display text-[0.75rem] font-black ${node.active ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]/50'}`}>
                    {node.label}
                  </p>
                  <p className={`mt-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] ${node.active ? 'text-[#C9A500]' : 'text-[#0A0A0A]/28'}`}>
                    {node.sub}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Line diagram */}
          <LineDiagramSVG />

          <p className="mt-4 text-[0.72rem] leading-relaxed text-[#0A0A0A]/45">
            The OptiFlex Pro is the primary application tool in the powder spray booth — positioned between the dry-off oven and the curing oven. In manual lines, the operator controls gun angle, distance, and traverse speed. In batch automatic setups, the manual gun can be paired with a ZA01 or GEMA ZA reciprocator for consistent vertical traversal.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S6 — FULL SPECIFICATIONS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
                Technical data
              </p>
              <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-black leading-tight tracking-[-0.03em] text-white">
                Full specifications
              </h2>
            </div>
            <button className="rounded-full border border-[#FECE00]/20 px-5 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#FECE00]/50 transition-all hover:border-[#FECE00]/40 hover:text-[#FECE00]/80">
              ↓ Download Spec Sheet
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Range overview */}
            <div className="rounded-[1.1rem] border border-[#FECE00]/[0.08] bg-[#FECE00]/[0.03] p-6">
              <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#FECE00]/45">
                Model Overview
              </p>
              {[
                { l: 'Pro Q', v: 'Colour change in 35 sec; box-fed or hopper-fed' },
                { l: 'Pro F Spray', v: 'Up to 600 g/min; high-throughput production' },
                { l: 'Pro C', v: 'Standard all-round; gravity / hopper / wall-mount' },
                { l: 'Charging', v: 'MagicControl 4.0 compatible; programmable kV & µA' },
                { l: 'Disassembly', v: 'MagicPlug® tool-free' },
              ].map((r) => (
                <div key={r.l} className="flex justify-between gap-4 border-b border-white/[0.06] py-2.5">
                  <span className="text-[0.72rem] text-white/38">{r.l}</span>
                  <span className="text-right text-[0.72rem] font-semibold text-white/70">{r.v}</span>
                </div>
              ))}
            </div>

            {/* Powder & supply */}
            <div className="rounded-[1.1rem] border border-[#FECE00]/[0.08] bg-[#FECE00]/[0.03] p-6">
              <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#FECE00]/45">
                Powder & Supply
              </p>
              {[
                { l: 'Powder types', v: 'Standard, metallic, thermoplastic, hot melt' },
                { l: 'Feed system', v: 'Venturi — pressurised air draw from hopper or box' },
                { l: 'Connector standard', v: 'MagicPlug® — compatible with all GEMA peripherals' },
                { l: 'Generator', v: 'GEMA MagicControl 4.0 / 4.0 Plus' },
                { l: 'Supplied by', v: 'OptiFinish — authorised GEMA partner, India' },
              ].map((r) => (
                <div key={r.l} className="flex justify-between gap-4 border-b border-white/[0.06] py-2.5">
                  <span className="text-[0.72rem] text-white/38">{r.l}</span>
                  <span className="text-right text-[0.72rem] font-semibold text-white/70">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S7 — COMPATIBILITY + REFERENCE
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="grid gap-12 md:grid-cols-2">

            {/* Compatibility */}
            <div>
              <p className="mb-3 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/35">
                Compatibility & Integration
              </p>
              <h2 className="mb-6 font-display text-[clamp(1.4rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
                Works with your existing setup
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'GEMA MagicControl 4.0 / 4.0 Plus generators',
                  'OptiFinish powder spray booths — all types',
                  'GEMA OC08 OptiCentre powder management',
                  'All standard powder hopper configurations',
                  'GEMA ZA reciprocator series (semi-auto setup)',
                  'OptiFinish ZA01 vertical reciprocator',
                ].map((tag) => <Tag key={tag} label={tag} />)}
              </div>

              {/* Authorised partner note */}
              <div className="mt-6 rounded-[1rem] border border-black/[0.07] bg-white/70 p-5">
                <p className="text-[0.72rem] leading-relaxed text-[#0A0A0A]/55">
                  <span className="font-bold text-[#0A0A0A]/75">Authorised GEMA Partner.</span>{' '}
                  OptiFinish is an authorised GEMA partner in India. All equipment is genuine GEMA product — supplied with full Indian after-sales support, service, and spare parts availability.
                </p>
              </div>
            </div>

            {/* Reference project */}
            <div>
              <p className="mb-3 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/35">
                Reference Project
              </p>
              <h2 className="mb-6 font-display text-[clamp(1.4rem,3vw,2.2rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
                In use at
              </h2>

              <div className="rounded-[1rem] border border-black/[0.07] bg-white/70 p-6">
                <p className="mb-1 font-display text-[0.95rem] font-black text-[#0A0A0A]">
                  Vidyarana Steel Corporation
                </p>
                <p className="text-[0.72rem] leading-relaxed text-[#0A0A0A]/55">
                  GEMA OptiFlex Pro applicator supply and installation — complete setup and commissioning by OptiFinish.
                </p>
              </div>

              {/* Reference image viewport */}
              <ImageViewport
                label="Vidyarana Steel Corporation · installation reference"
                aspect="aspect-[16/7]"
                className="mt-4"
              />

              <p className="mt-4 text-[0.68rem] text-[#0A0A0A]/35">
                Reference projects shown with client permission. Contact us for case study details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S8 — RELATED PRODUCTS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-10">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#FECE00]/45">
              Complete your setup
            </p>
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-black leading-tight tracking-[-0.03em] text-white">
              Often paired with this gun
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {RELATED.map((rel) => (
              <Link
                key={rel.name}
                href={rel.href}
                className="group flex flex-col overflow-hidden rounded-[1.1rem] border border-[#FECE00]/[0.07] bg-[#FECE00]/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FECE00]/[0.18]"
              >
                <ImageViewport
                  label={rel.imageLabel}
                  src={rel.imageSrc}
                  aspect="aspect-[4/3]"
                  className="rounded-none rounded-t-[1.1rem] border-0 border-b border-[#FECE00]/[0.07]"
                />
                <div className="flex flex-col gap-1.5 p-4">
                  <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#FECE00]/40">
                    {rel.cat}
                  </p>
                  <p className="font-display text-[0.88rem] font-black leading-tight text-white">
                    {rel.name}
                  </p>
                  <p className="text-[0.65rem] text-white/30">{rel.sub}</p>
                  <span className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/20 transition-colors group-hover:text-[#FECE00]/70">
                    View product →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S9 — DOWNLOADS
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f1efea] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.62] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(201,165,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,0,0.22) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
        <div className="pointer-events-none absolute inset-0 grid-drift opacity-[0.32] mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(255,243,163,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,243,163,0.5) 1px, transparent 1px)', backgroundSize: '264px 264px' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-8">
            <p className="mb-2 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/35">
              Resources
            </p>
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-black leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              Downloads
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: '📄',
                title: 'OptiFlex Pro Brochure',
                sub: 'Full range overview — Pro Q, Pro F Spray, Pro C',
                size: 'PDF · Available on request',
              },
              {
                icon: '📐',
                title: 'Technical Spec Sheet',
                sub: 'Dimensions, electrical, powder output data',
                size: 'PDF · Available on request',
              },
              {
                icon: '🔧',
                title: 'Cleaning & Maintenance Guide',
                sub: 'MagicPlug® disassembly procedure, colour change protocol',
                size: 'PDF · Available on request',
              },
            ].map((dl) => (
              <div
                key={dl.title}
                className="flex flex-col gap-4 rounded-[1rem] border border-black/[0.07] bg-white/70 p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{dl.icon}</span>
                  <div>
                    <p className="font-display text-[0.88rem] font-black text-[#0A0A0A]">
                      {dl.title}
                    </p>
                    <p className="mt-0.5 text-[0.65rem] text-[#0A0A0A]/45">{dl.sub}</p>
                    <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#0A0A0A]/30">
                      {dl.size}
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact?product=gema-manual-gun&request=brochure"
                  className="mt-auto rounded-full border border-[#0A0A0A]/[0.1] px-4 py-2 text-center text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/40 transition-all hover:border-[#0A0A0A]/25 hover:text-[#0A0A0A]/70"
                >
                  Request →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          S10 — PRODUCT CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FECE00] py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            opacity: 0.055,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#0A0A0A]/45">
                Get GEMA equipment in India
              </p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#0A0A0A]">
                Ready to upgrade<br />your powder line?
              </h2>
              <p className="mt-4 max-w-md text-[0.88rem] leading-relaxed text-[#0A0A0A]/60">
                Tell us your booth setup, powder types, and throughput. We&apos;ll recommend the right OptiFlex Pro model and support the full installation.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact?product=gema-manual-gun"
                className="rounded-full bg-[#0A0A0A] px-8 py-3.5 text-center text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#0A0A0A]/80"
              >
                Get a Quote →
              </Link>
              <Link
                href="/products/gema"
                className="rounded-full border-2 border-[#0A0A0A]/20 px-8 py-3.5 text-center text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/60 transition-all hover:border-[#0A0A0A]/40"
              >
                ← Back to GEMA range
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
