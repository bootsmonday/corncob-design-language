import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

export default defineConfig({
  base: (process.env.BASE_PATH ?? '/').replace(/([^/])$/, '$1/'),
  integrations: [react(), vue(), mdx()],
  outDir: './dist',
  publicDir: './public',
});
