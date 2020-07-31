import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { contrastColor, foregroundColor, contrastTransColor } from '../themes/styles';
const placeholder = require('../../assets/placeholder.jpg');

const SCREEN_WIDTH = Dimensions.get('window').width;

function RenderCategory(props) {
	const imageSource = props.image ? { uri: props.image } : placeholder;
	const subText = `${props.numOfTracks} ${props.numOfTracks > 1 ? 'tracks' : 'track'}`;
	return (
		<Touchable onPress={props.onPress} activeOpacity={0.4}>
			<Thumbnail source={imageSource} />
			<TextWrapper>
				<Artist numberOfLines={1}>{props.title}</Artist>
				<Subtitle numberOfLines={1}>{subText}</Subtitle>
			</TextWrapper>
		</Touchable>
	);
}

function mapStateToProps(state) {
	return {
		currentTrack: state.playback.currentTrack
	};
}

export default connect(mapStateToProps, actions)(RenderCategory);

const Touchable = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	height: 65px;
	width: ${SCREEN_WIDTH}px;
	margin-top: 10px;
	padding-left: 15px;
`;

const Thumbnail = styled.Image`
	height: 50px;
	width: 50px;
	border-radius: 25px;
`;

const TextWrapper = styled.View`
	flex-direction: column;
	flex: 1;
	height: 52px;
	margin-left: 15px;
	justify-content: space-evenly;
`;

const Artist = styled.Text`
	font-family: 'CircularBold';
	font-size: 15px;
	width: ${SCREEN_WIDTH / 1.5}px;
	color: ${(props) => (props.current ? foregroundColor(props) : contrastColor(props))};
`;

const Subtitle = styled.Text`
	font-family: 'CircularLight';
	font-size: 14px;
	width: ${SCREEN_WIDTH / 2}px;
	color: ${contrastTransColor(0.75)};
`;
