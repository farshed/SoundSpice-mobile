import React from 'react';
import styled from 'styled-components/native';
import Icon from './Icon';

function CoverPlaceholder(props) {
	const { size, radius, bgColor, fgColor, iconSize } = props;
	return (
		<Wrapper size={size} radius={radius} bg={bgColor} fg={fgColor}>
			<Icon name="music" type="feather" size={iconSize} color={fgColor} />
		</Wrapper>
	);
}

export default CoverPlaceholder;

const Wrapper = styled.View`
	height: ${(props) => props.size + 'px'};
	width: ${(props) => props.size + 'px'};
	background-color: ${(props) => props.bg};
	justify-content: center;
	align-items: center;
	border-width: 1px;
	border-color: ${(props) => props.fg};
	border-radius: ${(props) => props.radius + 'px'};
`;
