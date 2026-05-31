<script lang="ts">
  let { children } = $props();
</script>

<section class="space-y-6">
  <header class="border-b border-slate-200 pb-4">
    <h1 class="text-4xl font-bold text-slate-900 mb-2">Blog</h1>
  </header>
  {@render children()}
</section>
