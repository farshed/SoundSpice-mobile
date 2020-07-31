const INITIAL_STATE = { isPlaying: false };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'set_playback':
			return { ...state, isPlaying: action.payload };
		default:
			return state;
	}
}
