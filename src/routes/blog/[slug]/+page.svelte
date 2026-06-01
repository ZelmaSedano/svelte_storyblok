<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  import RichText from "$lib/components/RichText.svelte";
  let { data } = $props();
  console.log("Content in [slug]/+page.svelte:", data);
  // singular article page, showing the title and content of a single article
</script>

<section class="space-y-4 rounded-3xl bg-white/10
         backdrop-blur-md shadow-xl px-6 py-5
         hover:bg-white/15 hover:border-white/30 transition"
>
  <h1 class="text-3xl font-bold tracking-tight drop-shadow-sm">
    {data.title}
  </h1>

  <div class="text-blue-50/90 text-sm leading-relaxed">
    <RichText content={data.doc} />
  </div>
</section>
