import { storyblokInit, apiPlugin, getStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';

const token = PUBLIC_STORYBLOK_TOKEN;

if (!token) {
  throw new Error('Missing PUBLIC_STORYBLOK_TOKEN environment variable. Add it to .env with PUBLIC_STORYBLOK_TOKEN=your_token and restart the dev server.');
}

storyblokInit({
  accessToken: token,
  use: [apiPlugin],
  components: {
    
  },
});

export const storyblokApi = getStoryblokApi();
