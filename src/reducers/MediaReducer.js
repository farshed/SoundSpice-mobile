const INITIAL_STATE = { mediaFiles: [], mediaLoaded: false };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'get_media_success':
			// 	{
			// 	let media = [...state.mediaFiles];
			// 	let mediaWithLyrics = action.payload.map((song) => {
			// 		let i = media.findIndex(
			// 			(item) => item.title === song.title && item.artist === song.artist
			// 		);
			// 		if (i === -1 || !media[i].lyrics) return song;
			// 		return { ...song, lyrics: media[i].lyrics };
			// 	});
			// 	return { ...state, mediaLoaded: true, mediaFiles: mediaWithLyrics };
			// }
			return { mediaLoaded: true, mediaFiles: action.payload };
		// case 'get_covers_success': {
		// 	let mediaBatch = [...action.payload.batch];
		// 	let updatedMedia = [...state.mediaFiles];
		// 	let { batchCount } = action.payload;
		// 	let batchSize = 50;
		// 	updatedMedia.splice(batchCount * batchSize, batchSize, ...mediaBatch);
		// 	return { ...state, mediaFiles: updatedMedia };
		// }
		case 'get_lyrics_success': {
			let newMedia = [...state.mediaFiles];
			newMedia[action.payload.index].lyrics = action.payload.lyrics;
			return { ...state, mediaFiles: newMedia };
		}
		case 'rename_track': {
			let mediaArr = [...state.mediaFiles];
			let index = mediaArr.findIndex((i) => i.id === action.payload.id);
			if (index !== -1) mediaArr[index] = action.payload;
			return { ...state, mediaFiles: mediaArr };
		}
		case 'delete_track': {
			let mediaArray = [...state.mediaFiles];
			let i = mediaArray.findIndex((item) => item.id === action.payload.id);
			if (i !== -1) {
				mediaArray.splice(i, 1);
				mediaArray = mediaArray.map((val, i) => {
					return { ...val, index: i };
				});
			}
			return { ...state, mediaFiles: mediaArray };
		}
		default:
			return state;
	}
}
