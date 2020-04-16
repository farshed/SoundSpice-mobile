import React from 'react';
import { TouchableNativeFeedback as Touchable, Dimensions } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import Icon from './Icon';
import { contrastColor, contrastTransColor } from '../themes/styles';

const ScreenWidth = Dimensions.get('window').width;

function ListItem(props) {
	const rippleColor =
		props.theme.current === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
	return (
		<Touchable
			onPress={props.onPress}
			onLongPress={props.onLongPress}
			delayLongPress={props.delayLongPress}
			background={Touchable.Ripple(rippleColor, false)}>
			<Wrapper>
				<StyledIcon {...props.iconProps} />
				<TextWrapper>
					<Title style={props.titleStyle} numberOfLines={1}>
						{props.title}
					</Title>
					{props.subtitle && <SubTitle>{props.subtitle}</SubTitle>}
				</TextWrapper>
				<RightWrapper>{props.rightElement && props.rightElement}</RightWrapper>
			</Wrapper>
		</Touchable>
	);
}

export default withTheme(ListItem);

const Wrapper = styled.View`
	flex-direction: row;
	align-items: center;
	height: 60px;
	margin-top: 4px;
	margin-bottom: 4px;
`;

const StyledIcon = styled(Icon)`
	padding: 5px;
	margin-left: 12px;
	margin-right: 12px;
	color: ${contrastColor};
`;

const TextWrapper = styled.View`
	height: 85%;
	flex: 1;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: flex-start;
`;

const Title = styled.Text`
	font-size: 16px;
	font-family: 'ProductSans';
	color: ${contrastColor};
	width: ${ScreenWidth / 2}px;
`;

const SubTitle = styled.Text`
	font-size: 14px;
	font-family: 'ProductSansLight';
	color: ${contrastTransColor(0.75)};
`;

const RightWrapper = styled.View`
	margin-right: 10px;
`;
