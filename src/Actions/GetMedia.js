import { Alert } from 'react-native';
import { RNAndroidAudioStore } from 'react-native-get-music-files';
import RNFetchBlob from 'rn-fetch-blob';
import { getStoragePermission, checkStoragePermissions } from '../utils/Permissions';
import cleanMedia from '../utils/MediaCleaner';
import { store } from '../store';

// const mediaConfig = {
// 	blured: false,
// 	artist: true,
// 	duration: true,
// 	title: true,
// 	cover: false,
// 	album: true
// };

// const coverConfig = {
// 	cover: true,
// 	coverFolder: RNFetchBlob.fs.dirs.DocumentDir + '/.soundspice'
// };
// // add coverSize property

// async function getAssets(master) {
// 	try {
// 		let assets = await RNAndroidAudioStore.getAll(
// 			master ? { ...mediaConfig, ...coverConfig } : mediaConfig
// 		);
// 		return cleanMedia(assets);
// 	} catch (e) {
// 		Alert.alert('An error ocurred');
// 	}
// }

// async function getCovers(media) {
// 	let mediaArr = [];
// 	const batchSize = 50;
// 	for (let i = 0; i < media.length; i += batchSize) {
// 		mediaArr.push(media.slice(i, i + batchSize));
// 	}
// 	try {
// 		for (let k = 0; k < mediaArr.length; k++) {
// 			let batch = await Promise.all(
// 				mediaArr[k].map(async (track) => {
// 					let [{ cover }] = await RNAndroidAudioStore.getSongByPath({
// 						songUri: track.url,
// 						...coverConfig
// 					});
// 					return { ...track, artwork: cover || 'cover' };
// 				})
// 			);
// 			store.dispatch({ type: 'get_covers_success', payload: { batch, batchCount: k } });
// 		}
// 	} catch (e) {
// 		return Alert.alert('An error ocurred');
// 	}
// }

// export const getMedia = (master = false) => async (dispatch) => {
// 	let granted = await checkStoragePermissions();
// 	if (!granted) await getStoragePermission();
// 	let media = await getAssets(master);
// 	dispatch({ type: 'get_media_success', payload: media });
// 	if (!master) await getCovers(media);
// };

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
		Alert.alert('An error ocurred');
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
