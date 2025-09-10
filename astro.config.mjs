// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // Replace with your site URL
  integrations: [
    react(), 
    mdx(), 
    sitemap({
      customPages: ['https://example.com/blog'],
      filter: (page) => !page.includes('draft'),
      serialize: (item) => {
        // Higher priority for blog posts
        if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});