import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { foreground2Color } from '../themes/styles';

function RenderActivityIndicator(props) {
	const { foreground2 } = props.theme;
	return (
		<Wrapper>
			<ActivityIndicator size="large" style={{ marginBottom: 15 }} color={foreground2} />
			<Text>{props.text}</Text>
			{props.subText ? <Text>{props.subText}</Text> : null}
		</Wrapper>
	);
}

export default withTheme(RenderActivityIndicator);

const Wrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Text = styled.Text`
	font-family: 'CircularLight';
	font-size: 15px;
	text-align: center;
	color: ${foreground2Color};
`;
