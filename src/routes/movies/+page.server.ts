import type { Actions } from "@sveltejs/kit";
import { OPENAI_API_KEY, MOVIE_DB_API_KEY } from "$env/static/private"
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const actions: Actions = {
	default: async (event) => {
		// TODO log the user in
		if (!configuration.apiKey)
			return {}
		const data = await event.request.formData()
		const movieList: string[] = []
		for (const entry of data.entries()) {
			if (typeof entry[1] === 'string')
				movieList.push(entry[1])
		}
		const validMovies = (await validateMovies(movieList)).filter(m => m)
		console.log(validMovies)
		if (validMovies.length < 3)
			return { error: "You must enter at least three valid movie titles." }
		try {
			const completion = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: generatePrompt(validMovies),
				max_tokens: 150,
				temperature: 0.8,
			});
			return { result: completion.data.choices[0].text }
		} catch (error) {
			return { error }
		}
	}
};

const generatePrompt = (movieList: string[]) => {
	return `My favorite movies are: ${movieList.join(', ')}. Suggest three more movies I might like.

Format your response as a list of movie titles, separated by commas. For example:
The Matrix, The Dark Knight, Inception
	`;
}

const validateMovies = async (movieList: string[]) => {
	const result = Promise.all(movieList.map((movie) => fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_API_KEY}&query=${movie}`).then(result => result.json()).then(json => json.total_results > 0 ? movie : '')))
	return await result
}
