import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

function SplashScreen() {
	return (
		<Wrapper>
			<StatusBar backgroundColor="#50278F" animated />
			<Monogram>SoundSpice</Monogram>
		</Wrapper>
	);
}

export default SplashScreen;

const Wrapper = styled.View`
	flex: 1;
	justify-content: space-evenly;
	align-items: center;
	background-color: #50278f;
`;

const Monogram = styled.Text`
	font-family: 'Abeat';
	font-size: 26px;
	color: white;
	margin-bottom: 60px;
`;
