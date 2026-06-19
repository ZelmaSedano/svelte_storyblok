// using Storyblok API directly on the server
import { env as publicEnv } from '$env/dynamic/public';

const token = publicEnv.PUBLIC_STORYBLOK_TOKEN;

if (!token) {
  throw new Error('Missing PUBLIC_STORYBLOK_TOKEN environment variable. Add it to .env with PUBLIC_STORYBLOK_TOKEN=your_token and restart the dev server.');
}

export const getStoryblokStory = async (slug: string) => {
  const url = new URL(`https://api.storyblok.com/v2/cdn/stories/${slug}`);
  url.searchParams.set('token', token);
  url.searchParams.set('version', 'published');

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Storyblok fetch failed: ${res.status} ${res.statusText} ${body}`);
  }

  const data = await res.json();
  return data.story;
};
