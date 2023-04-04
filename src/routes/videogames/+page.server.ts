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
		const gameList: string[] = []
		for (const entry of data.entries()) {
			if (typeof entry[1] === 'string')
				gameList.push(entry[1])
		}
		const validGames = await validateGames(gameList)
		if (validGames.filter(Boolean).length < 3)
			return { error: "You must enter at least three valid videogame titles." }
		try {
			const completion = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: generatePrompt(validGames),
				max_tokens: 150,
				temperature: 0.8,
			});
			return { result: completion.data.choices[0].text }
		} catch (error) {
			return { error }
		}
	}
};

const generatePrompt = (gameList: string[]) => {
	return `My favorite videogames are: ${gameList.join(', ')}. Suggest three more games I might like.

Format your response as a list of comma separated values. For example:
The Legend of Zelda: Ocarina of Time, The Legend of Zelda: Majora's Mask, The Legend of Zelda: Breath of the Wild
	`;
}

const validateGames = async (gameList: string[]) => {
	return gameList
}
