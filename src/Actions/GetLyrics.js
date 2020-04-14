import { getLyrics } from 'genius-lyrics-api';
import { geniusApiKey } from '../constants/keys';

export const fetchLyrics = ({ title, artist, index }) => async (dispatch) => {
	const config = { title, artist, optimizeQuery: true, apiKey: geniusApiKey };
	try {
		const lyrics = await getLyrics(config);
		dispatch({ type: 'get_lyrics_success', payload: { index, lyrics } });
	} catch (e) {
		dispatch({ type: 'get_lyrics_fail' });
	}
};

export const resetLyrics = () => {
	return { type: 'reset_lyrics' };
};
