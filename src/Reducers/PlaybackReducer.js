const INITIAL_STATE = {
	currentTrack: {
		id: '000',
		title: 'SoundSpice',
		artist: 'Faisal Arshed',
		duration: 0,
		artwork: 'cover'
	},
	playbackMode: 'repeat_all'
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'current_track':
			return { ...state, currentTrack: action.payload };
		case 'toggle_playback_mode':
			return { ...state, playbackMode: action.payload };
		default:
			return state;
	}
}
