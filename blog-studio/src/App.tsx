import React, { useMemo, useState } from 'react';
import {
  Stage,
  CategoryId,
  AudienceId,
  TopicIdea,
  BlogDraft
} from './types';
import { CATEGORIES, AUDIENCES, BRAND, STAGES } from './constants';
import { StageRail } from './components/StageRail';
import { PickerCard } from './components/PickerCard';
import {
  generateTopicIdeas,
  generateBlogDraft,
  generateSeo,
  generateImage,
  rewriteWithPrompt
} from './services/aiService';
import { buildOptiFinishBlogHtml } from './services/templateBuilder';

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>('category');
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [audience, setAudience] = useState<AudienceId | null>(null);
  const [topics, setTopics] = useState<TopicIdea[]>([]);
  const [topic, setTopic] = useState<TopicIdea | null>(null);
  const [draft, setDraft] = useState<BlogDraft | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  const completed = useMemo(() => {
    const set = new Set<Stage>();
    if (category) set.add('category');
    if (audience) set.add('audience');
    if (topic) set.add('topic');
    if (draft) set.add('draft');
    if (draft?.seo) set.add('seo');
    if (draft?.imagePlacements?.some((p) => p.generatedUrl)) set.add('images');
    return set;
  }, [category, audience, topic, draft]);

  const handleGenerateTopics = async () => {
    if (!category || !audience) return;
    setBusy('Drafting topic options…');
    const ideas = await generateTopicIdeas(category, audience);
    setTopics(ideas);
    setStage('topic');
    setBusy(null);
  };

  const handlePickTopic = async (t: TopicIdea) => {
    if (!category || !audience) return;
    setTopic(t);
    setBusy('Composing draft…');
    const d = await generateBlogDraft(t, category, audience);
    setDraft(d);
    setStage('draft');
    setBusy(null);
  };

  const handleSeo = async () => {
    if (!draft) return;
    setBusy('Building SEO layer…');
    const seo = await generateSeo(draft);
    setDraft({ ...draft, seo });
    setStage('seo');
    setBusy(null);
  };

  const handleEditPrompt = async () => {
    if (!draft || !editPrompt.trim()) return;
    setBusy('Applying edit…');
    const updated = await rewriteWithPrompt(draft.bodyHtml, editPrompt);
    setDraft({ ...draft, bodyHtml: updated });
    setEditPrompt('');
    setBusy(null);
  };

  const handleGenerateImages = async () => {
    if (!draft) return;
    setBusy('Generating images…');
    const placements = await Promise.all(
      draft.imagePlacements.map(async (p) => ({
        ...p,
        generatedUrl: await generateImage(p.prompt)
      }))
    );
    setDraft({ ...draft, imagePlacements: placements });
    setStage('images');
    setBusy(null);
  };

  const handleExport = () => {
    if (!draft || !category || !audience) return;
    const html = buildOptiFinishBlogHtml({ draft, category, audience });
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draft.seo?.slug || 'optifinish-post'}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setStage('export');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-ink-800 bg-ink-900/80 backdrop-blur sticky top-0 z-40">
        <div className="px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-ember-500 flex items-center justify-center font-mono font-bold text-ink-950 text-sm">
              OF
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">{BRAND.name}</h1>
              <p className="text-[10px] uppercase tracking-industrial text-steel-500 font-mono">
                {BRAND.tagline}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {busy && (
              <span className="text-[11px] font-mono text-ember-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500 pulse-ember" />
                {busy}
              </span>
            )}
            <span className="text-[10px] font-mono text-steel-500 uppercase tracking-industrial">
              v0.1 — local
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-[260px_1fr_400px] min-h-0">
        {/* Left rail */}
        <aside className="border-r border-ink-800 p-6 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-industrial text-steel-500 font-mono mb-4">
            Pipeline
          </p>
          <StageRail current={stage} completed={completed} onJump={setStage} />
        </aside>

        {/* Center workspace */}
        <main className="overflow-y-auto p-10">
          {stage === 'category' && (
            <Section
              eyebrow="Step 01"
              title="Choose a category"
              hint="What kind of post is this? Sets tone, structure, and the system prompt."
            >
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((c) => (
                  <PickerCard
                    key={c.id}
                    active={category === c.id}
                    title={c.label}
                    subtitle={c.blurb}
                    meta={c.examples}
                    onClick={() => {
                      setCategory(c.id);
                      setStage('audience');
                    }}
                  />
                ))}
              </div>
            </Section>
          )}

          {stage === 'audience' && (
            <Section
              eyebrow="Step 02"
              title="Pick the target audience"
              hint="Tone, depth and what the post optimises for change with the reader."
            >
              <div className="grid grid-cols-2 gap-4">
                {AUDIENCES.map((a) => (
                  <PickerCard
                    key={a.id}
                    active={audience === a.id}
                    title={a.label}
                    subtitle={a.role}
                    meta={a.cares.split(', ')}
                    onClick={() => setAudience(a.id)}
                  />
                ))}
              </div>
              <PrimaryButton
                disabled={!audience || !category || !!busy}
                onClick={handleGenerateTopics}
              >
                Generate topic ideas →
              </PrimaryButton>
            </Section>
          )}

          {stage === 'topic' && (
            <Section
              eyebrow="Step 03"
              title="Pick a topic"
              hint="Five angles tuned to your category × audience. Pick one to draft."
            >
              <div className="space-y-3">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handlePickTopic(t)}
                    className={`w-full text-left p-5 rounded-xl border transition-all ${
                      topic?.id === t.id
                        ? 'border-ember-500 bg-ember-500/5'
                        : 'border-ink-700 hover:border-ink-600 bg-ink-900/50'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-bold">{t.title}</h3>
                      <span className="font-mono text-[10px] text-steel-500 uppercase tracking-wider">
                        {t.estimatedReadTime}
                      </span>
                    </div>
                    <p className="text-xs text-steel-400 mb-2 italic">“{t.hook}”</p>
                    <p className="text-[11px] text-steel-500">{t.angle}</p>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {stage === 'draft' && draft && (
            <Section
              eyebrow="Step 04"
              title="Draft"
              hint={`${draft.wordCount} words. Review before adding the SEO layer.`}
            >
              <DraftBlock draft={draft} />
              <PrimaryButton disabled={!!busy} onClick={handleSeo}>
                Add SEO layer →
              </PrimaryButton>
            </Section>
          )}

          {stage === 'seo' && draft?.seo && (
            <Section
              eyebrow="Step 05"
              title="SEO layer"
              hint="Meta, slug, focus keyword, schema.org JSON-LD."
            >
              <SeoView draft={draft} />
              <PrimaryButton disabled={!!busy} onClick={() => setStage('edit')}>
                Continue to edit →
              </PrimaryButton>
            </Section>
          )}

          {stage === 'edit' && draft && (
            <Section
              eyebrow="Step 06"
              title="Edit"
              hint="Direct edits or describe a change and let the engine apply it."
            >
              <textarea
                value={draft.bodyHtml}
                onChange={(e) => setDraft({ ...draft, bodyHtml: e.target.value })}
                className="w-full h-[420px] bg-ink-900 border border-ink-700 rounded-xl p-4 font-mono text-xs leading-relaxed text-paper-100 focus:border-ember-500 outline-none resize-y"
              />
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-industrial font-mono text-steel-500">
                  Or tell the engine what to change
                </label>
                <div className="flex gap-3">
                  <input
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder='e.g. "Make section 2 more technical and add a comparison table"'
                    className="flex-1 bg-ink-900 border border-ink-700 rounded-lg px-4 py-3 text-sm focus:border-ember-500 outline-none"
                  />
                  <button
                    onClick={handleEditPrompt}
                    disabled={!editPrompt.trim() || !!busy}
                    className="px-5 rounded-lg bg-ink-800 border border-ink-700 hover:border-ember-500 text-xs font-bold uppercase tracking-wider disabled:opacity-40"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <PrimaryButton disabled={!!busy} onClick={handleGenerateImages}>
                Generate images →
              </PrimaryButton>
            </Section>
          )}

          {stage === 'images' && draft && (
            <Section
              eyebrow="Step 07"
              title="Images"
              hint="Auto-placed at hero, inline, and closing. Edit prompts and regenerate per slot."
            >
              <div className="space-y-4">
                {draft.imagePlacements.map((p, idx) => (
                  <div
                    key={p.id}
                    className="border border-ink-700 rounded-xl overflow-hidden bg-ink-900/50"
                  >
                    <div className="grid grid-cols-[200px_1fr] gap-0">
                      <div className="bg-ink-800 aspect-[4/3] flex items-center justify-center">
                        {p.generatedUrl ? (
                          <img
                            src={p.generatedUrl}
                            alt={p.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] uppercase font-mono text-steel-500">
                            Pending
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex flex-col gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-industrial text-ember-400">
                          {p.position} {p.anchorHeading ? `· after “${p.anchorHeading}”` : ''}
                        </span>
                        <p className="text-xs text-paper-100 italic leading-relaxed">{p.prompt}</p>
                        <p className="text-[10px] text-steel-500">alt: {p.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PrimaryButton disabled={!!busy} onClick={handleExport}>
                Export final HTML →
              </PrimaryButton>
            </Section>
          )}

          {stage === 'export' && (
            <Section
              eyebrow="Step 08"
              title="Exported"
              hint="HTML file downloaded. Open it in a browser or drop it into the OptiFinish blog pipeline."
            >
              <div className="p-10 border border-ember-500/30 bg-ember-500/5 rounded-xl text-center">
                <p className="text-paper-100 mb-2">Done.</p>
                <p className="text-xs text-steel-400">
                  Open the downloaded file, or click any earlier stage in the rail to iterate.
                </p>
              </div>
            </Section>
          )}
        </main>

        {/* Right preview */}
        <aside className="border-l border-ink-800 bg-ink-900/40 overflow-y-auto p-8">
          <p className="text-[10px] uppercase tracking-industrial text-steel-500 font-mono mb-4">
            Live State
          </p>
          <div className="space-y-3 text-xs">
            <StateRow label="Category" value={category ? CATEGORIES.find((c) => c.id === category)!.label : '—'} />
            <StateRow label="Audience" value={audience ? AUDIENCES.find((a) => a.id === audience)!.label : '—'} />
            <StateRow label="Topic" value={topic?.title || '—'} multiline />
            <StateRow label="Words" value={draft ? String(draft.wordCount) : '—'} />
            <StateRow label="SEO" value={draft?.seo ? '✓ ready' : '—'} />
            <StateRow
              label="Images"
              value={
                draft
                  ? `${draft.imagePlacements.filter((p) => p.generatedUrl).length} / ${draft.imagePlacements.length}`
                  : '—'
              }
            />
          </div>
          {draft && (
            <div className="mt-8 pt-6 border-t border-ink-800">
              <p className="text-[10px] uppercase tracking-industrial text-steel-500 font-mono mb-3">
                Preview
              </p>
              <div
                className="prose prose-invert prose-sm max-w-none text-xs text-paper-100"
                style={{ lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: draft.bodyHtml.slice(0, 1200) + '…' }}
              />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

// --- inline helpers ---

const Section: React.FC<{
  eyebrow: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, hint, children }) => (
  <div className="max-w-3xl space-y-8">
    <header>
      <p className="text-[10px] font-mono uppercase tracking-industrial text-ember-400 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
      <p className="text-sm text-steel-400">{hint}</p>
    </header>
    {children}
  </div>
);

const PrimaryButton: React.FC<{
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ disabled, onClick, children }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
      disabled
        ? 'bg-ink-800 text-steel-600 cursor-not-allowed'
        : 'bg-ember-500 text-ink-950 hover:bg-ember-400 active:scale-[0.98]'
    }`}
  >
    {children}
  </button>
);

const StateRow: React.FC<{ label: string; value: string; multiline?: boolean }> = ({
  label,
  value,
  multiline
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-mono uppercase tracking-industrial text-steel-600">
      {label}
    </span>
    <span
      className={`text-paper-100 ${multiline ? 'leading-snug' : 'truncate'}`}
      title={value}
    >
      {value}
    </span>
  </div>
);

const DraftBlock: React.FC<{ draft: BlogDraft }> = ({ draft }) => (
  <div className="border border-ink-700 rounded-xl p-8 bg-ink-900/30">
    <h1 className="text-2xl font-bold mb-2 leading-tight">{draft.title}</h1>
    <p className="text-sm text-steel-400 italic mb-6">{draft.subtitle}</p>
    <div
      className="prose prose-invert prose-sm max-w-none text-paper-100"
      style={{ lineHeight: 1.7 }}
      dangerouslySetInnerHTML={{ __html: draft.bodyHtml }}
    />
  </div>
);

const SeoView: React.FC<{ draft: BlogDraft }> = ({ draft }) => {
  if (!draft.seo) return null;
  return (
    <div className="space-y-4">
      <SeoRow label="Meta Title" value={draft.seo.metaTitle} />
      <SeoRow label="Meta Description" value={draft.seo.metaDescription} />
      <SeoRow label="Slug" value={`/blog/${draft.seo.slug}`} mono />
      <SeoRow label="Focus Keyword" value={draft.seo.focusKeyword} />
      <SeoRow label="Secondary" value={draft.seo.secondaryKeywords.join(' · ')} />
      <div>
        <p className="text-[10px] font-mono uppercase tracking-industrial text-steel-500 mb-2">
          Schema.org JSON-LD
        </p>
        <pre className="text-[11px] font-mono p-4 bg-ink-900 border border-ink-700 rounded-lg overflow-x-auto text-paper-200">
          {draft.seo.schemaJsonLd}
        </pre>
      </div>
    </div>
  );
};

const SeoRow: React.FC<{ label: string; value: string; mono?: boolean }> = ({
  label,
  value,
  mono
}) => (
  <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
    <span className="text-[10px] font-mono uppercase tracking-industrial text-steel-500 pt-1">
      {label}
    </span>
    <span className={`text-sm ${mono ? 'font-mono text-ember-400' : 'text-paper-100'}`}>
      {value}
    </span>
  </div>
);

export default App;
