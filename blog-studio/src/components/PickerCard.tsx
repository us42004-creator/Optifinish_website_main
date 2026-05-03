import React from 'react';

interface Props {
  active: boolean;
  title: string;
  subtitle: string;
  meta?: string[];
  onClick: () => void;
}

export const PickerCard: React.FC<Props> = ({ active, title, subtitle, meta, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 rounded-xl border transition-all relative overflow-hidden group ${
        active
          ? 'border-ember-500 bg-ember-500/5 shadow-[0_0_0_1px_rgba(255,107,53,0.4)]'
          : 'border-ink-700 hover:border-ink-600 bg-ink-900/50 hover:bg-ink-900'
      }`}
    >
      {active && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-ember-500 pulse-ember" />
      )}
      <h3
        className={`text-base font-bold mb-2 leading-tight ${
          active ? 'text-paper' : 'text-paper-100'
        }`}
      >
        {title}
      </h3>
      <p className="text-xs text-steel-400 leading-relaxed mb-3">{subtitle}</p>
      {meta && meta.length > 0 && (
        <ul className="space-y-1 mt-3 pt-3 border-t border-ink-700/60">
          {meta.map((m) => (
            <li
              key={m}
              className="text-[11px] font-mono text-steel-500 truncate flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-ember-500/60 flex-none" />
              {m}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};
