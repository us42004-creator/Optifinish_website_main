import React from 'react';
import { Stage } from '../types';
import { STAGES } from '../constants';

interface Props {
  current: Stage;
  completed: Set<Stage>;
  onJump: (s: Stage) => void;
}

export const StageRail: React.FC<Props> = ({ current, completed, onJump }) => {
  return (
    <nav className="flex flex-col gap-1">
      {STAGES.map((s, idx) => {
        const isActive = s.id === current;
        const isDone = completed.has(s.id);
        const isReachable = isDone || isActive || (idx > 0 && completed.has(STAGES[idx - 1].id));
        return (
          <button
            key={s.id}
            disabled={!isReachable}
            onClick={() => isReachable && onJump(s.id)}
            className={`group flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all ${
              isActive
                ? 'bg-ember-500/10 border border-ember-500/30'
                : isDone
                ? 'border border-ink-700 hover:border-ink-600 bg-ink-900/50'
                : 'border border-transparent opacity-40'
            }`}
          >
            <span
              className={`font-mono text-[10px] tracking-industrial ${
                isActive ? 'text-ember-400' : isDone ? 'text-paper-300' : 'text-steel-500'
              }`}
            >
              {s.short}
            </span>
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isActive ? 'text-paper' : 'text-paper-300'
              }`}
            >
              {s.label}
            </span>
            {isActive && (
              <span className="ml-auto w-2 h-2 rounded-full bg-ember-500 pulse-ember" />
            )}
            {isDone && !isActive && (
              <svg
                className="ml-auto w-4 h-4 text-ember-400/70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        );
      })}
    </nav>
  );
};
