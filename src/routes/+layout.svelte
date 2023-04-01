<script>
  import { page } from "$app/stores";
  import "../app.css";
  import Logo from "../components/Logo.svelte";
	let selected = $page.route.id;
</script>



<div class={`${selected === "/" ? "bg-light-pink" :
		selected === "/movies" ? "bg-movie-blue" :
		selected === "/books" ? "bg-book-green" :
		"bg-videogame-red" 
} h-screen flex flex-col justify-center relative`}>
	<Logo className="absolute top-12 left-12"/>
	<p>Current URL: {$page.route.id}</p>
	<slot />
</div>
