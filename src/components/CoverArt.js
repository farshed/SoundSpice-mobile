import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import CoverPlaceholder from './CoverPlaceholder';
// import { CoverImage } from 'react-native-get-music-files-v3dev-test';

const ImageSize = Dimensions.get('window').width * 0.85;

const CoverArt = (props) => {
	return props.src ? (
		<Cover source={{ uri: props.src }} />
	) : (
		//<CoverImage source={cover} width={ImageSize} height={ImageSize} />
		<CoverPlaceholder
			size={ImageSize}
			iconSize={ImageSize / 2.5}
			radius={5}
			bgColor="black"
			fgColor="rgba(255, 255, 255, 0.9)"
		/>
	);
};

export default CoverArt;

const Cover = styled.Image`
	height: ${ImageSize}px;
	width: ${ImageSize}px;
	border-radius: 5px;
`;
