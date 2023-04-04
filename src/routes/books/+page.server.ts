import type { Actions } from "@sveltejs/kit";
import { OPENAI_API_KEY } from "$env/static/private"
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
		const bookList: string[] = []
		for (const entry of data.entries()) {
			if (typeof entry[1] === 'string')
				bookList.push(entry[1])
		}
		const validBooks = await validateBooks(bookList)
		if (validBooks.filter(Boolean).length < 3)
			return { error: "You must enter at least three valid movie titles." }
		try {
			const completion = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: generatePrompt(validBooks),
				max_tokens: 150,
				temperature: 0.8,
			});
			return { result: completion.data.choices[0].text }
		} catch (error) {
			return { error }
		}
	}
};

const generatePrompt = (bookList: string[]) => {
	return `My favorite books are: ${bookList.join(', ')}. Suggest three more books I might like.

Format your response as a list of movie titles and authors separated by comma. For example:
The Lord of the Rings by J.R.R. Tolkien,The Hitchhiker's Guide to the Galaxy by Douglas Adams,The Hobbit by J.R.R. Tolkien
	`;
}

const validateBooks = async (bookList: string[]) => {
	// const result = Promise.all(bookList.map((movie) => fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_API_KEY}&query=${movie}`).then(result => result.json()).then(json => json.total_results > 0 ? movie : null)))
	return bookList
}
