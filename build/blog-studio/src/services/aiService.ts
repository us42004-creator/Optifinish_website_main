import { CategoryId, AudienceId, TopicIdea, BlogDraft } from '../types';
import { CATEGORIES, AUDIENCES } from '../constants';
import { generateFluxImage, applyBrandSuffix } from './nvidiaImageService';
import { generateTopicIdeasLLM } from './topicEngine';
import { generateBlogDraftLLM } from './draftEngine';
import { generateBlogDraftMultipass } from './draftEngineMultipass';
import { generateSeoLLM } from './seoEngine';
import { searchBest as photoSearchBest } from './photoLibrary';

// v0.1: mocked AI responses so the full UI flow works without an API key.
// Real Gemini/Claude wiring goes here next.

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function generateTopicIdeas(
  category: CategoryId,
  audience: AudienceId,
  excludeTitles: string[] = []
): Promise<TopicIdea[]> {
  // Real generation via NVIDIA Build with multi-model rotation (Llama / DeepSeek /
  // Gemma / Nemotron) + random voice nudge + random trigger subset + exclusion of
  // recently-generated titles. Falls back to a synthetic set if everything fails.
  try {
    return await generateTopicIdeasLLM(category, audience, excludeTitles);
  } catch (err) {
    console.error('[generateTopicIdeas] LLM failed, using fallback:', err);
    const cat = CATEGORIES.find((c) => c.id === category)!;
    const aud = AUDIENCES.find((a) => a.id === audience)!;
    return [
      {
        id: 't1',
        title: `What ${aud.label}s Get Wrong About ${cat.label} (And How to Fix It)`,
        angle: `Reframes a common misconception specific to ${aud.role.toLowerCase()}.`,
        hook: `Most ${aud.label.toLowerCase()}s still measure ${cat.examples[0]} the same way they did 15 years ago.`,
        estimatedReadTime: '6 min'
      },
      {
        id: 't2',
        title: `${cat.examples[0]}: A 2026 Field Guide`,
        angle: 'Practical, structured, ships with checklists and decision tables.',
        hook: `Engine offline. This is a fallback topic — restart the dev server or check NVIDIA Build status.`,
        estimatedReadTime: '9 min'
      }
    ];
  }
}

export async function generateBlogDraft(
  topic: TopicIdea,
  category: CategoryId,
  audience: AudienceId
): Promise<BlogDraft> {
  // Multi-pass pipeline (outline → parallel section expand → editorial scrub).
  // Reliably hits 1100+ word target because each section is expanded with the
  // model's full attention. Falls back to single-pass if multipass errors,
  // and to a seeded mock if both fail — so the demo never breaks.
  try {
    return await generateBlogDraftMultipass(topic, category, audience);
  } catch (err) {
    console.warn('[generateBlogDraft] multipass failed, trying single-pass:', err);
  }
  try {
    return await generateBlogDraftLLM(topic, category, audience);
  } catch (err) {
    console.error('[generateBlogDraft] both LLM paths failed, using seed mock:', err);
  }
  // Fallback: hand-seeded mock so the demo never breaks.
  await wait(800);
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const aud = AUDIENCES.find((a) => a.id === audience)!;

  const bodyHtml = `
<p class="lead">${topic.hook}</p>

<h2>Why this matters now</h2>
<p>For a ${aud.label.toLowerCase()}, ${cat.label.toLowerCase()} is rarely about the spec sheet. It is about whether the line keeps running on the third shift, whether the rejection bin stays empty, and whether the plant manager can defend the capex when the next finance review hits.</p>
<p>This piece is written for you, the operator who has read the brochures and now wants the part the brochures left out.</p>

<h2>The friction nobody names</h2>
<p>Most ${cat.label.toLowerCase()} conversations stall at the same point: the gap between what looks good in a demo and what holds up at full duty cycle. The honest answer involves three variables most vendors won’t put in writing.</p>
<ol>
  <li><strong>Process repeatability under heat soak.</strong> Numbers measured cold drift once the line has been running for six hours.</li>
  <li><strong>Operator dependence.</strong> Any system that needs an A-grade operator to behave is a system that will fail on Sunday night.</li>
  <li><strong>Recovery, not prevention.</strong> Plants don’t pay for systems that never fault. They pay for systems that fault gracefully and recover fast.</li>
</ol>

<h2>What a serious answer looks like</h2>
<p>OptiFinish’s position is unusual because we sit at the intersection of manufactured systems, partner-brand integration (GEMA, DURR), and our own automation layer (Z-TAP). That means the answer to your problem isn’t pre-decided by what we sell. It is decided by what your line actually needs.</p>

<h3>The decision frame</h3>
<p>If you remember nothing else from this article, remember this matrix:</p>
<ul>
  <li><strong>Throughput-bound problem</strong> → automation and curing geometry, in that order.</li>
  <li><strong>Quality-bound problem</strong> → pretreatment and gun control, in that order.</li>
  <li><strong>Cost-bound problem</strong> → reclaim efficiency and energy profile, in that order.</li>
</ul>

<h2>Where most plants leave money on the floor</h2>
<p>The cheapest upgrade in a powder coating line is almost never a new gun. It is usually a small change to <em>how</em> the existing system is being used. Three examples we keep finding on the shop floor:</p>
<ol>
  <li>Booth airflow tuned for a film build the line stopped running two product cycles ago.</li>
  <li>Cure schedules running 40°C hotter than the powder spec, because nobody updated the recipe after the last powder change.</li>
  <li>Gun-to-part distance set by the senior operator, undocumented, and lost the day they retired.</li>
</ol>

<h2>What to do this week</h2>
<p>You don’t need a capex meeting to start. You need a 30-minute audit and a notebook.</p>
<ul>
  <li>Walk the line at hour six, not hour one. Note the first thing that surprises you.</li>
  <li>Pull the last 30 days of rejection data. Sort by defect type, not by quantity.</li>
  <li>Ask the operator what they’ve “gotten used to.” That is your real defect list.</li>
</ul>

<h2>The OptiFinish view</h2>
<p>We build, we partner, and we automate. We will tell you when the right answer is a gun upgrade, when it is an automation cell, and when it is neither and you should fix the pretreatment first. That neutrality is the product.</p>

<p class="closing">Ready to walk the line with us? Book a no-commitment audit at our Greater Noida facility.</p>
`;

  const wordCount = bodyHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

  return {
    title: topic.title,
    subtitle: topic.angle,
    bodyHtml,
    wordCount,
    snapshot: {
      decisionFriction: `The ${aud.label.toLowerCase()} has to choose between defending the status quo and re-spec'ing under conditions the original spec did not anticipate.`,
      dominantAnxiety: `That the cost of acting now will look unjustified next quarter, and the cost of inaction will look unjustified next year.`,
      coreInsight: `Most ${cat.label.toLowerCase()} decisions in Indian plants are made on a spec sheet that no longer matches what the line actually runs.`,
      structuralShape: 'immersive_essay',
      lever: `Auditing what the line is actually doing, before deciding what it should do next.`
    },
    imagePlacements: [
      {
        id: 'img-inline-1',
        position: 'inline',
        anchorHeading: 'The friction nobody names',
        prompt: `Wide editorial frame of an Indian industrial powder coating bay during the second shift, a finished body panel cooling on a conveyor with subtle ember-orange light spilling from the curing oven mouth, no people in frame, deliberate negative space at the top for headline overlay`,
        alt: `${cat.label} contextual scene illustrating the friction discussed in the article`
      },
      {
        id: 'img-inline-2',
        position: 'inline',
        anchorHeading: 'Where most plants leave money on the floor',
        prompt: `Close documentary detail of a calibrated thermocouple probe resting against a coated panel inside a curing oven, glowing heating elements diffused in the background, gloved hand steadying the harness, no posed eye contact`,
        alt: 'Close-up of process diagnostic in progress on a curing oven'
      }
    ]
  };
}

export async function rewriteWithPrompt(
  currentHtml: string,
  instruction: string
): Promise<string> {
  await wait(800);
  // Mock: append a marker. Real impl will diff via Gemini/Claude.
  return (
    currentHtml +
    `\n<!-- AI-EDIT applied: "${instruction}" — real model will apply scoped rewrite here -->`
  );
}

export async function generateSeo(
  draft: BlogDraft,
  category?: CategoryId,
  audience?: AudienceId
): Promise<BlogDraft['seo']> {
  // Real LLM-driven SEO: keyword extraction tied to the actual body, character-
  // limit-enforced meta tags, archetype-specific Schema.org JSON-LD, Open Graph
  // + Twitter Card, Indian geo-tagging, internal-link suggestions, health
  // scores. Falls back to a thin synthetic if the LLM call fails so the demo
  // never breaks.
  if (category && audience) {
    try {
      return await generateSeoLLM(draft, category, audience);
    } catch (err) {
      console.warn('[generateSeo] LLM failed, falling back to synthetic SEO:', err);
    }
  }
  // Thin fallback (covers the "no category passed" case + LLM failure)
  await wait(400);
  const focus = draft.title.split(' ').slice(0, 3).join(' ').toLowerCase();
  const slug = draft.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 64);

  return {
    metaTitle: `${draft.title} | OptiFinish`.slice(0, 60),
    metaDescription: (draft.subtitle || draft.title).slice(0, 155),
    slug,
    focusKeyword: focus,
    secondaryKeywords: [
      'powder coating',
      'industrial finishing',
      'OptiFinish',
      'powder coating plant india'
    ],
    longTailKeywords: ['powder coating equipment manufacturer India'],
    ogTitle: draft.title,
    ogDescription: draft.subtitle || draft.title,
    ogImage: draft.imagePlacements?.find((p) => p.generatedUrl)?.generatedUrl,
    ogType: 'article',
    ogLocale: 'en_IN',
    twitterCard: 'summary_large_image',
    twitterTitle: draft.title.slice(0, 70),
    twitterDescription: (draft.subtitle || draft.title).slice(0, 200),
    twitterImage: draft.imagePlacements?.find((p) => p.generatedUrl)?.generatedUrl,
    schemaType: 'BlogPosting',
    geoRegion: 'IN-UP',
    geoPlacename: 'Greater Noida',
    internalLinkSuggestions: [],
    scores: {
      titleLength: 0,
      descLength: 0,
      keywordInTitle: false,
      keywordInFirstParagraph: false,
      keywordInUrl: false,
      keywordDensityPct: 0,
      hasH2s: /<h2[^>]*>/i.test(draft.bodyHtml),
      hasPullQuote: /<blockquote[^>]*>/i.test(draft.bodyHtml),
      overall: 0
    },
    schemaJsonLd: JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: draft.title,
        description: draft.subtitle,
        author: { '@type': 'Organization', name: 'OptiFinish' },
        publisher: {
          '@type': 'Organization',
          name: 'Value Added Coating Solutions Pvt. Ltd.'
        },
        datePublished: new Date().toISOString().slice(0, 10)
      },
      null,
      2
    )
  };
}

export async function generateImage(prompt: string): Promise<string> {
  // Photo library FIRST — Indian B2B readers can smell AI factory shots,
  // so a real photo from /public/photos beats a Flux render every time.
  // Only falls through to Flux when no library match clears the trust
  // threshold (currently low because the library is mostly placeholders).
  try {
    const realPhoto = await photoSearchBest(prompt);
    if (realPhoto) {
      console.log('[generateImage] using real photo from library:', realPhoto.url);
      return realPhoto.url;
    }
  } catch (err) {
    console.warn('[generateImage] photo library lookup failed, falling through to Flux:', err);
  }

  // Real Flux (FLUX.1-dev) via NVIDIA Build, with brand-style suffix.
  const fullPrompt = applyBrandSuffix(prompt);
  try {
    return await generateFluxImage({
      prompt: fullPrompt,
      steps: 30, // 30 keeps gen ~6–10s; bump to 50 for final renders
      cfgScale: 5
    });
  } catch (err) {
    console.error('[generateImage] Flux failed, using placeholder:', err);
    const seed = encodeURIComponent(prompt.slice(0, 30));
    return `https://picsum.photos/seed/${seed}/1024/1024`;
  }
}

// ─────────────────────────────────────────────────────────────
// Distribution pack — re-export from distributionEngine for the UI
// ─────────────────────────────────────────────────────────────
export { generateDistributionPack, renderDistributionMarkdown } from './distributionEngine';
export type { DistributionPack } from './distributionEngine';

// ─────────────────────────────────────────────────────────────
// A/B variants
// ─────────────────────────────────────────────────────────────
export { generateAbVariants } from './abVariants';
export type { AbVariants } from './abVariants';

// ─────────────────────────────────────────────────────────────
// Voice classifier
// ─────────────────────────────────────────────────────────────
export { scoreVoice, DEFAULT_PROFILE as DEFAULT_VOICE_PROFILE } from './voiceClassifier';
export type { VoiceScore, VoiceProfile } from './voiceClassifier';
