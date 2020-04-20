import TrackPlayer from 'react-native-track-player';
import errorReporter from '../utils/ErrorReporter';

export const setCurrentTrack = (currentTrack) => async (dispatch) => {
	try {
		await TrackPlayer.reset();
		await TrackPlayer.add(currentTrack);
		dispatch({ type: 'current_track', payload: currentTrack });
		TrackPlayer.play();
		dispatch({ type: 'set_playback', payload: true });
	} catch (e) {
		errorReporter(e);
	}
};

export const setPlayback = (isPlaying) => {
	isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
	return { type: 'set_playback', payload: isPlaying };
};

export const setLoop = (isLoop) => {
	return { type: 'set_loop', payload: isLoop };
};

export const setShuffle = (isShuffle) => {
	return { type: 'set_shuffle', payload: isShuffle };
};
