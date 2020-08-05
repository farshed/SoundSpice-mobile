import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTheme } from 'styled-components/native';
import SearchScreen from '../screens/SearchScreen';
import TracksScreen from '../screens/TracksScreen';
import Radio from '../screens/Radio';
import LibraryStack from './LibraryStack';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from '../components/Icon';

function BottomTabNav(props) {
	const BottomTabs = createBottomTabNavigator();
	const { foreground, contrastTrans, elevatedBG } = props.theme;
	const tabBarOptions = {
		showLabel: false,
		activeTintColor: foreground,
		inactiveTintColor: `${contrastTrans}0.7)`,
		activeBackgroundColor: elevatedBG,
		inactiveBackgroundColor: elevatedBG,
		style: {
			borderTopWidth: 0
		},
		allowFontScaling: false
	};

	function iconProvider(route) {
		return ({ focused, color }) => {
			switch (route) {
				case 'Tracks':
					return <Icon name="music" type="feather" size={focused ? 26 : 23} color={color} />;
				case 'Search':
					return <Icon name="search" type="feather" size={focused ? 26 : 23} color={color} />;
				case 'Radio':
					return <Icon name="radio" type="feather" size={focused ? 28 : 25} color={color} />;
				case 'Library':
					return <Icon name="archive" type="feather" size={focused ? 26 : 23} color={color} />;
				case 'Settings':
					return (
						<Icon name="settings" type="feather" size={focused ? 26 : 23} color={color} />
					);
			}
		};
	}

	return (
		<BottomTabs.Navigator
			initialRouteName="Tracks"
			backBehavior="initialRoute"
			tabBarOptions={tabBarOptions}>
			<BottomTabs.Screen
				name="Tracks"
				component={TracksScreen}
				options={{
					tabBarIcon: iconProvider('Tracks')
				}}
			/>
			<BottomTabs.Screen
				name="Search"
				component={SearchScreen}
				options={{ tabBarIcon: iconProvider('Search') }}
			/>
			<BottomTabs.Screen
				name="Radio"
				component={Radio}
				options={{ tabBarIcon: iconProvider('Radio') }}
			/>
			<BottomTabs.Screen
				name="Library"
				component={LibraryStack}
				options={{ tabBarIcon: iconProvider('Library') }}
			/>
			<BottomTabs.Screen
				name="Settings"
				component={SettingsScreen}
				options={{ tabBarIcon: iconProvider('Settings') }}
			/>
		</BottomTabs.Navigator>
	);
}

export default withTheme(BottomTabNav);
