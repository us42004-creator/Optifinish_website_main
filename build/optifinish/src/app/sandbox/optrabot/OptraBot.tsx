'use client';

import { motion } from 'framer-motion';

/*
  OptraBot v5 — proper fills, gradients, depth + OptiFinish logo on antenna
  Design language: matches site card system — rounded rects, yellow+dark palette
  Key fix: SVG gradients added so parts are visually distinct (not a black blob)
*/

const Y = '#FECE00';
const W = '#FFFFFF';
const ease = [0.22, 1, 0.36, 1] as const;

function Particle({ delay, dx = 16, dy = -12 }: { delay: number; dx?: number; dy?: number }) {
  return (
    <motion.circle cx={0} cy={0} r={2.5} fill={Y}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: [0, 0.9, 0], x: [0, dx], y: [0, dy] }}
      transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 0.9, ease: 'easeOut' }}
    />
  );
}

export default function OptraBot({ mouseX = 0 }: { mouseX?: number }) {
  const tilt = mouseX * 5;

  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 320" width="260" height="416" fill="none"
        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-label="OptraBot"
      >
        <defs>
          {/* Body gradient — charcoal top to near-black bottom */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2a2d32" />
            <stop offset="100%" stopColor="#0e1013" />
          </linearGradient>

          {/* Head gradient — slightly lighter at top for lighting feel */}
          <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2e3138" />
            <stop offset="100%" stopColor="#0e1013" />
          </linearGradient>

          {/* Arm/leg gradient — cylinder illusion */}
          <linearGradient id="limbGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#1a1d22" />
            <stop offset="40%"  stopColor="#2c3038" />
            <stop offset="100%" stopColor="#111316" />
          </linearGradient>

          {/* Chest panel gradient */}
          <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#22262c" />
            <stop offset="100%" stopColor="#141619" />
          </linearGradient>

          {/* Boot gradient */}
          <linearGradient id="bootGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1c1f24" />
            <stop offset="100%" stopColor="#0a0c0f" />
          </linearGradient>

          {/* Yellow radial glow for shoulder joints */}
          <radialGradient id="shoulderGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={Y} stopOpacity="1" />
            <stop offset="100%" stopColor={Y} stopOpacity="0.2" />
          </radialGradient>

          {/* Eye white gradient — slight top-light */}
          <linearGradient id="eyeWhite" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8eaed" />
          </linearGradient>

          {/* Gun body gradient */}
          <linearGradient id="gunGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#282c32" />
            <stop offset="100%" stopColor="#131619" />
          </linearGradient>

          {/* Antenna logo clip circle */}
          <clipPath id="logoClip">
            <circle cx="100" cy="-12" r="13" />
          </clipPath>
        </defs>

        {/* ground shadow */}
        <ellipse cx="100" cy="316" rx="52" ry="5" fill="#000" opacity="0.18" />

        {/* ══ LEGS ══ */}
        <motion.g
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.0 }}
        >
          {/* left leg */}
          <rect x="57" y="234" width="32" height="50" rx="14" fill="url(#limbGrad)" />
          <rect x="57" y="234" width="32" height="50" rx="14" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
          {/* left boot */}
          <rect x="49" y="268" width="44" height="20" rx="10" fill="url(#bootGrad)" />
          <rect x="49" y="268" width="44" height="20" rx="10" stroke="#252a30" strokeWidth="1" fill="none" />
          <rect x="52" y="282" width="38" height="3.5" rx="1.75" fill={Y} opacity="0.65" />

          {/* right leg */}
          <rect x="111" y="234" width="32" height="50" rx="14" fill="url(#limbGrad)" />
          <rect x="111" y="234" width="32" height="50" rx="14" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
          {/* right boot */}
          <rect x="107" y="268" width="44" height="20" rx="10" fill="url(#bootGrad)" />
          <rect x="107" y="268" width="44" height="20" rx="10" stroke="#252a30" strokeWidth="1" fill="none" />
          <rect x="110" y="282" width="38" height="3.5" rx="1.75" fill={Y} opacity="0.65" />
        </motion.g>

        {/* ══ BODY ══ */}
        <motion.g
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.06 }}
          style={{ transformOrigin: '100px 192px' }}
        >
          {/* body shell */}
          <rect x="42" y="154" width="116" height="86" rx="22" fill="url(#bodyGrad)" />
          <rect x="42" y="154" width="116" height="86" rx="22" stroke="#303540" strokeWidth="1.5" fill="none" />

          {/* top yellow hairline */}
          <rect x="48" y="154" width="104" height="2" rx="1" fill={Y} opacity="0.5" />

          {/* chest panel */}
          <rect x="58" y="170" width="84" height="50" rx="12" fill="url(#panelGrad)" />
          <rect x="58" y="170" width="84" height="50" rx="12" stroke="#30353d" strokeWidth="1" fill="none" />

          {/* OF text on chest */}
          <text x="100" y="200" textAnchor="middle"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 24, letterSpacing: -1, fill: Y }}
          >OF</text>

          {/* status dots */}
          <motion.circle cx="68" cy="230" r="3.5" fill={Y}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <circle cx="80" cy="230" r="3.5" fill="#252a30" />
          <circle cx="92" cy="230" r="3.5" fill="#252a30" />

          {/* shoulder joints */}
          <circle cx="42" cy="174" r="13" fill="url(#bodyGrad)" stroke="#303540" strokeWidth="1.5" />
          <circle cx="42" cy="174" r="7"  fill="#1a1d22"       stroke={Y}       strokeWidth="1.5" />
          <circle cx="42" cy="174" r="3"  fill="url(#shoulderGlow)" />

          <circle cx="158" cy="174" r="13" fill="url(#bodyGrad)" stroke="#303540" strokeWidth="1.5" />
          <circle cx="158" cy="174" r="7"  fill="#1a1d22"        stroke={Y}       strokeWidth="1.5" />
          <circle cx="158" cy="174" r="3"  fill="url(#shoulderGlow)" />
        </motion.g>

        {/* ══ LEFT ARM ══ */}
        <motion.g
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, ease, delay: 0.2 }}
        >
          <rect x="14" y="172" width="24" height="52" rx="12" fill="url(#limbGrad)" />
          <rect x="14" y="172" width="24" height="52" rx="12" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
          {/* elbow disc */}
          <circle cx="26" cy="228" r="11" fill="url(#bodyGrad)" stroke="#303540" strokeWidth="1.5" />
          <circle cx="26" cy="228" r="5"  fill="#1c2026" />
          {/* forearm */}
          <rect x="14" y="234" width="24" height="36" rx="10" fill="url(#limbGrad)" />
          <rect x="14" y="234" width="24" height="36" rx="10" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
          {/* hand */}
          <rect x="8" y="264" width="36" height="18" rx="9" fill="url(#bootGrad)" />
          <rect x="8" y="264" width="36" height="18" rx="9" stroke="#252a30" strokeWidth="1" fill="none" />
        </motion.g>

        {/* ══ RIGHT ARM + GUN ══ */}
        <motion.g
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.44, ease, delay: 0.22 }}
        >
          <rect x="162" y="164" width="24" height="52" rx="12" fill="url(#limbGrad)" />
          <rect x="162" y="164" width="24" height="52" rx="12" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
          {/* elbow */}
          <circle cx="174" cy="220" r="11" fill="url(#bodyGrad)" stroke="#303540" strokeWidth="1.5" />
          <circle cx="174" cy="220" r="5"  fill="#1c2026" />
          {/* forearm */}
          <rect x="162" y="202" width="24" height="36" rx="10" fill="url(#limbGrad)" />
          <rect x="162" y="202" width="24" height="36" rx="10" stroke="#2a2f36" strokeWidth="1.2" fill="none" />

          {/* ── GUN ── */}
          <g transform="translate(154, 124) rotate(-12 28 16)">
            <rect x="0" y="4" width="58" height="24" rx="12" fill="url(#gunGrad)" />
            <rect x="0" y="4" width="58" height="24" rx="12" stroke="#303540" strokeWidth="1.2" fill="none" />
            {/* yellow stripe */}
            <rect x="4" y="9.5" width="46" height="6" rx="3" fill={Y} opacity="0.9" />
            {/* grip */}
            <rect x="12" y="28" width="14" height="20" rx="7" fill="url(#gunGrad)" />
            <rect x="12" y="28" width="14" height="20" rx="7" stroke="#2a2f36" strokeWidth="1" fill="none" />
            {/* barrel */}
            <rect x="48" y="6" width="26" height="20" rx="10" fill="#1c2026" />
            <rect x="48" y="6" width="26" height="20" rx="10" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
            {/* nozzle */}
            <circle cx="74" cy="16" r="8" fill="#111418" stroke={Y} strokeWidth="2" />
            <motion.circle cx="74" cy="16" r="4" fill={Y}
              animate={{ opacity: [0.35, 1, 0.35], r: [3.5, 4.5, 3.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <circle cx="74" cy="16" r="1.5" fill={W} opacity="0.7" />
          </g>

          {/* particles */}
          <g transform="translate(193, 122)">
            <Particle delay={0}    dx={18} dy={-10} />
            <Particle delay={0.35} dx={24} dy={-18} />
            <Particle delay={0.7}  dx={14} dy={-6}  />
            <Particle delay={1.05} dx={28} dy={-22} />
          </g>
        </motion.g>

        {/* ══ NECK ══ */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <rect x="82" y="138" width="36" height="18" rx="7" fill="url(#panelGrad)" />
          <rect x="82" y="138" width="36" height="18" rx="7" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
          <rect x="78" y="153" width="44" height="2.5" rx="1.25" fill={Y} opacity="0.4" />
        </motion.g>

        {/* ══ HEAD ══ */}
        <motion.g
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0, rotate: tilt }}
          transition={{ duration: 0.6, ease, delay: 0.38 }}
          style={{ transformOrigin: '100px 76px' }}
        >
          {/* head shell */}
          <rect x="32" y="14" width="136" height="126" rx="28" fill="url(#headGrad)" />
          <rect x="32" y="14" width="136" height="126" rx="28" stroke="#303540" strokeWidth="1.5" fill="none" />

          {/* top yellow hairline */}
          <rect x="40" y="14" width="120" height="2" rx="1" fill={Y} opacity="0.5" />

          {/* ── EYES ── */}
          <rect x="44" y="38" width="42" height="42" rx="14" fill="url(#eyeWhite)" />
          <rect x="114" y="38" width="42" height="42" rx="14" fill="url(#eyeWhite)" />

          {/* iris */}
          <motion.rect x="52" y="46" width="26" height="26" rx="10" fill="#0e1013"
            style={{ transformOrigin: '65px 59px' }}
            animate={{ scaleY: [1, 0.08, 1] }}
            transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 3.6 }}
          />
          <motion.rect x="122" y="46" width="26" height="26" rx="10" fill="#0e1013"
            style={{ transformOrigin: '135px 59px' }}
            animate={{ scaleY: [1, 0.08, 1] }}
            transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 3.6, delay: 0.08 }}
          />

          {/* yellow eye border */}
          <rect x="44" y="38" width="42" height="42" rx="14" stroke={Y} strokeWidth="2.5" fill="none" />
          <rect x="114" y="38" width="42" height="42" rx="14" stroke={Y} strokeWidth="2.5" fill="none" />

          {/* eye shines */}
          <circle cx="71" cy="52" r="5.5" fill={W} opacity="0.9" />
          <circle cx="141" cy="52" r="5.5" fill={W} opacity="0.9" />
          <circle cx="73" cy="50" r="2"   fill={W} opacity="0.55" />
          <circle cx="143" cy="50" r="2"   fill={W} opacity="0.55" />

          {/* mouth smile */}
          <path d="M72 100 Q100 116 128 100" stroke={Y} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />

          {/* ── ANTENNA + OPTIFINISH LOGO ── */}
          {/* antenna stem */}
          <rect x="96" y="2" width="8" height="16" rx="4" fill="#252a30" stroke="#303540" strokeWidth="1" />
          {/* logo circle background */}
          <circle cx="100" cy="-12" r="14" fill={Y} />
          {/* OptiFinish logo image clipped to circle */}
          <image
            href="/logo.png"
            x="87" y="-25"
            width="26" height="26"
            clipPath="url(#logoClip)"
            preserveAspectRatio="xMidYMid meet"
          />
          {/* subtle glow ring around logo */}
          <motion.circle cx="100" cy="-12" r="14" fill="none" stroke={Y}
            animate={{ opacity: [0.4, 0.9, 0.4], r: [14, 17, 14] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── EARS ── */}
          <rect x="10" y="50" width="24" height="44" rx="12" fill="url(#limbGrad)" />
          <rect x="10" y="50" width="24" height="44" rx="12" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
          <motion.circle cx="22" cy="72" r="5.5" fill={Y}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />

          <rect x="166" y="50" width="24" height="44" rx="12" fill="url(#limbGrad)" />
          <rect x="166" y="50" width="24" height="44" rx="12" stroke="#2a2f36" strokeWidth="1.2" fill="none" />
          <motion.circle cx="178" cy="72" r="5.5" fill={Y}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 1.1 }}
          />
        </motion.g>

      </svg>
    </motion.div>
  );
}
