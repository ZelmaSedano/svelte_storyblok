<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  import RichText from '$lib/components/RichText.svelte';
  let { data } = $props();
  console.log('Content in [slug]/+page.svelte:', data);
  // singular article page, showing the title and content of a single article
</script>

<section class="space-y-6">
  <h1 class="text-3xl font-bold">{data.title}</h1>
  <RichText content={data.doc} />
</section>