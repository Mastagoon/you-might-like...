<script>
  import { page } from "$app/stores";
  import "../app.css";
  import Logo from "../components/Logo.svelte";
	$: selected = $page.route.id;
</script>

<div class={`${selected === "/" ? "bg-light-pink" :
		selected === "/movies" ? "bg-movie-blue" :
		selected === "/books" ? "bg-book-green" :
		"bg-videogame-red" 
} transition-all duration-1000 h-screen flex flex-col justify-center relative`}>
	<a href="/"><Logo className="absolute left-1/2 sm:translate-x-0 -translate-x-1/2 top-12 sm:left-12"/></a>
	<slot />
</div>
