import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
// import { CoverImage } from 'react-native-get-music-files-v3dev-test';

const ImageSize = Dimensions.get('window').width * 0.85;
const placeholder = require('../../assets/placeholder.jpg');

const CoverArt = (props) => {
	//<CoverImage source={cover} width={ImageSize} height={ImageSize} />
	const imgSrc = props.src ? { uri: props.src } : placeholder;
	return <Cover source={imgSrc} />;
};

export default CoverArt;

const Cover = styled.Image`
	height: ${ImageSize}px;
	width: ${ImageSize}px;
	border-radius: 5px;
`;
