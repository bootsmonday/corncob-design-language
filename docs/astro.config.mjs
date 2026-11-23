import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

export default defineConfig({
  base: (process.env.BASE_PATH ?? '/').replace(/([^/])$/, '$1/'),
  integrations: [react(), vue(), mdx()],
  outDir: './dist',
  publicDir: './public',
  vite: {
    resolve: {
      alias: {
        '@bootsmonday/corncob-design-language': fileURLToPath(new URL('../', import.meta.url)),
      },
    },
  },
});
