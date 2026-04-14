import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-6 py-10 text-white sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="OptiFinish"
            width={192}
            height={192}
            className="h-12 w-auto object-contain"
          />
          <div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/38">Mimic-guided coating automation</span>
            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.22em] text-white/22">
              A unit of Value Added Coating Solutions
            </span>
          </div>
        </div>

        <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/25 sm:text-[10px] sm:tracking-[0.25em]">
          © {new Date().getFullYear()} OptiFinish. All rights reserved.
        </p>

        <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/25 sm:text-[10px] sm:tracking-[0.25em]">
          Built around the Fairino platform
        </p>
      </div>
    </footer>
  );
}
