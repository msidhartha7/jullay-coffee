import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jullay.coffee',
  // let temporary Cloudflare tunnels reach the local dev/preview server
  server: { allowedHosts: ['.trycloudflare.com'] },
  vite: {
    server: { allowedHosts: ['.trycloudflare.com'] },
    preview: { allowedHosts: ['.trycloudflare.com'] },
  },
});
