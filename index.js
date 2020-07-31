import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import bgService from './src/services/RemoteControlListener';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => bgService);
