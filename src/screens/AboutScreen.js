import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import styled from 'styled-components/native';
import { repoUrl } from '../constants/urls';
import { contrastColor, contrastTransColor, foregroundColor } from '../themes/styles';

function AboutScreen() {
	return (
		<Wrapper>
			<Heading>SoundSpice</Heading>
			<DetailTrans>Version 3.1.4.20</DetailTrans>
			<Heading>Developed by</Heading>
			<DetailTrans>Faisal Arshed</DetailTrans>
			<Detail>Source code available under MIT License at</Detail>
			<TouchableOpacity onPress={() => Linking.openURL(repoUrl)}>
				<Link>Github</Link>
			</TouchableOpacity>
		</Wrapper>
	);
}

export default AboutScreen;

const Wrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Heading = styled.Text`
	font-family: 'ProductSans';
	font-size: 18px;
	margin-bottom: 8px;
	color: ${contrastColor};
`;

const DetailTrans = styled.Text`
	font-family: 'ProductSans';
	font-size: 16px;
	margin-bottom: 40px;
	color: ${contrastTransColor(0.75)};
`;

const Link = styled.Text`
	font-family: 'ProductSansBold';
	font-size: 16px;
	margin-bottom: 40px;
	color: ${foregroundColor};
`;

const Detail = styled.Text`
	font-family: 'ProductSans';
	font-size: 16px;
	margin-bottom: 10px;
	color: ${contrastColor};
`;
