import React from 'react';
import { Dimensions } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
// import { CoverImage } from 'react-native-get-music-files-v3dev-test';

const ImageSize = Dimensions.get('window').width * 0.85;

const lightPlaceholder = require('../../assets/placeholder_light.png');
const darkPlaceholder = require('../../assets/placeholder_dark.png');

const CoverArt = (props) => {
	const { theme, src } = props;
	const placeholder = theme.current === 'light' ? lightPlaceholder : darkPlaceholder;
	const cover = src === 'cover' ? placeholder : { uri: src };
	// const cover = src === 'cover' ? placeholder : src;
	return (
		<Cover source={cover} />
		//<CoverImage source={cover} width={ImageSize} height={ImageSize} />
	);
};

export default withTheme(CoverArt);

const Cover = styled.Image`
	height: ${ImageSize}px;
	width: ${ImageSize}px;
`;
