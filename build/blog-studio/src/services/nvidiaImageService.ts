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

const FLUX_BRAND_SUFFIX = `Shot on Hasselblad X2D, 80mm lens, f/4, natural directional light. Editorial industrial photography, calm and precise, restrained color palette of graphite, steel grey, and warm white, with a single ember-orange accent acting as the warmest light source. Kodak Portra 400 color science. Sharp focus on the subject, gentle falloff into shadow.`;

export function applyBrandSuffix(rawPrompt: string): string {
  if (rawPrompt.includes('Hasselblad X2D')) return rawPrompt; // already suffixed
  return `${rawPrompt.trim()}\n\n${FLUX_BRAND_SUFFIX}`;
}

export async function generateFluxImage(opts: FluxOptions): Promise<string> {
  const body = {
    prompt: opts.prompt,
    width: opts.width ?? 1024,
    height: opts.height ?? 1024,
    cfg_scale: opts.cfgScale ?? 5,
    mode: opts.mode ?? 'base',
    seed: opts.seed ?? 0,
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
