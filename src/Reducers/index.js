import { combineReducers } from 'redux';
import media from './MediaReducer';
import footer from './PlayerFooter';
import playback from './PlaybackReducer';
import player from './BlacklistedPlayback';
import playlists from './PlaylistReducer';
import settings from './SettingsReducer';
import lyrics from './LyricsReducer';

export default combineReducers({
	media,
	footer,
	playback,
	player,
	playlists,
	settings,
	lyrics
});
