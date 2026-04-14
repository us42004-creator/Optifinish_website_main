import { clsx } from 'clsx';

interface PillProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'dark' | 'outline';
  className?: string;
}

export default function Pill({ children, variant = 'yellow', className }: PillProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.24em] sm:px-5 sm:py-2 sm:text-[10px]',
        variant === 'yellow' && 'border border-yellow/30 bg-yellow/[0.07] text-yellow shadow-[0_0_14px_rgba(254,206,0,0.08)]',
        variant === 'dark'   && 'border border-ink/10 bg-ink text-white/90 shadow-[0_4px_14px_rgba(0,0,0,0.12)]',
        variant === 'outline' && 'border border-ink/20 bg-white/60 text-ink/60',
        className,
      )}
    >
      <span
        className={clsx(
          'h-1.5 w-1.5 shrink-0 rounded-full',
          variant === 'yellow'  && 'bg-yellow opacity-80',
          variant === 'dark'    && 'bg-yellow/80',
          variant === 'outline' && 'bg-ink/30',
        )}
      />
      {children}
    </span>
  );
}
