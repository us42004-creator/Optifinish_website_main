import React, { useEffect, useMemo, useState } from 'react';
import {
  Stage,
  CategoryId,
  AudienceId,
  TopicIdea,
  BlogDraft,
  EditorialFlags,
  WeeklyBrief,
  WeeklyBriefCard
} from './types';
import { CATEGORIES, AUDIENCES, BRAND, STAGES } from './constants';
import { StageRail } from './components/StageRail';
import { PickerCard } from './components/PickerCard';
import {
  generateTopicIdeas,
  generateBlogDraft,
  generateSeo,
  generateImagesForPlacements,
  rewriteWithPrompt,
  generateDistributionPack,
  renderDistributionMarkdown,
  generateAbVariants,
  scoreVoice
} from './services/aiService';
import type { DistributionPack, AbVariants, VoiceScore } from './services/aiService';
import { buildOptiFinishBlogHtml } from './services/templateBuilder';
import { CalendarView } from './components/CalendarView';
import * as historyStore from './services/historyStore';
import {
  generateWeeklyBrief,
  loadBriefFromCache,
  clearBriefCache
} from './services/weeklyBriefEngine';

type Tab = 'pipeline' | 'calendar';

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('pipeline');
  const [stage, setStage] = useState<Stage>('category');
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [audience, setAudience] = useState<AudienceId | null>(null);
  const [topics, setTopics] = useState<TopicIdea[]>([]);
  const [distribution, setDistribution] = useState<DistributionPack | null>(null);
  const [abVariants, setAbVariants] = useState<AbVariants | null>(null);
  const [voiceScore, setVoiceScore] = useState<VoiceScore | null>(null);
  const [topic, setTopic] = useState<TopicIdea | null>(null);
  const [draft, setDraft] = useState<BlogDraft | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  // Weekly editorial brief — hydrated from cache on mount so studio is
  // never empty. Refreshed on demand via the panel's refresh button.
  const [brief, setBrief] = useState<WeeklyBrief | null>(null);
  const [briefBusy, setBriefBusy] = useState(false);
  const [briefError, setBriefError] = useState<string | null>(null);
  const [manualPickerOpen, setManualPickerOpen] = useState(false);

  // Mobile-only slide-out drawer state. On desktop (md+) both rails are
  // always visible and this is ignored.
  const [mobileDrawer, setMobileDrawer] = useState<'stages' | 'info' | null>(null);

  useEffect(() => {
    const cached = loadBriefFromCache();
    if (cached) setBrief(cached);
  }, []);

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

  const handleRefreshBrief = async () => {
    setBriefBusy(true);
    setBriefError(null);
    try {
      clearBriefCache();
      const fresh = await generateWeeklyBrief();
      setBrief(fresh);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[brief] generation failed:', err);
      setBriefError(msg);
    } finally {
      setBriefBusy(false);
    }
  };

  // Start writing from a curated card. Skips category/audience/topic pickers.
  // We pass overrides explicitly to generateBlogDraft because React state
  // updates are async — the setCategory/setAudience above won't be visible
  // to the very next generateBlogDraft call otherwise.
  const handleStartFromCard = async (card: WeeklyBriefCard) => {
    const topicIdea: TopicIdea = {
      id: card.id,
      title: card.title,
      angle: card.optifinishAngle,
      hook: card.whyNow,
      estimatedReadTime: '6-8 min'
    };
    setCategory(card.suggestedCategory);
    setAudience(card.suggestedAudience);
    setTopic(topicIdea);
    setBusy(`Drafting "${card.title.slice(0, 50)}…" from the weekly brief…`);
    try {
      // Persist for anti-repetition ledger
      try {
        const prev: string[] = JSON.parse(localStorage.getItem('optifinish-recent-topics') || '[]');
        const updated = [topicIdea.title, ...prev.filter((x) => x !== topicIdea.title)].slice(0, 30);
        localStorage.setItem('optifinish-recent-topics', JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      const d = await generateBlogDraft(topicIdea, card.suggestedCategory, card.suggestedAudience);
      setDraft(d);
      setVoiceScore(scoreVoice(d.bodyHtml));
      historyStore.record({
        title: d.title,
        category: card.suggestedCategory,
        audience: card.suggestedAudience,
        archetype: d.snapshot?.structuralShape ?? 'immersive_essay',
        modelUsed: 'multipass',
        voiceUsed: 'rotated',
        wordCount: d.wordCount
      });
      setStage('draft');
    } catch (err) {
      console.error('[brief-card] draft failed:', err);
      setBriefError('Draft generation failed — check console.');
    } finally {
      setBusy(null);
    }
  };

  const handleGenerateTopics = async () => {
    if (!category || !audience) return;
    setBusy('Drafting topic options…');
    // Pull recent titles from localStorage so the engine excludes them — the
    // primary anti-repetition signal across regeneration clicks within a
    // session. We keep the most recent 30 across all category/audience pairs.
    let recent: string[] = [];
    try {
      recent = JSON.parse(localStorage.getItem('optifinish-recent-topics') || '[]');
    } catch {
      /* ignore parse errors */
    }
    const ideas = await generateTopicIdeas(category, audience, recent.slice(0, 30));
    setTopics(ideas);
    setStage('topic');
    setBusy(null);
  };

  const handlePickTopic = async (t: TopicIdea) => {
    if (!category || !audience) return;
    setTopic(t);
    setBusy('Composing draft…');
    // Persist this title into the recent-topics ledger so future calls exclude it.
    try {
      const prev: string[] = JSON.parse(localStorage.getItem('optifinish-recent-topics') || '[]');
      const updated = [t.title, ...prev.filter((x) => x !== t.title)].slice(0, 30);
      localStorage.setItem('optifinish-recent-topics', JSON.stringify(updated));
    } catch {
      /* localStorage unavailable — non-fatal */
    }
    const d = await generateBlogDraft(t, category, audience);
    setDraft(d);
    // Score voice locally (instant feedback) + record to history store
    setVoiceScore(scoreVoice(d.bodyHtml));
    historyStore.record({
      title: d.title,
      category,
      audience,
      archetype: d.snapshot?.structuralShape ?? 'immersive_essay',
      modelUsed: 'multipass',
      voiceUsed: 'rotated',
      wordCount: d.wordCount
    });
    setStage('draft');
    setBusy(null);
  };

  const handleGenerateDistribution = async () => {
    if (!draft || !category || !audience) return;
    setBusy('Generating distribution pack (LinkedIn / WhatsApp / email / sales / Slack)…');
    try {
      const pack = await generateDistributionPack(draft, category, audience);
      setDistribution(pack);
    } catch (err) {
      console.error('[distribution] failed:', err);
      setError('Distribution generation failed — check console.');
    } finally {
      setBusy(null);
    }
  };

  const handleGenerateAbVariants = async () => {
    if (!draft) return;
    setBusy('Generating A/B variants…');
    try {
      const v = await generateAbVariants(draft);
      setAbVariants(v);
    } catch (err) {
      console.error('[ab variants] failed:', err);
      setError('A/B variant generation failed — check console.');
    } finally {
      setBusy(null);
    }
  };

  const handleDownloadDistributionMd = () => {
    if (!distribution || !draft) return;
    const md = renderDistributionMarkdown(distribution, draft);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draft.seo?.slug || 'optifinish-post'}-distribution.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePickCalendarCell = (cat: CategoryId, aud: AudienceId) => {
    setCategory(cat);
    setAudience(aud);
    setTab('pipeline');
    setStage('topic');
    // Trigger topic gen for the picked cell
    setTimeout(() => handleGenerateTopics(), 50);
  };

  const handleSeo = async () => {
    if (!draft) return;
    setBusy('Building SEO layer (keywords, meta, schema, geo)…');
    const seo = await generateSeo(draft, category ?? undefined, audience ?? undefined);
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
    setBusy('Generating images (sequential — kills intra-post duplication)…');
    // Sequential generation with library-ID exclusion — image N cannot
    // resolve to the same library photo as image N-1. Kills the "both
    // images in the post are the same thermocouple shot" failure mode.
    const generated = await generateImagesForPlacements(draft.imagePlacements);
    const placements = generated.map((g) => ({
      ...g,
      generatedUrl: g.url
    }));
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
        <div className="px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-3">
          {/* Left cluster: mobile hamburger + brand */}
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            {tab === 'pipeline' && (
              <button
                className="md:hidden p-2 -ml-2 text-paper-100 hover:text-ember-400 transition-colors"
                onClick={() => setMobileDrawer(mobileDrawer === 'stages' ? null : 'stages')}
                aria-label="Toggle pipeline stages"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-ember-500 flex items-center justify-center font-mono font-bold text-ink-950 text-sm flex-shrink-0">
              OF
            </div>
            <div className="min-w-0">
              <h1 className="text-sm md:text-base font-bold tracking-tight truncate">{BRAND.name}</h1>
              <p className="hidden md:block text-[10px] uppercase tracking-industrial text-steel-500 font-mono">
                {BRAND.tagline}
              </p>
            </div>
          </div>

          {/* Right cluster: tabs + busy + version + mobile info button */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="flex items-center gap-1 p-1 bg-ink-900 border border-ink-700 rounded-lg">
              <TabButton label="Pipeline" active={tab === 'pipeline'} onClick={() => setTab('pipeline')} />
              <TabButton label="Calendar" active={tab === 'calendar'} onClick={() => setTab('calendar')} />
            </div>
            {busy && (
              <span className="hidden lg:flex text-[11px] font-mono text-ember-400 uppercase tracking-wider items-center gap-2 max-w-xs truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500 pulse-ember flex-shrink-0" />
                <span className="truncate">{busy}</span>
              </span>
            )}
            <span className="hidden md:inline text-[10px] font-mono text-steel-500 uppercase tracking-industrial">
              v0.1
            </span>
            {tab === 'pipeline' && (
              <button
                className="md:hidden p-2 -mr-2 text-paper-100 hover:text-ember-400 transition-colors"
                onClick={() => setMobileDrawer(mobileDrawer === 'info' ? null : 'info')}
                aria-label="Toggle live state panel"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
            )}
          </div>
        </div>
        {/* Mobile busy indicator — full-width under header when active */}
        {busy && (
          <div className="lg:hidden px-4 py-2 border-t border-ink-800 bg-ink-950/60">
            <p className="text-[10px] font-mono text-ember-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ember-500 pulse-ember flex-shrink-0" />
              <span className="truncate">{busy}</span>
            </p>
          </div>
        )}
      </header>

      {tab === 'calendar' ? (
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-5xl mx-auto">
            <header className="mb-6 md:mb-8">
              <p className="text-[10px] font-mono uppercase tracking-industrial text-ember-400 mb-2">
                Editorial calendar
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Coverage matrix</h2>
              <p className="text-sm text-steel-400">
                Click any cell — empty (red), stale (amber), or hot (orange) — to jump straight
                to topic generation for that pairing.
              </p>
            </header>
            <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
              <CalendarView onPickCell={handlePickCalendarCell} />
            </div>
          </div>
        </main>
      ) : (
      <div className="flex-1 md:grid md:grid-cols-[260px_1fr_400px] min-h-0 relative">
        {/* Mobile backdrop when a drawer is open */}
        {mobileDrawer && (
          <div
            className="md:hidden fixed inset-0 bg-black/70 z-30"
            onClick={() => setMobileDrawer(null)}
          />
        )}

        {/* Left rail — desktop static, mobile slide-in from left */}
        <aside
          className={`
            border-r border-ink-800 overflow-y-auto bg-ink-950
            md:static md:translate-x-0 md:block md:p-6
            fixed top-16 bottom-0 left-0 w-72 z-40 p-6
            transform transition-transform duration-200 ease-out
            ${mobileDrawer === 'stages' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="flex items-center justify-between md:block mb-4">
            <p className="text-[10px] uppercase tracking-industrial text-steel-500 font-mono">
              Pipeline
            </p>
            <button
              className="md:hidden text-steel-400 hover:text-paper-100 text-xs font-mono"
              onClick={() => setMobileDrawer(null)}
            >
              ✕ Close
            </button>
          </div>
          <StageRail
            current={stage}
            completed={completed}
            onJump={(s) => {
              setStage(s);
              setMobileDrawer(null);
            }}
          />
        </aside>

        {/* Center workspace */}
        <main className="overflow-y-auto p-4 md:p-10">
          {stage === 'category' && (
            <>
              <WeeklyBriefPanel
                brief={brief}
                busy={briefBusy}
                error={briefError}
                onRefresh={handleRefreshBrief}
                onSelectCard={handleStartFromCard}
                cardActionDisabled={!!busy}
              />

              <div className="mb-4 mt-10 flex items-center gap-3 border-t border-ink-800 pt-8">
                <button
                  className="text-[11px] font-mono uppercase tracking-industrial text-steel-400 hover:text-steel-200 transition-colors"
                  onClick={() => setManualPickerOpen((v) => !v)}
                >
                  {manualPickerOpen ? '▼' : '▶'} Manual mode — pick category + audience yourself
                </button>
              </div>

              {manualPickerOpen && (
                <Section
                  eyebrow="Manual · Step 01"
                  title="Choose a category"
                  hint="What kind of post is this? Sets tone, structure, and the system prompt."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </>
          )}

          {stage === 'audience' && (
            <Section
              eyebrow="Step 02"
              title="Pick the target audience"
              hint="Tone, depth and what the post optimises for change with the reader."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              {draft.editorialFlags?.hasAny && (
                <EditorialFlagsBanner flags={draft.editorialFlags} />
              )}
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
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-0">
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
              title="Exported · multiply the reach"
              hint="HTML downloaded. Now generate channel-native distribution + A/B variants while the post is hot."
            >
              <div className="p-6 border border-ember-500/30 bg-ember-500/5 rounded-xl">
                <p className="text-paper-100 mb-2 font-bold">HTML downloaded ✓</p>
                <p className="text-xs text-steel-400">
                  Drop it into the OptiFinish blog pipeline, or click any earlier stage to iterate.
                </p>
              </div>

              {/* Internal link suggestions — surfaced here so the editor
                  sees them at publish-time, not just back in Step 5 */}
              {draft?.seo?.internalLinkSuggestions && draft.seo.internalLinkSuggestions.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold tracking-tight">Internal pages to link to</h3>
                    <span className="text-[10px] font-mono text-steel-500 uppercase tracking-industrial">
                      Before publishing
                    </span>
                  </div>
                  <p className="text-xs text-steel-400 -mt-2">
                    Wire these anchors into the body when you paste the HTML into the
                    OptiFinish blog. Strengthens topical clusters and keeps readers in
                    the funnel.
                  </p>
                  <div className="space-y-2">
                    {draft.seo.internalLinkSuggestions.map((s, i) => (
                      <div
                        key={i}
                        className="text-xs p-3 border border-ink-700 rounded-lg bg-ink-900/40"
                      >
                        <div className="font-bold text-ember-400 mb-1">{s.anchor}</div>
                        <div className="text-steel-400 font-mono text-[11px]">
                          → /blog/category/{s.targetCategory}
                        </div>
                        <div className="text-steel-500 mt-1 italic text-[11px]">
                          {s.rationale}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Distribution pack */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-bold tracking-tight">Distribution pack</h3>
                  <span className="text-[10px] font-mono text-steel-500 uppercase tracking-industrial">
                    LinkedIn · WhatsApp · Email · Sales · Slack
                  </span>
                </div>
                {!distribution ? (
                  <PrimaryButton disabled={!!busy} onClick={handleGenerateDistribution}>
                    Generate distribution pack →
                  </PrimaryButton>
                ) : (
                  <div className="space-y-4">
                    <DistributionPanel pack={distribution} />
                    <button
                      onClick={handleDownloadDistributionMd}
                      className="px-5 py-2 rounded-lg bg-ink-800 border border-ink-700 hover:border-ember-500 text-xs font-bold uppercase tracking-wider"
                    >
                      Download as Markdown
                    </button>
                  </div>
                )}
              </div>

              {/* A/B variants */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-tight">A/B variants</h3>
                {!abVariants ? (
                  <button
                    onClick={handleGenerateAbVariants}
                    disabled={!!busy || !draft?.seo}
                    className="px-5 py-2 rounded-lg bg-ink-800 border border-ink-700 hover:border-ember-500 text-xs font-bold uppercase tracking-wider disabled:opacity-40"
                  >
                    Generate A/B variants
                  </button>
                ) : (
                  <AbVariantsPanel variants={abVariants} />
                )}
              </div>

              {/* Voice score */}
              {voiceScore && <VoiceScorePanel score={voiceScore} />}
            </Section>
          )}
        </main>

        {/* Right preview — desktop static, mobile slide-in from right */}
        <aside
          className={`
            border-l border-ink-800 bg-ink-900/95 md:bg-ink-900/40 overflow-y-auto
            md:static md:translate-x-0 md:block md:p-8
            fixed top-16 bottom-0 right-0 w-80 z-40 p-6
            transform transition-transform duration-200 ease-out
            ${mobileDrawer === 'info' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          `}
        >
          <div className="flex items-center justify-between md:block mb-4">
            <p className="text-[10px] uppercase tracking-industrial text-steel-500 font-mono">
              Live State
            </p>
            <button
              className="md:hidden text-steel-400 hover:text-paper-100 text-xs font-mono"
              onClick={() => setMobileDrawer(null)}
            >
              ✕ Close
            </button>
          </div>
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
      )}
    </div>
  );
};

const DistributionPanel: React.FC<{ pack: DistributionPack }> = ({ pack }) => (
  <div className="space-y-3">
    <ChannelCard title="LinkedIn">
      <p className="text-xs text-paper-100 whitespace-pre-wrap leading-relaxed">{pack.linkedin.body}</p>
      {pack.linkedin.hashtags.length > 0 && (
        <p className="text-[11px] font-mono text-ember-400 mt-2">
          {pack.linkedin.hashtags.map((h) => `#${h.replace(/^#/, '')}`).join('  ')}
        </p>
      )}
    </ChannelCard>
    <ChannelCard title={`WhatsApp Carousel (${pack.whatsappCarousel.length} cards)`}>
      <div className="space-y-2">
        {pack.whatsappCarousel.map((c, i) => (
          <div key={i} className="border-l-2 border-ember-500/50 pl-3">
            <div className="text-[11px] font-mono text-steel-500 uppercase tracking-wider">Card {i + 1}</div>
            <div className="text-paper-100 font-bold text-xs mt-1">{c.headline}</div>
            <div className="text-steel-400 text-[11px] mt-0.5">{c.body}</div>
          </div>
        ))}
      </div>
    </ChannelCard>
    <ChannelCard title="Email Newsletter">
      <div className="text-[10px] font-mono uppercase tracking-wider text-ember-400 mb-1">Subject</div>
      <p className="text-paper-100 text-xs font-bold mb-3">{pack.newsletter.subject}</p>
      <div className="text-[10px] font-mono uppercase tracking-wider text-ember-400 mb-1">Preview</div>
      <p className="text-steel-400 text-[11px] mb-3">{pack.newsletter.previewText}</p>
      <div className="text-[10px] font-mono uppercase tracking-wider text-ember-400 mb-1">Body</div>
      <p className="text-paper-100 text-xs whitespace-pre-wrap leading-relaxed">{pack.newsletter.body}</p>
    </ChannelCard>
    <ChannelCard title="Sales One-Pager">
      <div className="text-[10px] font-mono uppercase tracking-wider text-ember-400 mb-1">Exec TL;DR</div>
      <p className="text-paper-100 text-xs mb-3">{pack.salesOnePager.execTldr}</p>
      <div className="text-[10px] font-mono uppercase tracking-wider text-ember-400 mb-1">Talking points</div>
      <ul className="text-paper-100 text-xs space-y-1 mb-3">
        {pack.salesOnePager.talkingPoints.map((p, i) => (
          <li key={i} className="flex gap-2"><span className="text-ember-400">→</span><span>{p}</span></li>
        ))}
      </ul>
      <div className="text-[10px] font-mono uppercase tracking-wider text-ember-400 mb-1">Objection handlers</div>
      <ul className="text-xs space-y-2">
        {pack.salesOnePager.objectionHandlers.map((o, i) => (
          <li key={i} className="border-l-2 border-ink-700 pl-3">
            <div className="text-rose-300 italic">{o.objection}</div>
            <div className="text-paper-100 mt-0.5">{o.response}</div>
          </li>
        ))}
      </ul>
    </ChannelCard>
    <ChannelCard title="Slack Summary">
      <p className="text-paper-100 text-xs leading-relaxed">{pack.slackSummary}</p>
    </ChannelCard>
  </div>
);

const ChannelCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border border-ink-700 rounded-xl p-4 bg-ink-900/40">
    <div className="text-[10px] font-mono uppercase tracking-industrial text-steel-500 mb-3">
      {title}
    </div>
    {children}
  </div>
);

const AbVariantsPanel: React.FC<{ variants: AbVariants }> = ({ variants }) => (
  <div className="space-y-3">
    <p className="text-[11px] text-steel-400 italic">Hypothesis: {variants.rationale}</p>
    <VariantRow label="Meta Description" a={variants.metaDescription.a} b={variants.metaDescription.b} />
    <VariantRow label="OG Title" a={variants.ogTitle.a} b={variants.ogTitle.b} />
    <VariantRow label="CTA Headline" a={variants.ctaHeadline.a} b={variants.ctaHeadline.b} />
    <p className="text-[10px] text-steel-600 italic">
      Both variants exported. Traffic split activates when analytics layer ships.
    </p>
  </div>
);

const VariantRow: React.FC<{ label: string; a: string; b: string }> = ({ label, a, b }) => (
  <div className="space-y-2">
    <div className="text-[10px] font-mono uppercase tracking-industrial text-steel-500">{label}</div>
    <div className="border-l-2 border-emerald-500/40 pl-3 text-xs"><span className="text-emerald-400 font-bold mr-2">A</span>{a}</div>
    <div className="border-l-2 border-ember-500/40 pl-3 text-xs"><span className="text-ember-400 font-bold mr-2">B</span>{b}</div>
  </div>
);

const VoiceScorePanel: React.FC<{ score: VoiceScore }> = ({ score }) => {
  const color =
    score.overall >= 85 ? 'text-emerald-400' : score.overall >= 70 ? 'text-ember-400' : 'text-rose-400';
  return (
    <div className="border border-ink-700 rounded-xl p-4 bg-ink-900/40">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-industrial text-steel-500">
          Voice Fingerprint Score
        </span>
        <span className={`text-2xl font-bold ${color}`}>{score.overall}</span>
      </div>
      {score.warnings.length > 0 && (
        <ul className="text-[11px] text-rose-300 space-y-1">
          {score.warnings.map((w, i) => <li key={i}>· {w}</li>)}
        </ul>
      )}
      {score.warnings.length === 0 && (
        <p className="text-[11px] text-emerald-400">Within OptiFinish editorial guidelines ✓</p>
      )}
    </div>
  );
};

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({
  label,
  active,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-md transition-colors ${
      active ? 'bg-ember-500 text-ink-950' : 'text-steel-400 hover:text-paper-100'
    }`}
  >
    {label}
  </button>
);

// --- inline helpers ---

const Section: React.FC<{
  eyebrow: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, hint, children }) => (
  <div className="max-w-3xl space-y-6 md:space-y-8">
    <header>
      <p className="text-[10px] font-mono uppercase tracking-industrial text-ember-400 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-tight">{title}</h2>
      <p className="text-xs md:text-sm text-steel-400 leading-relaxed">{hint}</p>
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
    className={`w-full sm:w-auto px-5 md:px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
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

// Red banner at the top of Step 4 when the post-generation detector spotted
// fabricated numbers, first-person leaks, or fabricated years in the draft.
// Editor must review + fix before publishing — the HTML comment inside the
// exported body is easy to miss, this is unmissable.
const EditorialFlagsBanner: React.FC<{ flags: EditorialFlags }> = ({ flags }) => (
  <div className="border border-rose-500/60 bg-rose-950/30 rounded-xl p-5 mb-6">
    <div className="flex items-baseline justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-industrial text-rose-300 font-bold">
          Editorial Review Required
        </span>
      </div>
      <span className="text-[10px] font-mono text-rose-400">
        {flags.fabricatedNumbers.length + flags.firstPersonLeaks.length + flags.fabricatedYears.length} flag(s)
      </span>
    </div>
    <p className="text-xs text-rose-100 mb-4 leading-relaxed">
      The post-generation detector spotted patterns that damage credibility. Fix these before adding SEO or exporting — each one is either a fabricated claim, an editorial voice slip, or an unverified date.
    </p>
    <div className="space-y-3 text-[11px]">
      {flags.fabricatedNumbers.length > 0 && (
        <FlagGroup
          label="Fabricated numbers"
          color="rose"
          items={flags.fabricatedNumbers}
          note="Every % / INR / °C / RH figure below is a candidate — verify against a published source or rewrite qualitatively."
        />
      )}
      {flags.firstPersonLeaks.length > 0 && (
        <FlagGroup
          label="First-person leaks"
          color="amber"
          items={flags.firstPersonLeaks}
          note="Body copy is third-person observational. Rewrite each instance — CTA card is the ONLY surface allowed to address the reader."
        />
      )}
      {flags.fabricatedYears.length > 0 && (
        <FlagGroup
          label="Fabricated years"
          color="amber"
          items={flags.fabricatedYears}
          note="Historical years (e.g. 'since 2010') are invented context. Either cite a real source or drop the year."
        />
      )}
    </div>
  </div>
);

const FlagGroup: React.FC<{ label: string; color: 'rose' | 'amber'; items: string[]; note: string }> = ({
  label,
  color,
  items,
  note
}) => {
  const c = color === 'rose' ? 'text-rose-300' : 'text-amber-300';
  return (
    <div>
      <div className={`font-mono uppercase text-[10px] tracking-wider mb-1 ${c}`}>{label}</div>
      <ul className="space-y-1 mb-1">
        {items.slice(0, 6).map((s, i) => (
          <li key={i} className="text-paper-100 font-mono text-[11px] pl-3 border-l-2 border-rose-500/40">
            {s.length > 100 ? s.slice(0, 97) + '…' : s}
          </li>
        ))}
      </ul>
      <p className={`text-[10px] italic ${c}/80`}>{note}</p>
    </div>
  );
};

const DraftBlock: React.FC<{ draft: BlogDraft }> = ({ draft }) => (
  <div className="border border-ink-700 rounded-xl p-4 md:p-8 bg-ink-900/30 overflow-hidden">
    <h1 className="text-xl md:text-2xl font-bold mb-2 leading-tight">{draft.title}</h1>
    <p className="text-sm text-steel-400 italic mb-6">{draft.subtitle}</p>
    <div
      className="prose prose-invert prose-sm max-w-none text-paper-100 overflow-x-auto"
      style={{ lineHeight: 1.7 }}
      dangerouslySetInnerHTML={{ __html: draft.bodyHtml }}
    />
  </div>
);

const SeoView: React.FC<{ draft: BlogDraft }> = ({ draft }) => {
  if (!draft.seo) return null;
  const seo = draft.seo;
  const scoreColor =
    seo.scores.overall >= 85
      ? 'text-emerald-400'
      : seo.scores.overall >= 70
      ? 'text-ember-400'
      : 'text-rose-400';
  return (
    <div className="space-y-8">
      {/* Health card */}
      <div className="border border-ink-700 bg-ink-900/40 rounded-xl p-6">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-[10px] font-mono uppercase tracking-industrial text-steel-500">
            SEO Health Score
          </span>
          <span className={`text-3xl font-bold ${scoreColor}`}>{seo.scores.overall}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-mono">
          <ScoreRow label="Title length" pct={seo.scores.titleLength} />
          <ScoreRow label="Desc length" pct={seo.scores.descLength} />
          <ScoreRow label="Keyword in title" bool={seo.scores.keywordInTitle} />
          <ScoreRow label="Keyword in 1st paragraph" bool={seo.scores.keywordInFirstParagraph} />
          <ScoreRow label="Keyword in URL" bool={seo.scores.keywordInUrl} />
          <ScoreRow label="Keyword density" value={`${seo.scores.keywordDensityPct}%`} />
        </div>
      </div>

      {/* Meta tags */}
      <SeoSection title="Search Engine">
        <SeoRow label="Meta Title" value={`${seo.metaTitle} (${seo.metaTitle.length} chars)`} />
        <SeoRow label="Meta Description" value={`${seo.metaDescription} (${seo.metaDescription.length} chars)`} />
        <SeoRow label="URL" value={`https://optifinish.com/blog/${seo.slug}`} mono />
        <SeoRow label="Schema Type" value={seo.schemaType} mono />
      </SeoSection>

      {/* Keywords */}
      <SeoSection title="Keywords">
        <SeoRow label="Focus" value={seo.focusKeyword} mono />
        <SeoRow label="Secondary" value={(seo.secondaryKeywords ?? []).join(' · ')} />
        <SeoRow label="Long-tail" value={(seo.longTailKeywords ?? []).join(' · ') || '—'} />
      </SeoSection>

      {/* Open Graph + Twitter */}
      <SeoSection title="Social Preview (LinkedIn / WhatsApp / Twitter)">
        <SeoRow label="OG Title" value={seo.ogTitle ?? seo.metaTitle} />
        <SeoRow label="OG Description" value={seo.ogDescription ?? seo.metaDescription} />
        <SeoRow label="OG Image" value={seo.ogImage ? '[hero image embedded]' : '— (no image rendered yet)'} mono />
        <SeoRow label="Locale" value={seo.ogLocale ?? 'en_IN'} mono />
      </SeoSection>

      {/* Geo */}
      <SeoSection title="Geo Targeting">
        <SeoRow label="Region" value={seo.geoRegion ?? 'IN-UP'} mono />
        <SeoRow label="Place" value={seo.geoPlacename ?? 'Greater Noida'} mono />
      </SeoSection>

      {/* Internal links */}
      {seo.internalLinkSuggestions && seo.internalLinkSuggestions.length > 0 && (
        <SeoSection title="Internal Link Suggestions">
          <div className="space-y-2">
            {seo.internalLinkSuggestions.map((s, i) => (
              <div key={i} className="text-xs p-3 border border-ink-700 rounded-lg bg-ink-900/40">
                <div className="font-bold text-ember-400 mb-1">{s.anchor}</div>
                <div className="text-steel-400">→ {s.targetCategory}</div>
                <div className="text-steel-500 mt-1 italic text-[11px]">{s.rationale}</div>
              </div>
            ))}
          </div>
        </SeoSection>
      )}

      {/* Schema */}
      <SeoSection title="Schema.org JSON-LD">
        <pre className="text-[10px] font-mono p-4 bg-ink-900 border border-ink-700 rounded-lg overflow-x-auto text-paper-200 max-h-80">
          {seo.schemaJsonLd}
        </pre>
      </SeoSection>
    </div>
  );
};

const SeoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <p className="text-[10px] font-mono uppercase tracking-industrial text-steel-500 mb-3">
      {title}
    </p>
    <div className="space-y-3">{children}</div>
  </div>
);

const ScoreRow: React.FC<{ label: string; pct?: number; bool?: boolean; value?: string }> = ({
  label,
  pct,
  bool,
  value
}) => {
  const display =
    typeof pct === 'number'
      ? `${pct}/100`
      : typeof bool === 'boolean'
      ? bool
        ? '✓'
        : '✗'
      : value ?? '—';
  const color =
    typeof bool === 'boolean'
      ? bool
        ? 'text-emerald-400'
        : 'text-rose-400'
      : typeof pct === 'number'
      ? pct >= 85
        ? 'text-emerald-400'
        : pct >= 60
        ? 'text-ember-400'
        : 'text-rose-400'
      : 'text-paper-100';
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-steel-500">{label}</span>
      <span className={`${color} font-semibold`}>{display}</span>
    </div>
  );
};

const SeoRow: React.FC<{ label: string; value: string; mono?: boolean }> = ({
  label,
  value,
  mono
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 items-start">
    <span className="text-[10px] font-mono uppercase tracking-industrial text-steel-500 pt-1">
      {label}
    </span>
    <span className={`text-sm ${mono ? 'font-mono text-ember-400' : 'text-paper-100'}`}>
      {value}
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Weekly Editorial Brief — top-of-studio panel
// ─────────────────────────────────────────────────────────────
const WeeklyBriefPanel: React.FC<{
  brief: WeeklyBrief | null;
  busy: boolean;
  error: string | null;
  onRefresh: () => void;
  onSelectCard: (card: WeeklyBriefCard) => void;
  cardActionDisabled: boolean;
}> = ({ brief, busy, error, onRefresh, onSelectCard, cardActionDisabled }) => {
  const generatedLabel = brief
    ? new Date(brief.generatedAt).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  return (
    <section className="mb-6">
      <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-6">
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-industrial text-ember-500 mb-2">
            Weekly Editorial Brief
          </p>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
            Curated topics — {brief ? `${brief.cards.length} ideas from live industry research` : 'ready to generate'}
          </h2>
          <p className="text-xs md:text-sm text-steel-400 mt-2 leading-relaxed">
            {brief
              ? `Sourced from ${brief.totalEvidenceCollected} evidence items across ${brief.totalQueriesRun} live searches. Last updated ${generatedLabel}.`
              : 'Runs 10 Tavily searches across regulations, OEM launches, defect trends and market shifts, then cross-references what optifinish.in already covers.'}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={busy}
          className="text-[11px] font-mono uppercase tracking-industrial px-4 py-2 border border-ember-500 text-ember-400 hover:bg-ember-500 hover:text-ink-950 transition-colors rounded-md disabled:opacity-50 disabled:cursor-wait whitespace-nowrap self-start sm:self-auto flex-shrink-0"
        >
          {busy ? 'Researching…' : brief ? '↻ Refresh brief' : 'Generate brief'}
        </button>
      </header>

      {error && (
        <div className="mb-4 p-4 border border-rose-500/40 bg-rose-500/10 rounded-lg text-sm text-rose-200">
          <strong className="font-mono uppercase text-[10px] tracking-industrial text-rose-300 block mb-1">
            Brief generation failed
          </strong>
          {error}
        </div>
      )}

      {busy && !brief && (
        <div className="p-8 border border-ember-500/30 bg-ember-500/5 rounded-xl text-center">
          <p className="text-sm text-steel-300">
            Searching industry sources… this takes 20-40 seconds (10 live queries + synthesis).
          </p>
        </div>
      )}

      {!brief && !busy && !error && (
        <div className="p-8 border border-ink-800 bg-ink-900/50 rounded-xl text-center">
          <p className="text-sm text-steel-400 mb-3">
            No brief yet. Click <strong className="text-ember-400">Generate brief</strong> to see this week's most-worth-writing topics based on live industry research.
          </p>
          <p className="text-[11px] text-steel-500 font-mono">
            Or scroll down to pick a category manually.
          </p>
        </div>
      )}

      {brief && brief.cards.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {brief.cards.map((card) => (
            <BriefCard
              key={card.id}
              card={card}
              onSelect={() => onSelectCard(card)}
              disabled={cardActionDisabled}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const BriefCard: React.FC<{
  card: WeeklyBriefCard;
  onSelect: () => void;
  disabled: boolean;
}> = ({ card, onSelect, disabled }) => {
  const categoryLabel = CATEGORIES.find((c) => c.id === card.suggestedCategory)?.label ?? card.suggestedCategory;
  const audienceLabel = AUDIENCES.find((a) => a.id === card.suggestedAudience)?.label ?? card.suggestedAudience;

  return (
    <article className="p-4 md:p-6 border border-ink-700 hover:border-ember-500/60 bg-ink-900/50 rounded-xl transition-colors">
      <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 mb-3">
        <h3 className="text-base md:text-lg font-bold tracking-tight leading-snug">{card.title}</h3>
        <div className="flex flex-wrap gap-2 md:flex-shrink-0">
          <span className="text-[9px] font-mono uppercase tracking-industrial px-2 py-1 rounded bg-ember-500/10 text-ember-400 border border-ember-500/30 whitespace-nowrap">
            {categoryLabel}
          </span>
          <span className="text-[9px] font-mono uppercase tracking-industrial px-2 py-1 rounded bg-ink-800 text-steel-300 border border-ink-700 whitespace-nowrap">
            {audienceLabel}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs mb-4">
        <BriefRow label="Why now" value={card.whyNow} />
        <BriefRow label="Search demand" value={card.searchDemand} />
        <BriefRow label="OptiFinish angle" value={card.optifinishAngle} />
        <BriefRow label="Gap in our content" value={card.gapInOurContent} />
      </div>

      {card.evidenceUrls.length > 0 && (
        <div className="mb-4 pt-3 border-t border-ink-800">
          <p className="text-[9px] font-mono uppercase tracking-industrial text-steel-500 mb-2">
            Evidence
          </p>
          <ul className="space-y-1">
            {card.evidenceUrls.map((u, i) => (
              <li key={i}>
                <a
                  href={u}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-steel-400 hover:text-ember-400 font-mono break-all"
                >
                  {new URL(u).hostname.replace(/^www\./, '')}
                  {new URL(u).pathname.slice(0, 60)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onSelect}
        disabled={disabled}
        className="text-[11px] font-mono uppercase tracking-industrial px-4 py-2 bg-ember-500 text-ink-950 hover:bg-ember-400 transition-colors rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Start writing →
      </button>
    </article>
  );
};

const BriefRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-mono uppercase tracking-industrial text-steel-500 mb-1">
      {label}
    </p>
    <p className="text-xs text-paper-100 leading-relaxed">{value || '—'}</p>
  </div>
);

export default App;
