import React from 'react';
import styled from 'styled-components/native';

function SplashScreen() {
	return (
		<Wrapper>
			<Logo source={require('../../assets/logo.png')} />
		</Wrapper>
	);
}

export default SplashScreen;

const Wrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #121640;
`;

const Logo = styled.Image`
	height: 130px;
	width: 130px;
`;
