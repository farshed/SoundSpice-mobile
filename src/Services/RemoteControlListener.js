import TrackPlayer from 'react-native-track-player';
import { store } from '../store';

async function backgroundPlayback(track) {
	await TrackPlayer.reset();
	await TrackPlayer.add(track);
	store.dispatch({ type: 'playback_status', payload: 'playing' });
	TrackPlayer.play();
	store.dispatch({ type: 'current_track', payload: track });
}

module.exports = async function () {
	TrackPlayer.addEventListener('remote-play', () => {
		TrackPlayer.play();
		store.dispatch({ type: 'playback_status', payload: 'playing' });
	});

	TrackPlayer.addEventListener('remote-pause', () => {
		TrackPlayer.pause();
		store.dispatch({ type: 'playback_status', payload: 'paused' });
	});

	TrackPlayer.addEventListener('remote-next', () => {
		let { playback, media } = store.getState();
		let { currentTrack } = playback;
		let { mediaFiles } = media;
		backgroundPlayback(
			currentTrack.index === mediaFiles.length - 1
				? mediaFiles[0]
				: mediaFiles[currentTrack.index + 1]
		);
	});

	TrackPlayer.addEventListener('remote-previous', () => {
		let { playback, media } = store.getState();
		let { currentTrack } = playback;
		let { mediaFiles } = media;
		backgroundPlayback(
			currentTrack.index === 0
				? mediaFiles[mediaFiles.length - 1]
				: mediaFiles[currentTrack.index - 1]
		);
	});

	TrackPlayer.addEventListener('playback-queue-ended', ({ position }) => {
		let { playback, media } = store.getState();
		let { currentTrack, playbackMode } = playback;
		let { mediaFiles } = media;
		if (position > 0) {
			if (playbackMode === 'repeat_one') {
				backgroundPlayback(currentTrack);
			} else if (playbackMode === 'repeat_all') {
				backgroundPlayback(
					currentTrack.index === mediaFiles.length - 1
						? mediaFiles[0]
						: mediaFiles[currentTrack.index + 1]
				);
			}
		}
	});

	TrackPlayer.addEventListener('remote-stop', () => {
		TrackPlayer.destroy();
	});
};
