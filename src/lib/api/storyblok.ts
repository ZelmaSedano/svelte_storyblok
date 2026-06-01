import { storyblokInit, apiPlugin, getStoryblokApi } from '@storyblok/svelte';
import { env as publicEnv } from '$env/dynamic/public';

const token = publicEnv.PUBLIC_STORYBLOK_TOKEN;

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
