import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// In LOCAL DEV: this proxy intercepts /api/nvidia/* requests, injects the
// NVIDIA_API_KEY as a Bearer token, and forwards to NVIDIA Build.
//
// In PRODUCTION on Vercel: the same /api/nvidia/* paths are served by the
// serverless functions in /api/nvidia/llm.ts and /api/nvidia/flux.ts, which
// do the same auth injection. Client code (nvidiaLlmService.ts and
// nvidiaImageService.ts) calls the same paths in both environments.

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const NVIDIA_KEY =
    env.NVIDIA_API_KEY ||
    env.NVIDIA_LLM_KEY ||
    env.NVIDIA_FLUX_KEY ||
    env.NVIDIA_SD_KEY ||
    '';

  return {
    server: {
      port: 5001,
      host: '0.0.0.0',
      strictPort: true,
      proxy: {
        // Browser POST /api/nvidia/llm
        // Vite forwards to https://integrate.api.nvidia.com/v1/chat/completions
        '/api/nvidia/llm': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          timeout: 300_000,
          proxyTimeout: 300_000,
          rewrite: () => '/v1/chat/completions',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${NVIDIA_KEY}`);
              proxyReq.setHeader('Accept', 'application/json');
            });
            proxy.on('error', (err) => {
              console.error('[llm proxy error]', err.message);
            });
          }
        },
        // Browser POST /api/nvidia/flux
        // Vite forwards to https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev
        '/api/nvidia/flux': {
          target: 'https://ai.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          timeout: 300_000,
          proxyTimeout: 300_000,
          rewrite: () => '/v1/genai/black-forest-labs/flux.1-dev',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${NVIDIA_KEY}`);
              proxyReq.setHeader('Accept', 'application/json');
            });
            proxy.on('error', (err) => {
              console.error('[flux proxy error]', err.message);
            });
          }
        }
      }
    },
    plugins: [react()]
  };
});
