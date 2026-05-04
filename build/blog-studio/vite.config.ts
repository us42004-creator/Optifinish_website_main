import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const FLUX_KEY = env.NVIDIA_FLUX_KEY || '';
  const SD_KEY = env.NVIDIA_SD_KEY || '';
  const LLM_KEY = env.NVIDIA_LLM_KEY || '';

  return {
    server: {
      port: 5001,
      host: '0.0.0.0',
      strictPort: true,
      proxy: {
        // Browser → /nvidia/flux/flux.1-dev
        // Vite     → https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev
        // with NVIDIA_FLUX_KEY injected as Bearer token. Key never reaches browser bundle.
        '/nvidia/flux': {
          target: 'https://ai.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          timeout: 120_000,
          proxyTimeout: 120_000,
          rewrite: (p) => p.replace(/^\/nvidia\/flux/, '/v1/genai/black-forest-labs'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${FLUX_KEY}`);
              proxyReq.setHeader('Accept', 'application/json');
            });
            proxy.on('error', (err) => {
              console.error('[flux proxy error]', err.message);
            });
          }
        },
        '/nvidia/sd': {
          target: 'https://ai.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          timeout: 120_000,
          proxyTimeout: 120_000,
          rewrite: (p) => p.replace(/^\/nvidia\/sd/, '/v1/genai/stabilityai'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${SD_KEY}`);
              proxyReq.setHeader('Accept', 'application/json');
            });
            proxy.on('error', (err) => {
              console.error('[sd proxy error]', err.message);
            });
          }
        },
        // OpenAI-compatible LLM endpoint (Llama, Nemotron, Mixtral, etc.)
        // Browser → /nvidia/llm/chat/completions
        // Vite     → https://integrate.api.nvidia.com/v1/chat/completions
        '/nvidia/llm': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          timeout: 120_000,
          proxyTimeout: 120_000,
          rewrite: (p) => p.replace(/^\/nvidia\/llm/, '/v1'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${LLM_KEY}`);
              proxyReq.setHeader('Accept', 'application/json');
            });
            proxy.on('error', (err) => {
              console.error('[llm proxy error]', err.message);
            });
          }
        }
      }
    },
    plugins: [react()]
  };
});
