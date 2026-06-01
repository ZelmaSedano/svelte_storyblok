<script>
    // SvelteKit pages receive data as a prop
    // @ts-ignore
    import NasaPrecipitationWidget from '$lib/components/climatewidgets/NasaPrecipitationWidget.svelte';
</script>

<section class="space-y-6">
    <NasaPrecipitationWidget title="Nasa Precipitation Data of Southern Norway Region" style="backdrop-blur-md bg-white/10 rounded-md p-2" />
</section>
