import type { LayoutServerLoad } from './$types';
import { getStoryblokStory } from '$lib/api/getStoryblokStory';
export const load: LayoutServerLoad = async ({ params }) => {
  try {
    const res = await getStoryblokStory('page-configuration');
    return res.content;
  } catch (err) {
    console.error('Error fetching config:', err);
    return { config: null };
  }
};

