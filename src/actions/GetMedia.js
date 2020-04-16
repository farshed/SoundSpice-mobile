import { RNAndroidAudioStore } from 'react-native-get-music-files';
import RNFetchBlob from 'rn-fetch-blob';
import { getStoragePermission, checkStoragePermissions } from '../utils/Permissions';
import cleanMedia from '../utils/MediaCleaner';
import { store } from '../store';
import errorReporter from '../utils/ErrorReporter';

// import MusicFiles from 'react-native-get-music-files-v3dev-test';

// const options = {
// 	cover: false,
// 	batchSize: 0,
// 	batchNumber: 0,
// 	sortBy: 'TITLE',
// 	sortOrder: 'ASC'
// };

// export const getMedia = () => async (dispatch) => {
// 	let granted = await checkStoragePermissions();
// 	if (!granted) await getStoragePermission();
// 	let { results } = await MusicFiles.getAll(options);
// 	let media = cleanMedia(results);
// 	dispatch({ type: 'get_media_success', payload: media });
// };

const options = {
	title: true,
	artist: true,
	album: true,
	duration: true,
	cover: false,
	blured: false
};

export const getMedia = () => async (dispatch) => {
	try {
		let granted = await checkStoragePermissions();
		if (!granted) await getStoragePermission();
		let { media } = store.getState();
		if (media.mediaLoaded) {
			let media = await getMediaWithCovers();
			dispatch({ type: 'get_media_success', payload: media });
		} else {
			let results = await RNAndroidAudioStore.getAll(options);
			let media = cleanMedia(results);
			dispatch({ type: 'get_media_success', payload: media });
			let mediaWithCovers = await getMediaWithCovers();
			dispatch({ type: 'get_media_success', payload: mediaWithCovers });
		}
	} catch (e) {
		errorReporter(e);
	}
};

const getMediaWithCovers = async () => {
	const coverFolder = RNFetchBlob.fs.dirs.DocumentDir + '/.soundspice';
	let results = await RNAndroidAudioStore.getAll({
		...options,
		cover: true,
		coverFolder
	});
	return cleanMedia(results);
};
