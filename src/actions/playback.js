import TrackPlayer from 'react-native-track-player';
import RenderToast from '../components/RenderToast';
import { Alert } from 'react-native';

export const setCurrentTrack = (currentTrack) => async (dispatch) => {
	try {
		await TrackPlayer.reset();
		await TrackPlayer.add(currentTrack);
		dispatch({ type: 'playback_status', payload: 'playing' });
		TrackPlayer.play();
		dispatch({ type: 'current_track', payload: currentTrack });
	} catch (e) {
		Alert.alert(JSON.stringify(e));
	}
};

export const setPlaybackStatus = (status) => {
	if (status === 'paused') {
		TrackPlayer.pause();
	} else if (status === 'playing') {
		TrackPlayer.play();
	}
	return { type: 'playback_status', payload: status };
};

export const setLoop = (isLoop) => {
	return { type: 'set_loop', payload: isLoop };
};

export const setShuffle = (isShuffle) => {
	return { type: 'set_shuffle', payload: isShuffle };
};
