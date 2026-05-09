// Analytics scaffold. Plausible-ready helpers + UTM generator. The
// backend pipe (DB row per event, lead attribution to Zoho CRM) ships
// when you've picked an analytics provider and a persistence layer.
//
// What works today:
// - generateUtm(): UTM-tagged URLs for distribution snippets so you can
//   already see channel attribution if/when analytics is enabled.
// - Plausible <script> tag emitter for the export template (commented
//   out by default — flip a flag to enable).
// - trackEvent() helper that no-ops gracefully if window.plausible
//   isn't loaded.
//
// To activate:
//   1. Sign up at plausible.io (or self-host Umami / PostHog)
//   2. Set VITE_PLAUSIBLE_DOMAIN=optifinish.com in .env.local
//   3. The export template will emit the script tag automatically

export type Channel =
  | 'linkedin'
  | 'whatsapp'
  | 'email-newsletter'
  | 'sales-pdf'
  | 'slack-summary'
  | 'organic';

export interface UtmParams {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
}

const CHANNEL_TO_UTM: Record<Channel, UtmParams> = {
  linkedin: { source: 'linkedin', medium: 'social' },
  whatsapp: { source: 'whatsapp', medium: 'social-status' },
  'email-newsletter': { source: 'newsletter', medium: 'email' },
  'sales-pdf': { source: 'sales-team', medium: 'pdf' },
  'slack-summary': { source: 'internal-slack', medium: 'team' },
  organic: { source: 'organic', medium: 'organic' }
};

export function generateUtm(baseUrl: string, channel: Channel, postSlug: string): string {
  const params = CHANNEL_TO_UTM[channel];
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', params.source);
  url.searchParams.set('utm_medium', params.medium);
  url.searchParams.set('utm_campaign', postSlug);
  if (params.content) url.searchParams.set('utm_content', params.content);
  return url.toString();
}

// Returns the <script> snippet to inject in the export template's <head>.
// Empty string when no analytics domain is configured (so the snippet
// doesn't ship until you opt in).
export function plausibleScriptTag(domain?: string): string {
  if (!domain) return '';
  return `  <script defer data-domain="${domain}" src="https://plausible.io/js/script.outbound-links.js"></script>
  <script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments); };</script>`;
}

// Client-side event tracker. No-ops if Plausible isn't loaded.
export function trackEvent(name: string, props?: Record<string, string | number>): void {
  if (typeof window === 'undefined') return;
  const plausible = (window as unknown as { plausible?: (n: string, o?: { props: Record<string, string | number> }) => void }).plausible;
  if (typeof plausible === 'function') {
    plausible(name, props ? { props } : undefined);
  }
  // else: silently no-op — analytics not enabled yet
}

// Standard event names the editor can rely on across the analytics layer
export const EVENTS = {
  POST_VIEW: 'post-view',
  CTA_CLICK: 'cta-click',
  SCROLL_50: 'scroll-50',
  SCROLL_75: 'scroll-75',
  SCROLL_100: 'scroll-100',
  PULL_QUOTE_VISIBLE: 'pull-quote-visible',
  IMAGE_VISIBLE: 'image-visible',
  EXTERNAL_CLICK: 'external-click',
  LEAD_SUBMIT: 'lead-submit'
} as const;
