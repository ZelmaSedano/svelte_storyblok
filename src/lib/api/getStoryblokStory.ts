// Using @storyblok/svelte in SvelteKit

import { useStoryblokApi } from '@storyblok/svelte';
 
// eventually could just use this to grab stories with different params
// can be adapted all calls to Storyblok API, but keep this simple for now until requirements are clear
export const getStoryblokStory = async ( slug: string ) => {
  const storyblokApi = useStoryblokApi();

  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: 'published',
    // version: 'draft', 
    // or 'draft' for preview mode
  });

  return data.story
};
