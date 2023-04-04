<script>
  import { slide} from "svelte/transition";
  import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	export let form

  let ready = false;
  onMount(() => ready = true);
</script>

{#if ready}
	<div in:slide={{duration:500}} class="mx-auto text-center gap-5 flex flex-col">
		<h1 class="text-3xl text-white font-bold">List 3 - 5 of your favorite books</h1>
			<form method="POST" class="flex flex-col gap-5 items-center my-2 text-white" use:enhance={() => {
				return async ({ update }) => {
					await update({ reset: false });
				};
			}}>
				<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Book Name" name="book1">
				<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Book Name" name="book2">
				<input required type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="Book Name" name="book3">
				<input type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="optional" name="book4">
				<input type="text" class="bg-transparent border py-2 rounded-sm px-2 outline-blue" placeholder="optional" name="book5">
				<button type="submit" class="bg-white px-6 hover:opacity-80 text-black transition-all py-2  rounded-sm">Go</button>
			</form>

{#if form?.error}
	<p in:slide={{duration:500}} class="text-red-500 text-center">{form?.error}</p>
{/if}

{#if form?.result}
		<p in:slide={{duration:500}} class="text-center text-white">Based on your preferences, you might enjoy:</p>
		<p in:slide={{duration:500}} class="text-green-500 text-center">{form?.result}</p>
{/if}
	</div>
{/if}
