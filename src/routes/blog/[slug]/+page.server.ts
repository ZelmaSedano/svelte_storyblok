import type { PageServerLoad } from './$types';
import { getStoryblokStory } from '$lib/api/getStoryblokStory';
import type { Article } from '$lib/typings/article';
export const prerender = false;
export const load: PageServerLoad = async ({ params }) => {

  const fullSlug = `posts/${params.slug}`;
  const story = await getStoryblokStory(fullSlug).then(res => {
      return res;
  }).catch(err => {
    console.error('Error fetching article:', err);
    return { article: null };
  });

  const mappedArticle: Article = {
    name: story.name,
    slug: story.slug,
    title: story.content?.title ?? '',
    date: story.content?.date ?? '',
    doc: story.content?.content?.content ?? null,
    image: story.content?.content?.image ?? null,
    published_at: story.published_at ?? null,
    updated_at: story.updated_at ?? null,
  };
 
  return mappedArticle ;
};


