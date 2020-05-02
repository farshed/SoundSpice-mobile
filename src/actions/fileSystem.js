import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RenderToast from '../components/RenderToast';

const mime = 'audio/mpeg';

export const deleteTrack = (track) => async (dispatch) => {
	try {
		await RNFetchBlob.fs.unlink(track.url);
		await RNFetchBlob.fs.scanFile([{ path: track.url, mime }]);
		dispatch({ type: 'delete_track', payload: track });
	} catch (e) {
		Alert.alert(JSON.stringify(e));
	}
};

export const renameTrack = (track, newName) => async (dispatch) => {
	try {
		let pathArr = track.url.split('/');
		let extension = pathArr[pathArr.length - 1].split('.');
		extension = extension[extension.length - 1];
		pathArr[pathArr.length - 1] = `${newName}.${extension}`;
		let newPath = pathArr.join('/');
		let exists = await RNFetchBlob.fs.exists(newPath);
		if (exists) return RenderToast('A file with the same name already exists');
		await RNFetchBlob.fs.mv(track.url, newPath);
		await RNFetchBlob.fs.scanFile([{ path: newPath, mime }]);
		await RNFetchBlob.fs.scanFile([{ path: track.url, mime }]);
		dispatch({ type: 'rename_track', payload: { ...track, title: newName, url: newPath } });
	} catch (e) {
		Alert.alert(JSON.stringify(e));
	}
};
