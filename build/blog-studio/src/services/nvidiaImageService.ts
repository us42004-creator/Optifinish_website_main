// NVIDIA Build image generation client.
// Calls go through the Vite dev-server proxy at /nvidia/flux and /nvidia/sd
// so the API key stays server-side. See vite.config.ts.

export interface FluxOptions {
  prompt: string;
  width?: number; // FLUX.1-dev on NVIDIA hosted only supports 1024 currently
  height?: number;
  cfgScale?: number; // 0–9, default 5
  steps?: number; // 5–100, default 50
  seed?: number; // 0 = random
  mode?: 'base' | 'depth' | 'canny';
}

export interface FluxModel {
  id: 'flux.1-dev' | 'flux.1-schnell';
  label: string;
}

// HONESTY CLAUSE — appended to every variant. These are the things Flux
// fabricates badly: text on signs (gibberish letters), company logos
// (mangled marks), split-screens/comparisons, illustrations styled like
// photos, distorted hands / faces, physics-impossible geometry. Naming
// them explicitly reduces the hallucination rate noticeably.
const HONESTY_CLAUSE = `Photorealistic documentary photography, no illustration or CGI look. No text, no signage, no readable letters, no numbers on gauges beyond blurred dial faces, no visible company logos, no branded product labels. No side-by-side comparisons, no split-screen, no before-and-after layout, no infographic overlay, no annotation arrows or callouts. Physically plausible geometry only. If a human hand appears it must be anatomically correct with five visible fingers or cropped so the count is not in frame. Natural composition, not overtly staged.`;

// Brand suffix has FOUR stylistic variants. One is picked at random per
// render so images don't all look like the same Hasselblad-80mm-f/4
// frame. The shared elements (restrained palette, ember accent, industrial
// editorial register, honesty clause) lock the brand. The varying elements
// (focal length, light, film stock) give the library visual range.
const FLUX_BRAND_SUFFIX_VARIANTS = [
  // Wide editorial — for facility shots, conveyor lines, plant interiors
  `Shot on Hasselblad X2D, 35mm lens, f/5.6, soft cool overhead light. Editorial industrial photography, calm and precise, restrained palette of graphite, steel grey, warm white. A single ember-orange accent. Kodak Portra 400 color science. Wide framing, generous negative space.\n\n${HONESTY_CLAUSE}`,
  // Detail / portrait — for guns, instruments, hands-at-work
  `Shot on Hasselblad X2D, 80mm lens, f/4, natural directional light from a tall side window. Editorial industrial photography, calm and precise, graphite and steel grey palette with one warm ember accent. Kodak Portra 400 color science. Sharp subject focus, gentle falloff into shadow.\n\n${HONESTY_CLAUSE}`,
  // Macro / defect — for orange-peel, blistering, surface texture
  `Shot on Phase One IQ4 macro setup, 120mm lens, f/8, raking side light from low angle. Editorial diagnostic photography, surface texture in extreme detail. Restrained palette of cool steel grey with a single warm highlight. Cinestill 50D color science. Shallow depth, exposed micro-topology.\n\n${HONESTY_CLAUSE}`,
  // Cinematic interior — for ovens, booths, exit tunnels
  `Shot on Hasselblad X2D, 50mm lens, f/2.8, deep dramatic chiaroscuro with a single ember-warm key light. Editorial industrial photography, atmospheric, calm. Graphite and ink palette with a warm orange glow source. Cinestill 800T color science. Sharp focus on the foreground subject.\n\n${HONESTY_CLAUSE}`
];

function pickBrandSuffix(): string {
  return FLUX_BRAND_SUFFIX_VARIANTS[Math.floor(Math.random() * FLUX_BRAND_SUFFIX_VARIANTS.length)];
}

// Backwards-compat: first variant is the original suffix shape so existing
// callers and the dedupe check both still work.
const FLUX_BRAND_SUFFIX = FLUX_BRAND_SUFFIX_VARIANTS[1];

export function applyBrandSuffix(rawPrompt: string): string {
  if (rawPrompt.includes('Hasselblad') || rawPrompt.includes('Phase One')) return rawPrompt;
  return `${rawPrompt.trim()}\n\n${pickBrandSuffix()}`;
}

export async function generateFluxImage(opts: FluxOptions): Promise<string> {
  // Random seed by default — same prompt across calls produces visual
  // variation instead of the same image. Pass an explicit seed only when
  // you want reproducibility (preheat-photos.mjs sets one explicitly).
  const seed = opts.seed ?? Math.floor(Math.random() * 1_000_000);

  const body = {
    prompt: opts.prompt,
    width: opts.width ?? 1024,
    height: opts.height ?? 1024,
    cfg_scale: opts.cfgScale ?? 5,
    mode: opts.mode ?? 'base',
    seed,
    steps: opts.steps ?? 30,
    samples: 1
  };

  // /api/nvidia/flux is a Vercel serverless function in production and a Vite
  // dev-server proxy locally. Hardcoded to FLUX.1-dev upstream.
  const res = await fetch('/api/nvidia/flux', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '<no body>');
    throw new Error(`NVIDIA FLUX ${res.status}: ${errText.slice(0, 300)}`);
  }

  const json = (await res.json()) as unknown;
  return extractBase64DataUrl(json);
}

// NVIDIA's image responses across BFL/Stability use 'artifacts: [{ base64 }]'.
// We accept a couple of fallback shapes so future endpoint variants don't break us.
function extractBase64DataUrl(json: unknown): string {
  const obj = json as Record<string, unknown>;
  // Stability/BFL standard
  const artifacts = obj?.artifacts as Array<{ base64?: string }> | undefined;
  if (artifacts?.[0]?.base64) {
    return toDataUrl(artifacts[0].base64);
  }
  // Some NVIDIA endpoints return a single 'image' base64 string
  if (typeof obj?.image === 'string') {
    return toDataUrl(obj.image);
  }
  // OpenAI-compatible fallback
  if (typeof obj?.b64_json === 'string') {
    return toDataUrl(obj.b64_json);
  }
  console.warn('[nvidia] unexpected response shape, keys =', Object.keys(obj || {}));
  throw new Error('NVIDIA response did not contain a recognised image field');
}

// Detect MIME from base64 magic bytes so the data URL is correct.
// NVIDIA Build's FLUX returns JPEG today; PNG/WebP detection guards future changes.
function toDataUrl(b64: string): string {
  const head = b64.slice(0, 4);
  let mime = 'image/png';
  if (head.startsWith('/9j/')) mime = 'image/jpeg';
  else if (head.startsWith('iVBOR')) mime = 'image/png';
  else if (head.startsWith('UklGR')) mime = 'image/webp';
  else if (head.startsWith('R0lGOD')) mime = 'image/gif';
  return `data:${mime};base64,${b64}`;
}
