import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components/native';
import PlaylistsScreen from '../screens/PlaylistsScreen';
import ArtistsScreen from '../screens/ArtistsScreen';
import AlbumsScreen from '../screens/AlbumsScreen';
import FoldersScreen from '../screens/FoldersScreen';

function TopMaterialTabNav(props) {
	const TopTabs = createMaterialTopTabNavigator();
	const { foreground, background, contrast } = props.theme;
	const tabBarOptions = {
		activeTintColor: contrast,
		upperCaseLabel: false,
		tabStyle: { width: 92 },
		scrollEnabled: true,
		labelStyle: {
			fontFamily: 'ProductSans',
			fontSize: 16,
			textTransform: 'capitalize'
		},
		style: {
			elevation: 0,
			marginLeft: 10,
			backgroundColor: background
		},
		indicatorStyle: {
			width: 60,
			marginLeft: 16,
			backgroundColor: foreground
		},
		allowFontScaling: false
	};

	return (
		<TopTabs.Navigator tabBarOptions={tabBarOptions}>
			<TopTabs.Screen
				name="playlists"
				component={PlaylistsScreen}
				options={{ title: 'Playlists' }}
			/>
			<TopTabs.Screen name="artists" component={ArtistsScreen} options={{ title: 'Artists' }} />
			<TopTabs.Screen name="albums" component={AlbumsScreen} options={{ title: 'Albums' }} />
			<TopTabs.Screen name="folders" component={FoldersScreen} options={{ title: 'Folders' }} />
		</TopTabs.Navigator>
	);
}

export default withTheme(TopMaterialTabNav);
