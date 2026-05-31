// Using @storyblok/svelte in SvelteKit
// typings for article content and story structuree.g. for blog posts
import type { RichTextDocument } from '$lib/typings/richtext';


export type Article = {
  name: string;
  slug: string;
  title: string;
  date: Date | string;
  doc: RichTextDocument | null; // raw content that needs to be typed later
  image?: string; // optional simplified image
  published_at: string; // ISO date string for sorting and display
  updated_at: string; // ISO date string for sorting and display
};

