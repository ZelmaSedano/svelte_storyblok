import type { PageServerLoad } from './$types';
import { getArticles } from '$lib/api/articles';

export const load: PageServerLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') ?? '1');
  const perPage = Number(url.searchParams.get('per_page') ?? '12');
  const search = url.searchParams.get('q'); // search query from ?q=…

  const { stories, total } = await getArticles(page, perPage, search);

  // transform the stories into a format suitable for the frontend
  return {
    articles: stories,
    total,
    page,
    perPage,
    search: search ?? '',
  };
};
