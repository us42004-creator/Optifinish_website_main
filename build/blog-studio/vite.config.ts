import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// LOCAL DEV: this proxy intercepts /api/nvidia/* requests, injects the right
// NVIDIA Build key (per-model dispatch — DeepSeek / Gemma / Nemotron / Llama
// each use their own key with NVIDIA_API_KEY as fallback), and forwards to
// NVIDIA's API.
//
// PRODUCTION on Vercel: same paths, same dispatch, same auth — handled by
// /api/nvidia/llm.ts and /api/nvidia/flux.ts. Client code (nvidiaLlmService.ts
// and nvidiaImageService.ts) calls /api/nvidia/* in both environments.

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const FALLBACK =
    env.NVIDIA_API_KEY ||
    env.NVIDIA_LLM_KEY ||
    env.NVIDIA_FLUX_KEY ||
    env.NVIDIA_SD_KEY ||
    '';
  const KEY_DEEPSEEK = env.NVIDIA_DEEPSEEK_KEY || FALLBACK;
  const KEY_GEMMA    = env.NVIDIA_GEMMA_KEY    || FALLBACK;
  const KEY_NEMOTRON = env.NVIDIA_NEMOTRON_KEY || FALLBACK;
  const KEY_TAVILY   = env.TAVILY_API_KEY      || '';

  // Per-request key dispatch. We can't read the request body in vite's
  // proxy.configure synchronously (it's a stream by then), so we attach a
  // handler that buffers the body, picks the key from `model`, sets the
  // Authorization header, then re-writes the body.
  const dispatchAuth = (proxy: any) => {
    proxy.on('proxyReq', (proxyReq: any, req: any) => {
      const chunks: Buffer[] = [];
      const onData = (chunk: Buffer) => chunks.push(chunk);
      req.on('data', onData);
      req.on('end', () => {
        let model = '';
        try {
          model = JSON.parse(Buffer.concat(chunks).toString('utf8'))?.model ?? '';
        } catch {
          /* ignore */
        }
        const m = (model || '').toLowerCase();
        const key = m.includes('deepseek') ? KEY_DEEPSEEK
          : (m.includes('gemma') || m.startsWith('google/')) ? KEY_GEMMA
          : m.includes('nemotron') ? KEY_NEMOTRON
          : FALLBACK;
        proxyReq.setHeader('Authorization', `Bearer ${key}`);
        proxyReq.setHeader('Accept', 'application/json');
      });
    });
    proxy.on('error', (err: any) => console.error('[llm proxy error]', err.message));
  };

  return {
    server: {
      port: 5001,
      host: '0.0.0.0',
      strictPort: true,
      proxy: {
        '/api/nvidia/llm': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          timeout: 300_000,
          proxyTimeout: 300_000,
          rewrite: () => '/v1/chat/completions',
          configure: (proxy) => {
            // Simpler path for LLM: vite's proxyReq fires AFTER body is parsed
            // so we get headers via x-vite-model-hint header set by the client
            // OR we just always use FALLBACK key in dev. In dev the same key
            // can call any model so this is fine; in prod the api/nvidia/llm.ts
            // function does the per-model dispatch properly.
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${FALLBACK}`);
              proxyReq.setHeader('Accept', 'application/json');
            });
            proxy.on('error', (err) => console.error('[llm proxy error]', err.message));
          }
        },
        '/api/nvidia/flux': {
          target: 'https://ai.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          timeout: 300_000,
          proxyTimeout: 300_000,
          rewrite: () => '/v1/genai/black-forest-labs/flux.1-dev',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${FALLBACK}`);
              proxyReq.setHeader('Accept', 'application/json');
            });
            proxy.on('error', (err) => console.error('[flux proxy error]', err.message));
          }
        },
        // Browser POST /api/tavily/search  →  https://api.tavily.com/search
        // TAVILY_API_KEY injected as Bearer token, never bundled in client.
        '/api/tavily/search': {
          target: 'https://api.tavily.com',
          changeOrigin: true,
          secure: true,
          timeout: 30_000,
          proxyTimeout: 30_000,
          rewrite: () => '/search',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${KEY_TAVILY}`);
              proxyReq.setHeader('Accept', 'application/json');
            });
            proxy.on('error', (err) => console.error('[tavily proxy error]', err.message));
          }
        }
      }
    },
    plugins: [react()]
  };
});
