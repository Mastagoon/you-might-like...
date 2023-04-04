<script>
  import { slide} from "svelte/transition";
  import { onMount } from 'svelte';
  import { enhance } from "$app/forms";

	export let form

  let ready = false;
  onMount(() => ready = true);
</script>

{#if ready}
<div class="mx-auto flex flex-col gap-5 text-center" in:slide={{duration: 1000}}>
	<h1 class="text-3xl text-white font-bold">List 3 - 5 of your favorite Videogames</h1>
		<form class="flex flex-col gap-5 items-center my-2 text-white"
			method="post" use:enhance={() => {
					return async ({ update }) => {
						await update({ reset: false });
					};
				}}
			>
			<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Game Name" name="game1">
			<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Game Name" name="game2">
			<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Game Name" name="game3">
			<input type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="optional">
			<input type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="optional">
			<button type="submit" class="bg-white px-6 hover:opacity-80 text-black transition-all py-2  rounded-sm">Go</button>
		</form>

{#if form?.error}
	<p class="text-red-500 text-center">{form?.error}</p>
{/if}

{#if form?.result}
		<p class="text-center text-white">Based on your preferences, you might enjoy:</p>
	<p class="text-green-500 text-center">{form?.result}</p>
{/if}
</div>
{/if}
