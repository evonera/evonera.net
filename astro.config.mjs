// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://evonera.net',
  redirects: {
    '/bolt': '/fix-my-ai-site',
    '/v0': '/fix-my-ai-site',
    '/replit': '/fix-my-ai-site',
    '/onboarding': '/fix-my-ai-site#project-review',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/demo/'),
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/demo/'],
        },
      ],
      sitemap: 'https://evonera.net/sitemap-index.xml',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
