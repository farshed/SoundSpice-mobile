import React, { useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import RenderActivityIndicator from '../components/RenderActivityIndicator';
import * as actions from '../actions';
import { contrastColor, contrastTransColor } from '../themes/styles';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

function LyricsScreen(props) {
	const { currentTrack, navigation } = props;
	useEffect(() => {
		let unsubscribe1 = navigation.addListener('focus', onFocus);
		// let unsubscribe2 = navigation.addListener('blur', props.resetLyrics);
		return () => {
			unsubscribe1();
			// unsubscribe2();
		};
	}, [navigation]);

	function onFocus() {
		props.hideFooter();
		const { title, artist, index } = currentTrack;
		if (!currentTrack.lyrics) props.fetchLyrics({ title, artist, index });
	}

	function renderLyrics() {
		let { title, artist, lyrics } = currentTrack;
		let { currentLyrics } = props;
		return lyrics || currentLyrics ? (
			<ScrollView>
				<Title>{title}</Title>
				<Artist>{artist}</Artist>
				<Lyrics>{lyrics || currentLyrics}</Lyrics>
			</ScrollView>
		) : (
			<RenderActivityIndicator text="fetching lyrics..." />
		);
	}

	return (
		<View style={{ flex: 1 }}>
			{props.error ? (
				<ErrorWrapper>
					<ErrorText>{'Oops! No lyrics were found!'}</ErrorText>
				</ErrorWrapper>
			) : (
				renderLyrics()
			)}
		</View>
	);
}

function mapStateToProps(state) {
	return {
		currentTrack: state.playback.currentTrack,
		currentLyrics: state.lyrics.currentLyrics,
		error: state.lyrics.error
	};
}

export default connect(mapStateToProps, actions)(LyricsScreen);

const Title = styled.Text`
	font-family: 'Circular';
	font-size: 20px;
	width: ${ScreenWidth}px;
	margin-top: 22px;
	margin-bottom: 6px;
	text-align: center;
	color: ${contrastColor};
`;

const Artist = styled.Text`
	font-family: 'Circular';
	font-size: 18px;
	width: ${ScreenWidth}px;
	margin-bottom: 28px;
	text-align: center;
	color: ${contrastTransColor(0.75)};
`;

const Lyrics = styled.Text`
	font-family: 'CircularLight';
	font-size: 15px;
	margin: 0 20px ${ScreenHeight / 8}px 20px;
	line-height: 22px;
	color: ${contrastColor};
`;

const ErrorWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const ErrorText = styled.Text`
	font-family: 'Circular';
	font-size: 16px;
	color: ${contrastColor};
`;
