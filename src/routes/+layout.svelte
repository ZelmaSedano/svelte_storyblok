<script lang="ts">
	import '$lib/api/storyblok';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="bg-slate-900 text-white shadow-md">
	<nav class="max-w-5xl mx-auto px-4 py-4 flex items-center w-full justify-end">
		<h1 class="text-2xl font-bold  mr-auto"><a href={base}>DEMO</a></h1>
		<a href={base + '/about'} class="text-blue-300 hover:text-blue-100 transition p-2 ">About</a>
		<a href={base + '/blog'} class="text-blue-300 hover:text-blue-100 transition p-2  ">Blog</a>
		<a href={base + '/climate'} class="text-blue-300 hover:text-blue-100 transition p-2  ">Climate</a>
	</nav>
</header>

<main class="max-w-5xl mx-auto px-4 py-8">
	{@render children()}
</main>
