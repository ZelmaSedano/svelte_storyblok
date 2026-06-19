<script lang="ts">
  // syntax version 4
  export let stories: any[] = [];
</script>

<section>
  {#if stories.length}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each stories as article}
        <article
          class="backdrop-blur-md bg-white/10 shadow-lg rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
        >
          <a
            href={`/blog/${article.slug}`}
            class="block h-full p-6 hover:bg-white/20 transition"
          >
            <h2 class="text-xl font-bold text-white-900 mb-2">
              {article.content?.title ?? article.name}
            </h2>
            {#if article.content?.intro}
              <p class="text-white-600 text-sm line-clamp-3">
                {article.content.intro}
              </p>
            {/if}
          </a>
        </article>
      {/each}
    </div>
  {:else}
    <p class="text-center text-white-500 py-12">No articles found.</p>
  {/if}
</section>
