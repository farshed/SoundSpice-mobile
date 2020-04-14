import React from 'react';
import { TouchableOpacity, Linking, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { landingSite } from '../constants/urls';
import { contrastColor, contrastTransColor, foregroundColor } from '../themes/styles';

const ScreenHeight = Dimensions.get('window').height;

function AboutScreen() {
	return (
		<Wrapper>
			<Heading>SoundSpice</Heading>
			<Detail>Version 4.0.1.18</Detail>
			<Heading>Developed by</Heading>
			<Detail>Faisal Arshed</Detail>
			<WebsiteWrapper>
				<TouchableOpacity onPress={() => Linking.openURL(landingSite)}>
					<WebsiteDetail>website</WebsiteDetail>
				</TouchableOpacity>
			</WebsiteWrapper>
		</Wrapper>
	);
}

export default AboutScreen;

const Wrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const WebsiteWrapper = styled.View`
	flex-direction: row;
	justify-content: center;
	margin-bottom: ${ScreenHeight / 15}px;
`;

const Heading = styled.Text`
	font-family: 'ProductSans';
	font-size: 18px;
	margin-bottom: 8px;
	color: ${contrastColor};
`;

const Detail = styled.Text`
	font-family: 'ProductSans';
	font-size: 16px;
	margin-bottom: 40px;
	color: ${contrastTransColor(0.75)};
`;

const WebsiteDetail = styled.Text`
	font-family: 'ProductSans';
	font-size: 16px;
	margin-bottom: 40px;
	color: ${foregroundColor};
`;
