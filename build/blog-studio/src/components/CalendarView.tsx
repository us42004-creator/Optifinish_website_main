import React, { useMemo } from 'react';
import { CategoryId, AudienceId } from '../types';
import { CATEGORIES, AUDIENCES } from '../constants';
import { buildMatrix, findGaps, all } from '../services/historyStore';

// Editorial calendar / gap analyzer. The 8×8 matrix lights up:
//   - empty cell  → red dot (never written)
//   - stale cell  → amber dot (>60 days since last pick)
//   - hot cell    → ember pulse (≥4 in last 30 days, overweight)
// Click a cell to filter the history to that pairing.

interface Props {
  onPickCell?: (category: CategoryId, audience: AudienceId) => void;
}

export const CalendarView: React.FC<Props> = ({ onPickCell }) => {
  const matrix = useMemo(
    () => buildMatrix(CATEGORIES.map((c) => c.id), AUDIENCES.map((a) => a.id)),
    []
  );
  const gaps = useMemo(
    () => findGaps(CATEGORIES.map((c) => c.id), AUDIENCES.map((a) => a.id)),
    []
  );
  const totalEntries = all().length;

  const gapByCell = useMemo(() => {
    const m = new Map<string, string>();
    for (const g of gaps) m.set(`${g.category}|${g.audience}`, g.reason);
    return m;
  }, [gaps]);

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard label="Total drafts" value={String(totalEntries)} />
        <SummaryCard
          label="Empty cells"
          value={String(gaps.filter((g) => g.reason === 'never').length)}
          tone="rose"
        />
        <SummaryCard
          label="Stale cells (>60d)"
          value={String(gaps.filter((g) => g.reason === 'stale').length)}
          tone="amber"
        />
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="text-left p-2 text-steel-500 font-mono uppercase tracking-industrial sticky left-0 bg-ink-950">
                Category ↓ / Audience →
              </th>
              {AUDIENCES.map((a) => (
                <th
                  key={a.id}
                  className="p-2 text-steel-500 font-mono uppercase tracking-wider text-left min-w-[88px]"
                  title={a.role}
                >
                  {a.label.split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((c, ci) => (
              <tr key={c.id}>
                <td className="p-2 text-paper-100 font-semibold sticky left-0 bg-ink-950">
                  {c.label}
                </td>
                {AUDIENCES.map((a, ai) => {
                  const cell = matrix[ci][ai];
                  const gap = gapByCell.get(`${c.id}|${a.id}`);
                  const dotColor =
                    gap === 'never'
                      ? 'bg-rose-500'
                      : gap === 'stale'
                      ? 'bg-amber-500'
                      : gap === 'overweight'
                      ? 'bg-ember-500 animate-pulse'
                      : cell.count > 0
                      ? 'bg-emerald-500'
                      : 'bg-ink-700';
                  return (
                    <td
                      key={a.id}
                      className="p-2 border border-ink-800 rounded-md cursor-pointer hover:border-ember-500/50 transition-colors"
                      onClick={() => onPickCell?.(c.id, a.id)}
                      title={
                        cell.count === 0
                          ? 'No drafts yet'
                          : `${cell.count} draft${cell.count > 1 ? 's' : ''} · last ${
                              cell.daysSinceLastPick ?? '?'
                            } days ago`
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        <span className={cell.count > 0 ? 'text-paper-100' : 'text-steel-600'}>
                          {cell.count}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gap recommendations */}
      <div>
        <h3 className="text-[10px] font-mono uppercase tracking-industrial text-steel-500 mb-3">
          Gap recommendations ({gaps.length})
        </h3>
        {gaps.length === 0 ? (
          <p className="text-xs text-steel-400 italic">
            Matrix balanced — no urgent gaps. Keep publishing.
          </p>
        ) : (
          <ul className="space-y-2 text-xs">
            {gaps.slice(0, 12).map((g, i) => {
              const cat = CATEGORIES.find((c) => c.id === g.category)!;
              const aud = AUDIENCES.find((a) => a.id === g.audience)!;
              return (
                <li
                  key={i}
                  className="p-3 border border-ink-700 rounded-lg bg-ink-900/40 flex items-baseline gap-3"
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-none ${
                      g.reason === 'never'
                        ? 'bg-rose-500'
                        : g.reason === 'stale'
                        ? 'bg-amber-500'
                        : 'bg-ember-500'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-paper-100 font-semibold">
                      {cat.label} × {aud.label}
                    </div>
                    <div className="text-steel-500 text-[11px] mt-0.5">{g.detail}</div>
                  </div>
                  <button
                    onClick={() => onPickCell?.(g.category, g.audience)}
                    className="text-[10px] font-mono uppercase tracking-wider text-ember-400 hover:text-ember-300"
                  >
                    fill →
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="text-[10px] text-steel-600 italic mt-4">
        v1 persistence is per-browser via localStorage. When the team feedback
        loop ships (E), this becomes a backend-backed shared calendar.
      </p>
    </div>
  );
};

const SummaryCard: React.FC<{ label: string; value: string; tone?: 'rose' | 'amber' | 'default' }> = ({
  label,
  value,
  tone = 'default'
}) => {
  const toneClass =
    tone === 'rose' ? 'text-rose-400' : tone === 'amber' ? 'text-amber-400' : 'text-paper-100';
  return (
    <div className="p-4 border border-ink-700 rounded-xl bg-ink-900/40">
      <div className="text-[10px] font-mono uppercase tracking-industrial text-steel-500 mb-2">
        {label}
      </div>
      <div className={`text-3xl font-bold ${toneClass}`}>{value}</div>
    </div>
  );
};
