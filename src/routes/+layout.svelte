<script lang="ts">
	import '$lib/api/storyblok';
	import '../app.css';
	import '$lib/assets/css/layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import RainCloudIcon from '$lib/components/icons/raincloudicon.svelte';

	import type { LayoutData } from './$types';
	let { children, data } = $props();
	const { backgroundAsset } = data as LayoutData;
	console.log('Layout config:', backgroundAsset);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="100sv text-white">

{#if backgroundAsset?.[0]?.url}
  <video
    class="-z-100 fixed inset-0 -z-10 w-full h-full object-cover"
    src={backgroundAsset[0].url}
    autoplay
    muted
    loop
    playsinline
  ></video>
{/if}

<header class="fixed w-full backdrop-blur-md bg-white/10 shadow-lg z-50">
	<nav class="max-w-5xl mx-auto px-4 py-4 flex items-center w-full justify-end">
		<h1 class="text-2xl font-bold  mr-auto">
			<a href="/">
				<RainCloudIcon size={32} color="white" className="inline-block mr-2 -mb-1" />
			</a>
		</h1>
		<a href="/about" class="text-blue-300 hover:text-blue-100 transition p-2 ">About</a>
		<a href="/blog" class="text-blue-300 hover:text-blue-100 transition p-2  ">Blog</a>
		<a href="/climate" class="text-blue-300 hover:text-blue-100 transition p-2  ">Climate</a>
	</nav>
</header>

<main class="max-w-5xl mx-auto px-4 py-8 pt-32 ">
	{@render children()}
</main>
</div>
