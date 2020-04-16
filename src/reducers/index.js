import { combineReducers } from 'redux';
import media from './media';
import footer from './playerFooter';
import playback from './playback';
import player from './blacklistedPlayback';
import playlists from './playlist';
import settings from './settings';
import lyrics from './lyrics';

export default combineReducers({
	media,
	footer,
	playback,
	player,
	playlists,
	settings,
	lyrics
});
