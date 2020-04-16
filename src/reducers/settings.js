const INITIAL_STATE = {
	foldersToSkip: ['whatsapp audio'],
	theme: 'dark',
	topTabs: ['playlists', 'artists', 'albums', 'folders']
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'add_folders_to_skip':
			return { ...state, foldersToSkip: action.payload };
		case 'set_theme':
			return { ...state, theme: action.payload };
		case 'set_top_tabs':
			return { ...state, topTabs: action.payload };
		default:
			return state;
	}
}
