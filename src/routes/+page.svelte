<script>
	import { quintInOut } from 'svelte/easing';
  import { slide, fade} from "svelte/transition";
  import { onMount } from 'svelte';

  let ready = false;
  onMount(() => ready = true);
</script>

{#if ready}
		<div class="container mx-auto gap-12 flex flex-col items-center text-center px-2">
				<h1 class="text-3xl text-white font-bold" in:fade={{duration: 500}}><span class="sm:text-8xl text-4xl" id="logo-font">You might like...</span> is an AI-Powered taste suggesting application</h1>
				<div class="gap-12 flex flex-col items-center" in:slide={{duration: 500, easing: quintInOut, delay: 900 }}>
					<h1  class="text-5xl text-white font-bold">What are you looking for today?</h1>
					<div class="flex flex-row gap-5 justify-center">
						<a href="/movies" class="bg-white px-6 hover:opacity-80 transition-all py-2  rounded-sm">Movies</a>
						<a href="/books" class="bg-white px-6 hover:opacity-80 transition-all py-2  rounded-sm">Books</a>
						<a href="/videogames" class="bg-white px-6 hover:opacity-80 transition-all py-2  rounded-sm">Videogames</a>
					</div>
				</div>
		</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inspiration&display=swap');

	@keyframes logo {
		0% {
			opacity: 0.5;
			transform: scale(0.5);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	#logo-font {
		font-family: 'Inspiration', cursive;
		animation: logo 2s infinite alternate;
	}

</style> 

