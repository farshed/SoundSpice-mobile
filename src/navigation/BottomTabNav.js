import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTheme } from 'styled-components/native';
import SearchScreen from '../screens/SearchScreen';
import TracksScreen from '../screens/TracksScreen';
import TopMaterialTabNav from './TopMaterialTabNav';
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
				case 'Library':
					return <Icon name="archive" type="feather" size={focused ? 26 : 23} color={color} />;
			}
		};
	}

	return (
		<BottomTabs.Navigator
			initialRouteName="Tracks"
			backBehavior="initialRoute"
			tabBarOptions={tabBarOptions}
			lazy={false}>
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
				name="Library"
				component={TopMaterialTabNav}
				options={{ tabBarIcon: iconProvider('Library') }}
			/>
		</BottomTabs.Navigator>
	);
}

export default withTheme(BottomTabNav);
