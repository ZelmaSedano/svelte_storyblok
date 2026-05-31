<script lang="ts">
  import ArticlesList from '$lib/components/articles/ArticlesList.svelte';
  const { data } = $props();
  console.log('Page data:', data);
</script>

<section class="space-y-6">
    <form>
        <p class="text-slate-600">Browse the latest posts and search by keyword.</p>

        <input type="text" name="q" placeholder="Search posts..." value={data.search} />
        <button type="submit">search</button>
    </form>
  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
    <p class="text-slate-700 font-semibold">{data.total} article{data.total === 1 ? '' : 's'} found</p>
    <p class="text-slate-500 text-sm">Page {data.page} · {data.perPage} per page</p>
  </div>

  <ArticlesList stories={data.articles} />
</section>
