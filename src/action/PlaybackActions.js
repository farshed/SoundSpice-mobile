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

export const togglePlaybackMode = (newMode) => {
	RenderToast(newMode === 'repeat_all' ? 'Loop all tracks' : 'Loop this track');
	return { type: 'toggle_playback_mode', payload: newMode };
};
