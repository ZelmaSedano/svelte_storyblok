<script lang="ts">
  const { stories = [] } = $props();
</script>

<section>
  {#if stories.length}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each stories as article}
        <article class="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
          <a href={`/blog/${article.slug}`} class="block h-full p-6 hover:bg-slate-50 transition">
            <h2 class="text-xl font-bold text-slate-900 mb-2">{article.content?.title ?? article.name}</h2>
            {#if article.content?.intro}
              <p class="text-slate-600 text-sm line-clamp-3">{article.content.intro}</p>
            {/if}
          </a>
        </article>
      {/each}
    </div>
  {:else}
    <p class="text-center text-slate-500 py-12">No articles found.</p>
  {/if}
</section>
