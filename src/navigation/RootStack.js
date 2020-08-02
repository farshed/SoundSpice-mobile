import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import BottomTabNav from './BottomTabNav';
import PlayerScreen from '../screens/PlayerScreen';
import AddToPlaylist from '../screens/AddToPlayList';
import LyricsScreen from '../screens/LyricsScreen';

const screenOptions = {
	...TransitionPresets.ModalPresentationIOS,
	gestureEnabled: true,
	cardOverlayEnabled: true
};

const noHeader = { headerShown: false };

function RootStack() {
	const Modal = createStackNavigator();
	return (
		<Modal.Navigator mode="modal" headerMode="none" screenOptions={screenOptions}>
			<Modal.Screen name="bottom-tab" component={BottomTabNav} options={noHeader} />
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
