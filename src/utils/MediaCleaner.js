import { store } from '../store';
// import { PITCH_ALGORITHM_MUSIC } from 'react-native-track-player';

// For testing
// export default function cleanupMedia(media) {
// 	if (!Array.isArray(media) || media.length === 0) return [];
// 	let newMedia = [];
// 	let folderName = '';
// 	let {
// 		settings: { foldersToSkip }
// 	} = store.getState();
// 	let mediaFiles = media.filter(
// 		(val) => !foldersToSkip.includes(getFolder(val.path).toLowerCase())
// 	);
// 	for (let i = 0; i < mediaFiles.length; i++) {
// 		if (mediaFiles[i].title) {
// 			folderName = getFolder(mediaFiles[i].path);
// 			newMedia.push({
// 				id: mediaFiles[i].duration + i,
// 				duration: mediaFiles[i].duration,
// 				url: mediaFiles[i].path,
// 				title: mediaFiles[i].title,
// 				artwork: mediaFiles[i].path || 'cover',
// 				artist: mediaFiles[i].artist === '<unknown>' ? 'unknown' : mediaFiles[i].artist,
// 				album: mediaFiles[i].album === '<unknown>' ? 'unknown' : mediaFiles[i].album,
// 				index: i,
// 				folder: folderName
// 			});
// 		}
// 	}
// 	return newMedia;
// }

export default function cleanupMedia(media) {
	if (!Array.isArray(media) || media.length === 0) return [];
	let newMedia = [];
	let folderName = '';
	let {
		settings: { foldersToSkip }
	} = store.getState();
	let mediaFiles = media.filter(
		(val) => !foldersToSkip.includes(getFolder(val.path).toLowerCase())
	);
	for (let i = 0; i < mediaFiles.length; i++) {
		if (mediaFiles[i].title) {
			folderName = getFolder(mediaFiles[i].path);
			newMedia.push({
				id: mediaFiles[i].duration + i,
				duration: mediaFiles[i].duration,
				url: mediaFiles[i].path,
				title:
					mediaFiles[i].title ||
					mediaFiles[i].fileName.replace(/.mp3|.aac|.wav|.amr|.flac/, ''),
				artwork: mediaFiles[i].cover || null,
				artist: mediaFiles[i].author === '<unknown>' ? 'unknown' : mediaFiles[i].author,
				album: mediaFiles[i].album === '<unknown>' ? 'unknown' : mediaFiles[i].album,
				index: i,
				folder: folderName
				// pitchAlgorithm: PITCH_ALGORITHM_MUSIC
			});
		}
	}
	return newMedia;
}

function getFolder(path) {
	let dirArr = path.split('/');
	return dirArr[dirArr.length - 2];
}
