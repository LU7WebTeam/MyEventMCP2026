import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://myeventmcp.com',
  output: 'static',
  integrations: [sitemap()],
});
