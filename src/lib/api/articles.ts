import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';

export async function getArticles(page = 1, perPage = 12, search: string | null) {
  const token = PUBLIC_STORYBLOK_TOKEN;

  //main endpoint for fetching articles from Storyblok
  const url = new URL('https://api.storyblok.com/v2/cdn/stories');

  // Set query parameters for filtering, sorting, and pagination
  url.searchParams.set('starts_with', 'posts'); // only get from posts folder in Storyblok
  url.searchParams.set('sort_by', 'published_at:desc');
  url.searchParams.set('page', String(page));
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('token', token);

  if (search) {
    url.searchParams.set('search_term', search.trim());
  }

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to fetch articles: ${res.status}`);
    return { stories: [], total: 0 };
  }

  const data = await res.json().catch(() => ({}));
  const total = res.headers.get('total');
  return { stories: data.stories ?? [], total: (total && !isNaN(parseInt(total))) ? parseInt(total) : 0 };
}
