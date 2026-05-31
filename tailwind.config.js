import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';
const base = dev ? '' : '/svelte-storyblok';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build'
    }),
    paths: {
      base
    },
    prerender: {
      entries: dev
        ? ['*']
        : [
            '/',             // home
            '/about',
            '/climate'
            // NOTE: no '/blog' or '/blog/[slug]' here
          ]
    }
  }
};

export default config;