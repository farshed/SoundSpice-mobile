import { getLyrics } from 'genius-lyrics-api';
import { geniusApiKey } from '../constants/keys';

export const fetchLyrics = ({ title, artist }) => async (dispatch) => {
	const config = { title, artist, optimizeQuery: true, apiKey: geniusApiKey };
	try {
		let lyrics = await getLyrics(config);
		if (!lyrics) return dispatch({ type: 'get_lyrics_fail' });
		dispatch({ type: 'get_lyrics_success', payload: { title, artist, lyrics } });
	} catch (e) {
		dispatch({ type: 'get_lyrics_fail' });
	}
};

export const resetLyrics = () => {
	return { type: 'reset_lyrics' };
};
