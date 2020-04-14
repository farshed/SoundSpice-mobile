import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { navigationRef } from './NavigationService';
import RootStack from './RootStack';
import PlayerFooter from '../components/PlayerFooter';
import * as themes from '../themes';

function RootNavigator(props) {
	const { theme } = props;
	const color = theme === 'dark' ? 'black' : 'white';
	const statusBarContent = `${theme === 'light' ? 'dark' : 'light'}-content`;
	const wrapperColor = {
		colors: {
			background: color
		}
	};
	return (
		<NavigationContainer ref={navigationRef} theme={wrapperColor}>
			<ThemeProvider theme={themes[theme]}>
				<StatusBar barStyle={statusBarContent} backgroundColor={color} animated />
				<RootStack />
				<PlayerFooter />
			</ThemeProvider>
		</NavigationContainer>
	);
}

function mapStateToProps(state) {
	return {
		theme: state.settings.theme
	};
}

export default connect(mapStateToProps, actions)(RootNavigator);
