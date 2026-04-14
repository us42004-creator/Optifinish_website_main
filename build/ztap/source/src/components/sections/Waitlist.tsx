'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '@/components/ui/Pill';
import { COUNTRY_CODES } from '@/data/countryCodes';

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES = [
  'Automotive',
  'Aerospace & Defense',
  'Industrial Equipment',
  'Consumer Electronics',
  'Furniture & Fixtures',
  'Construction Materials',
  'General Manufacturing',
  'Other',
];

function CheckmarkIcon() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16" fill="none">
      <circle
        cx="26" cy="26" r="25"
        stroke="#FECE00" strokeWidth="2"
        style={{ strokeDasharray: 157, strokeDashoffset: 157, animation: 'dash-circle 0.6s ease-in-out 0.1s forwards' }}
      />
      <path
        d="M14 26 L22 34 L38 18"
        stroke="#FECE00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 36, strokeDashoffset: 36, animation: 'dash-check 0.4s ease-in-out 0.7s forwards' }}
      />
      <style>{`
        @keyframes dash-circle { to { stroke-dashoffset: 0; } }
        @keyframes dash-check  { to { stroke-dashoffset: 0; } }
      `}</style>
    </svg>
  );
}

type OtpStatus = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'error';
type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full rounded-[1.2rem] border border-white/12 bg-black/35 px-4 py-4 text-sm text-white placeholder:text-white/28 focus:border-yellow focus:outline-none transition-colors duration-200';

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff60' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat' as const,
  backgroundPosition: 'right 1rem center',
};

export default function Waitlist() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    email: '',
    company: '',
    industry: INDUSTRIES[0],
    dialCode: '+91',
    phone: '',
  });
  const [otp, setOtp]             = useState('');
  const [otpStatus, setOtpStatus] = useState<OtpStatus>('idle');
  const [otpError, setOtpError]   = useState('');
  const [status, setStatus]       = useState<Status>('idle');
  const [errorMsg, setErrorMsg]   = useState('');

  const isIndian = form.dialCode === '+91';
  const phoneVerified = !isIndian || otpStatus === 'verified';
  const fullPhone = `${form.dialCode}${form.phone.replace(/^0+/, '')}`;

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  // ── Send OTP ──────────────────────────────────────────────────────
  const sendOtp = async () => {
    setOtpStatus('sending');
    setOtpError('');
    try {
      const res  = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const data = await res.json();
      if (!res.ok) { setOtpError(data.error); setOtpStatus('error'); return; }
      setOtpStatus('sent');
    } catch {
      setOtpError('Network error. Try again.');
      setOtpStatus('error');
    }
  };

  // ── Verify OTP ────────────────────────────────────────────────────
  const verifyOtp = async () => {
    setOtpStatus('verifying');
    setOtpError('');
    try {
      const res  = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone, otp }),
      });
      const data = await res.json();
      if (!res.ok) { setOtpError(data.error); setOtpStatus('sent'); return; }
      setOtpStatus('verified');
    } catch {
      setOtpError('Network error. Try again.');
      setOtpStatus('sent');
    }
  };

  // ── Submit form ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneVerified) { setErrorMsg('Please verify your phone number first.'); return; }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res  = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:    form.email,
          company:  form.company,
          industry: form.industry,
          phone:    fullPhone,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); return; }
      setStatus('success');
    } catch {
      setErrorMsg('Network error. Check your connection.');
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const listItems = listRef.current
        ? gsap.utils.toArray<HTMLElement>('[data-waitlist-item]', listRef.current)
        : [];

      gsap.set(pillRef.current, { x: '-120%', opacity: 0 });
      gsap.set(line1Ref.current, { x: '-110%', opacity: 0 });
      gsap.set(line2Ref.current, { x: '90%', opacity: 0 });
      gsap.set(bodyRef.current, { y: 20, opacity: 0 });
      gsap.set(listItems, { y: 18, opacity: 0 });
      gsap.set(formCardRef.current, { y: 34, opacity: 0, scale: 0.98 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'top 24%',
          scrub: 0.5,
        },
      });

      tl.to(pillRef.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.35 }, 0)
        .to(line1Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.08)
        .to(line2Ref.current, { x: '0%', opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.16)
        .to(bodyRef.current, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.35 }, 0.18)
        .to(listItems, { y: 0, opacity: 1, stagger: 0.08, ease: 'power3.out', duration: 0.3 }, 0.26)
        .to(formCardRef.current, { y: 0, opacity: 1, scale: 1, ease: 'power3.out', duration: 0.42 }, 0.24);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="waitlist" className="relative bg-[#0a0a0a] py-16 text-white sm:py-20 lg:py-24">
      {/* Base dim grid — always visible */}
      <div
        className="pointer-events-none absolute inset-0 grid-drift opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(254,206,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(254,206,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
        }}
      />
      {/* Grid pulse — entire grid flares up periodically */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(254,206,0,0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(254,206,0,0.55) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
          animation: 'wl-grid-pulse 3.8s ease-in-out infinite',
        }}
      />
      {/* Intersection sparks — at exact grid crossings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{ top: '176px', left: '176px', animation: 'wl-spark 3.2s ease-out infinite 0.4s', filter: 'blur(1px)' }}
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff_0%,rgba(254,206,0,0.9)_25%,rgba(254,206,0,0.3)_55%,transparent_75%)]"
        />
        <div style={{ top: '88px', left: '352px', animation: 'wl-spark 2.6s ease-out infinite 1.3s' }}
          className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff_0%,rgba(254,206,0,0.85)_25%,rgba(254,206,0,0.25)_55%,transparent_75%)]"
        />
        <div style={{ top: '264px', left: '528px', animation: 'wl-spark 3.8s ease-out infinite 2.1s' }}
          className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff_0%,rgba(254,206,0,0.92)_22%,rgba(254,206,0,0.28)_52%,transparent_72%)]"
        />
        <div style={{ top: '352px', left: '704px', animation: 'wl-spark 2.2s ease-out infinite 0.8s' }}
          className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff_0%,rgba(254,206,0,0.88)_24%,rgba(254,206,0,0.26)_54%,transparent_74%)]"
        />
        <div style={{ top: '176px', left: '704px', animation: 'wl-spark 4.1s ease-out infinite 3.0s' }}
          className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff_0%,rgba(254,206,0,0.8)_24%,rgba(254,206,0,0.22)_54%,transparent_74%)]"
        />
      </div>
      <style>{`
        @keyframes wl-grid-pulse {
          0%, 100% { opacity: 0; }
          18%       { opacity: 0; }
          28%       { opacity: 0.55; }
          38%       { opacity: 0.1; }
          50%       { opacity: 0.45; }
          60%       { opacity: 0; }
        }
@keyframes wl-spark {
          0%, 100% { opacity: 0; transform: translate(-50%,-50%) scale(0); }
          4%        { opacity: 1; transform: translate(-50%,-50%) scale(1.8); }
          10%       { opacity: 0.6; transform: translate(-50%,-50%) scale(1.1); }
          18%       { opacity: 0; transform: translate(-50%,-50%) scale(0.4); }
        }
      `}</style>
      <div className="relative z-10 px-6 md:px-10 lg:px-12">
        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#0d0d0d] shadow-[0_24px_80px_rgba(0,0,0,0.4),0_0_30px_rgba(254,206,0,0.05),inset_0_1px_0_rgba(255,255,255,0.05)] sm:rounded-[2rem]">
          {/* Top yellow accent line — animated sweep */}
          <div className="wl-bar-sweep absolute inset-x-0 top-0 h-[1.5px]" />

          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">

          {/* Left — copy */}
          <div className="justify-self-start">
            <div className="mb-6">
              <div ref={pillRef} className="w-fit">
                <Pill variant="yellow">Visit Our Lab</Pill>
              </div>
            </div>
            <h2 className="mobile-hero-ratio-title desktop-section-heading font-display font-black uppercase">
              <div className="overflow-hidden">
                <span ref={line1Ref} className="block text-yellow">Come see Z-TAP</span>
              </div>
              <div className="overflow-hidden">
                <span ref={line2Ref} className="block">coat your part.</span>
              </div>
            </h2>
            <p ref={bodyRef} className="mobile-hero-ratio-copy mt-5 max-w-xl text-white/62 sm:text-sm lg:text-sm lg:leading-relaxed">
              Book a session at our Noida lab. Bring your toughest part — we'll run Z-TAP live and show you the repeatability numbers.
            </p>
            <div ref={listRef} className="mt-7 hidden lg:mt-10 lg:grid lg:gap-4">
              {[
                'Live Z-TAP mimic run on your actual part geometry.',
                'Full path capture and program publish in under 5 minutes.',
                'Walk away with a recorded session and a fit assessment report.',
              ].map((item) => (
                <div key={item} data-waitlist-item className="flex items-start gap-3 text-[0.82rem] leading-relaxed text-white/66">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-yellow" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div ref={formCardRef} className="rounded-[1.6rem] border border-white/10 bg-[#0f0f0f] p-5 shadow-[0_20px_54px_rgba(0,0,0,0.5),0_0_22px_rgba(254,206,0,0.06),inset_0_1px_0_rgba(255,255,255,0.05)] sm:rounded-[1.8rem] sm:p-8">
            {status === 'success' ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
                <CheckmarkIcon />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-yellow">Visit Confirmed</p>
                  <h3 className="card-title-supporting mt-4 font-display font-black uppercase sm:text-3xl sm:leading-[0.92] sm:tracking-[-0.04em]">
                    We'll be in touch within 24 hours.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    Expect a calendar invite and a short pre-visit questionnaire.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">Lab Visit Request</p>
                  <h3 className="card-title-supporting mt-4 font-display font-black uppercase sm:text-2xl sm:tracking-[-0.04em]">Book your session.</h3>
                </div>

                {/* Email + Company */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Work Email</label>
                    <input type="email" required value={form.email} onChange={set('email')}
                      placeholder="you@company.com" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Company Name</label>
                    <input type="text" required value={form.company} onChange={set('company')}
                      placeholder="Your company" className={inputClass} />
                  </div>
                </div>

                {/* Phone with country code + OTP */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Phone Number {isIndian && otpStatus === 'verified' && (
                      <span className="ml-2 text-yellow">✓ Verified</span>
                    )}
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    {/* Country code selector */}
                    <select
                      value={form.dialCode}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, dialCode: e.target.value }));
                        setOtpStatus('idle');
                        setOtp('');
                      }}
                      className="rounded-[1.2rem] border border-white/12 bg-black/35 px-3 py-4 text-sm text-white focus:border-yellow focus:outline-none transition-colors duration-200 appearance-none min-w-[96px]"
                      style={selectStyle}
                    >
                      {COUNTRY_CODES.map((c) => {
                        const flag = c.iso.toUpperCase().replace(/./g, (ch) =>
                          String.fromCodePoint(0x1F1E6 + ch.charCodeAt(0) - 65)
                        );
                        return (
                          <option key={`${c.iso}-${c.dial}`} value={c.dial} className="bg-[#0a0a0a]">
                            {flag} {c.name} ({c.dial})
                          </option>
                        );
                      })}
                    </select>

                    {/* Phone number input */}
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => {
                        set('phone')(e);
                        if (otpStatus !== 'idle') { setOtpStatus('idle'); setOtp(''); }
                      }}
                      placeholder={isIndian ? '98765 43210' : 'Phone number'}
                      className={`${inputClass} flex-1`}
                      disabled={otpStatus === 'verified'}
                    />
                  </div>

                  {/* OTP flow for Indian numbers */}
                  {isIndian && form.phone.length >= 10 && otpStatus !== 'verified' && (
                    <div className="mt-2 space-y-2">
                      {(otpStatus === 'idle' || otpStatus === 'error') && (
                        <button
                          type="button"
                          onClick={sendOtp}
                          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow underline underline-offset-2 hover:text-yellow/80 transition-colors"
                        >
                          Send OTP →
                        </button>
                      )}
                      {otpStatus === 'sending' && (
                        <p className="text-[11px] text-white/40 uppercase tracking-[0.18em]">Sending OTP…</p>
                      )}
                      {(otpStatus === 'sent' || otpStatus === 'verifying') && (
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="6-digit OTP"
                            className="flex-1 rounded-[1.2rem] border border-white/12 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/28 focus:border-yellow focus:outline-none tracking-[0.3em]"
                          />
                          <button
                            type="button"
                            onClick={verifyOtp}
                            disabled={otp.length !== 6 || otpStatus === 'verifying'}
                            className="rounded-[1.2rem] bg-yellow px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink disabled:opacity-50 transition-opacity"
                          >
                            {otpStatus === 'verifying' ? '…' : 'Verify'}
                          </button>
                        </div>
                      )}
                      {otpError && (
                        <p className="text-[11px] text-red-300">{otpError}</p>
                      )}
                      {otpStatus === 'sent' && (
                        <button
                          type="button"
                          onClick={sendOtp}
                          className="text-[10px] text-white/30 hover:text-white/55 transition-colors"
                        >
                          Didn't receive it? Resend OTP
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Primary Industry */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Primary Industry</label>
                  <select required value={form.industry} onChange={set('industry')}
                    className="w-full rounded-[1.2rem] border border-white/12 bg-black/35 px-4 py-4 text-sm text-white focus:border-yellow focus:outline-none transition-colors duration-200 appearance-none"
                    style={selectStyle}
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind} className="bg-[#0a0a0a]">{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {status === 'error' && errorMsg && (
                  <p className="rounded-xl border border-red-400/20 bg-red-400/8 px-4 py-3 text-sm text-red-300">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || (isIndian && !phoneVerified)}
                  className="panel-button w-full bg-yellow text-ink hover:bg-[#ffe36a] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting…' : isIndian && !phoneVerified ? 'Verify phone to continue' : 'Book Lab Visit'}
                </button>

                <p className="text-center text-[10px] text-white/25">
                  Indian numbers require OTP verification before submission.
                </p>
              </form>
            )}
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
