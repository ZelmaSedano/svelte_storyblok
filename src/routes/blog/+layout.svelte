<script lang="ts">
  let { children } = $props();
</script>

<section class="space-y-6">
  <header class="border-b border-white/200 pb-4">
    <h1 class="text-4xl font-bold text-white-900 mb-2">Blog</h1>
  </header>
  {@render children()}
</section>
