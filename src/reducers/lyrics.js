const INITIAL_STATE = { currentLyrics: '', error: false };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'get_lyrics_success':
			return { currentLyrics: action.payload, error: false };
		case 'get_lyrics_fail':
			return { currentLyrics: '', error: true };
		case 'reset_lyrics':
			return { currentLyrics: '', error: false };
		default:
			return state;
	}
}
