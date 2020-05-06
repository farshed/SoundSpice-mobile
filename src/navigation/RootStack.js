import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MainStack from './MainStack';
import PlayerScreen from '../screens/PlayerScreen';
import AddToPlaylist from '../screens/AddToPlayList';
import LyricsScreen from '../screens/LyricsScreen';

const screenOptions = {
	...TransitionPresets.ModalPresentationIOS,
	gestureEnabled: true,
	cardOverlayEnabled: true
};

function RootStack() {
	const Modal = createStackNavigator();
	return (
		<Modal.Navigator
			mode="modal"
			headerMode="none"
			initialRouteName="main"
			screenOptions={screenOptions}>
			<Modal.Screen name="main" component={MainStack} />
			<Modal.Screen name="player" component={PlayerScreen} />
			<Modal.Screen
				name="addToPlaylist"
				component={AddToPlaylist}
				options={{ title: 'Add to playlist' }}
			/>
			<Modal.Screen name="lyrics" component={LyricsScreen} />
		</Modal.Navigator>
	);
}

export default RootStack;
