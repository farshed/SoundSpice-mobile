import React from 'react';
import { View, Dimensions, TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components/native';
import { elevatedBGColor, contrastColor, contrastTransColor } from '../themes/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const itemWidth = SCREEN_WIDTH / 2 - 25;
const itemHeight = itemWidth + itemWidth / 8;
const placeholder = require('../../assets/placeholder.jpg');

function RenderCategory(props) {
	const itemMargin = props.index % 2 === 0 ? { marginLeft: 18, marginRight: 14 } : {};
	itemMargin.marginTop = 20;
	const imageSource = props.image ? { uri: props.image } : placeholder;
	const subText = `${props.numOfTracks} ${props.numOfTracks > 1 ? 'tracks' : 'track'}`;
	return (
		<TouchableNativeFeedback onPress={props.onPress}>
			<View style={itemMargin}>
				<Image source={imageSource} />
				<TextWrapper>
					<Artist numberOfLines={1}>{props.title}</Artist>
					<Subtitle>{subText}</Subtitle>
				</TextWrapper>
			</View>
		</TouchableNativeFeedback>
	);
}

export default RenderCategory;

const Image = styled.Image`
	width: ${itemWidth}px;
	height: ${itemHeight - itemHeight / 4}px;
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
`;

const TextWrapper = styled.View`
	height: ${itemHeight / 4}px;
	width: ${itemWidth}px;
	justify-content: space-evenly;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
	margin-top: 5px;
	margin-bottom: 5px;
	elevation: 2;
	background-color: ${elevatedBGColor};
`;

const Artist = styled.Text`
	font-size: 13px;
	font-family: 'CircularBold';
	margin-left: 10px;
	margin-right: 10px;
	color: ${contrastColor};
`;

const Subtitle = styled.Text`
	font-size: 10px;
	font-family: 'Circular';
	margin-left: 11px;
	color: ${contrastTransColor(0.75)};
`;
