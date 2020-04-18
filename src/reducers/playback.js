const INITIAL_STATE = {
	currentTrack: {
		id: '000',
		title: 'SoundSpice',
		artist: 'Faisal Arshed',
		duration: 0,
		artwork: 'cover'
	},
	loop: false,
	shuffle: false
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'current_track':
			return { ...state, currentTrack: action.payload };
		case 'set_loop':
			return { ...state, loop: action.payload };
		case 'set_shuffle':
			return { ...state, shuffle: action.payload };
		default:
			return state;
	}
}
