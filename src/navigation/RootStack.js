import React from 'react';
import { withTheme } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNav from './BottomTabNav';
import PlayerScreen from '../screens/PlayerScreen';
import LyricsScreen from '../screens/LyricsScreen';
import AddToPlaylist from '../screens/AddToPlayList';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ShowPlaylistScreen from '../screens/ShowPlaylistScreen';
import ShowContentScreen from '../screens/ShowContentScreen';
import TabOrder from '../screens/TabOrder';
import Icon from '../components/Icon';

function RootStack(props) {
	const Stack = createStackNavigator();
	const { background, contrast } = props.theme;
	const screenOptions = {
		headerStyle: {
			elevation: 0,
			backgroundColor: background
		},
		headerTitleStyle: {
			fontFamily: 'Circular',
			fontWeight: '400',
			fontSize: 18,
			color: contrast,
			marginLeft: 30,
			marginRight: 30
		},
		headerTitleAlign: 'center',
		headerBackImage: () => <Icon name="chevron-left" type="feather" color={contrast} size={26} />
	};
	const noHeader = { headerShown: false };
	const headerTitle = ({ route }) => ({ title: route.params.title });
	return (
		<Stack.Navigator
			initialRouteName="bottom-tab"
			headerMode="screen"
			screenOptions={screenOptions}>
			<Stack.Screen name="bottom-tab" component={BottomTabNav} options={noHeader} />
			<Stack.Screen name="player" component={PlayerScreen} options={noHeader} />
			<Stack.Screen name="lyrics" component={LyricsScreen} options={noHeader} />
			<Stack.Screen name="settings" component={SettingsScreen} options={{ title: 'Settings' }} />
			<Stack.Screen
				name="addToPlaylist"
				component={AddToPlaylist}
				options={{ title: 'Add to playlist' }}
			/>
			<Stack.Screen name="playlist" component={ShowPlaylistScreen} options={headerTitle} />
			<Stack.Screen name="content" component={ShowContentScreen} options={headerTitle} />
			<Stack.Screen name="tab-order" component={TabOrder} options={noHeader} />
			<Stack.Screen name="about" component={AboutScreen} options={{ title: 'About' }} />
		</Stack.Navigator>
	);
}

export default withTheme(RootStack);
