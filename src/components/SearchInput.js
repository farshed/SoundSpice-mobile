import React from 'react';
import { Dimensions } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import Icon from '../components/Icon';
import { contrastColor, contrastTransColor } from '../themes/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

function SearchInput(props) {
	const { theme, onFocus, onBlur, value, setSearchInput } = props;
	return (
		<Wrapper>
			<StyledIcon {...searchIcon} />
			<Input
				placeholder="Artists, songs, or albums"
				allowFontScaling={false}
				clearButtonMode="while-editing"
				selectionColor={`${theme.fgTrans}0.75)`}
				placeholderTextColor={`${theme.contrastTrans}0.7)`}
				autoCorrect={false}
				returnKeyType="search"
				value={value}
				onChangeText={setSearchInput}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</Wrapper>
	);
}

export default withTheme(SearchInput);

const Wrapper = styled.View`
	height: 48px;
	width: ${SCREEN_WIDTH - 30}px;
	border-radius: 25px;
	background-color: ${contrastTransColor(0.15)};
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

const Input = styled.TextInput`
	flex: 1;
	font-family: 'Circular';
	font-size: 16px;
	color: ${contrastColor};
	padding-right: 30px;
	align-items: center;
	background-color: transparent;
	align-items: center;
`;

const StyledIcon = styled(Icon)`
	color: ${contrastColor};
	margin: 0 15px 0 18px;
`;

const searchIcon = {
	name: 'search',
	type: 'feather',
	size: 24
};
