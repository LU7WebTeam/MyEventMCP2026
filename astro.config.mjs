import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://myeventmcp.com';
const lastmod = '2026-08-17';

const priorities = {
  '/': 1.0,
  '/events/': 0.8,
  '/locations/': 0.8,
  '/terms-services/': 0.3,
  '/privacy-policy/': 0.3,
};

function pathOf(url) {
  return url.startsWith(site) ? url.slice(site.length) : url;
}

export default defineConfig({
  site,
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      serialize(item) {
        item.lastmod = lastmod;
        const priority = priorities[pathOf(item.url)];
        if (priority) item.priority = priority;
        return item;
      },
    }),
  ],
});