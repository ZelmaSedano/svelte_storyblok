import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';
const base = dev ? '' : '/svelte-storyblok';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      strict: false   // <-- important
    }),
    paths: { base },
    prerender: {
      entries: ['*'],  // or a manual list if you prefer
	   handleHttpError: ({ path, status, message }) => {
        // log, but don't crash the build when a route like /blog fails
        console.warn(`Prerender error ${status} on ${path}: ${message}`);
        return 'ignore';
      }
    }
  }
};