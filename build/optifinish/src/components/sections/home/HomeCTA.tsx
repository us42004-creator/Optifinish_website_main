import Link from 'next/link';

export default function HomeCTA() {
  return (
    <section className="bg-[#f1efea] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="noise relative overflow-hidden rounded-[1.75rem] bg-ink px-8 py-14 text-center md:px-16 md:py-20">

          {/* Yellow glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow/20 blur-[80px]" />

          <div className="relative">
            <span className="tech-kicker mb-4 block">Ready to talk?</span>
            <h2 className="font-display mx-auto max-w-2xl text-[clamp(1.8rem,4.5vw,3.2rem)] font-black leading-[0.93] tracking-[-0.04em] text-white">
              Let&apos;s find the right coating solution for your line.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[0.88rem] leading-relaxed text-white/45">
              Whether you need a complete plant, a single machine, an automation upgrade,
              or after-sales support — we&apos;re here.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="panel-button dynamic-button dynamic-button-yellow">
                <span>Get in Touch</span>
                <div className="dynamic-button-glow" />
              </Link>
              <Link href="/products" className="panel-button dynamic-button dynamic-button-light text-ink">
                <span>Explore Products</span>
                <div className="dynamic-button-glow" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
