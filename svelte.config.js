import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      crawl: true,
      entries: [],
      handleHttpError: ({ path, status, message }) => {
        console.warn(`Prerender error ${status} on ${path}: ${message}`);
      }
    }
  }
};