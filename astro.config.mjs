// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://laserplusnsk.ru',
  server: { host: true },
  integrations: [
    preact({ compat: true }),
    sitemap({
      // Скрытые страницы не должны попадать в карту сайта.
      // /packages/ — абонементы, временно скрыты (у страницы также стоит noindex).
      // /lp/ — рекламные лендинги, они и так noindex.
      filter: (page) => !page.includes('/packages/') && !page.includes('/lp/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/reklama': '/',
  },
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
