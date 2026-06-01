<script lang="ts">
  import ArticlesList from '$lib/components/articles/ArticlesList.svelte';
  const { data } = $props();
  console.log('Page data:', data);
</script>

<section class="space-y-6 backdrop-blur-md bg-white/10 shadow-lg p-4 rounded-lg">
    <form>
        <p class="text-white-600">Browse the latest posts and search by keyword.</p>

        <input class="backdrop-blur-md bg-white/10 p-2 rounded-lg" type="text" name="q" placeholder="Search posts..." value={data.search} />
        <button type="submit">search</button>
    </form>
  <div class="bg-slate-50 p-4 rounded-lg text-white backdrop-blur-md bg-white/10">
    <p class=" font-semibold">{data.total} article{data.total === 1 ? '' : 's'} found</p>
    <p class=" text-sm">Page {data.page} · {data.perPage} per page</p>
  </div>

  <ArticlesList stories={data.articles} />
</section>
