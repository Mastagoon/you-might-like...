<script>
	import { enhance } from '$app/forms';
  import { slide} from "svelte/transition";
  import { onMount } from 'svelte';

  let ready = false;
  onMount(() => ready = true);

	export let form;
</script>

{#if ready}
	<div in:slide={{duration: 500}} class="mx-auto gap-5 flex flex-col">
	<h1 class="text-3xl text-white font-bold text-center">List 3 - 5 of your favorite movies</h1>
		<form method="post" class="flex flex-col gap-5 items-center my-2 text-white" use:enhance={() => {
    return async ({ update }) => {
      await update({ reset: false });
    };
  }}>
			<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Movie Name" name="movie1">
			<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Movie Name" name="movie2">
			<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Movie Name" name="movie3">
			<input type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="optional" name="movie4">
			<input type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="optional" name="movie5">
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
