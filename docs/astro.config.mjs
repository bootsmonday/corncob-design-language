import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [react(), vue(), mdx()],
  outDir: '../dist-docs',
  publicDir: '../dist',
});
