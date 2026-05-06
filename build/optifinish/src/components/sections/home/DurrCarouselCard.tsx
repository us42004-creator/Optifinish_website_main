'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  { src: '/images/products/durr/bell-atomiser/durr-ecobell-slider-01.webp',        label: 'EcoBell Rotary Atomiser' },
  { src: '/images/products/durr/general/durr-spray-booth-interior-01.webp',   label: 'Liquid Coating Booth' },
  { src: '/images/products/durr/general/durr-paint-robot-automotive-01.webp', label: 'Paint Robot — Automotive' },
  { src: '/images/products/durr/air-assist-gun/durr-ecogun-aa-auto-01.jpg',          label: 'EcoGun AA Auto' },
  { src: '/images/products/durr/ecopump/durr-ecopump9-dosing-01.webp',        label: 'EcoPump9 Dosing System' },
  { src: '/images/products/durr/general/durr-ready2spray-01.webp',            label: 'Ready2Spray Robot Cell' },
];

export default function DurrCarouselCard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link
      href="/products/durr"
      className="group flex flex-col gap-4 overflow-hidden rounded-[1.4rem] border border-ink/[0.07] bg-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
    >
      {/* Carousel image strip */}
      <div className="relative h-44 w-full overflow-hidden">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i === 0}
            />
            {/* Gradient overlay so text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? 'w-4 bg-white' : 'w-1 bg-white/45'
              }`}
            />
          ))}
        </div>

        {/* Current slide label */}
        <div className="absolute bottom-8 left-3 z-10">
          <span className="rounded-full bg-black/30 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
            {SLIDES[current].label}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 px-5 pb-5">
        {/* Tag */}
        <span className="self-start rounded-full bg-surface-2 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-ink">
          Authorised Partner
        </span>

        {/* Title */}
        <h3 className="font-display text-[1.15rem] font-black leading-tight tracking-tight text-ink">
          DÜRR
        </h3>

        {/* Description */}
        <p className="text-[0.78rem] leading-relaxed text-ink/50">
          DÜRR liquid coating systems for high-precision industrial applications.
        </p>

        {/* Items */}
        <ul className="mt-auto flex flex-col gap-1.5 border-t border-ink/[0.06] pt-3">
          {['Liquid Coating Guns', 'EcoPump Systems', 'Liquid Coating Plants'].map((item) => (
            <li key={item} className="flex items-center gap-2 text-[0.72rem] font-medium text-ink/60">
              <span className="h-1 w-1 flex-shrink-0 rounded-full bg-yellow" />
              {item}
            </li>
          ))}
        </ul>

        {/* Arrow */}
        <div className="mt-1 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/35 transition-colors group-hover:text-yellow-dark">
          View range
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
