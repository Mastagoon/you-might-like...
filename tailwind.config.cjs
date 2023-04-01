/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'light-pink': "#843272",
				"light-blue": "#423284",
				"movie-blue": "#325384",
				"videogame-red": "#84324A",
				"book-green": "#328475",
			}
		},
	},
	plugins: [],
}

