import React from 'react';
import { TouchableNativeFeedback, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Icon from './Icon';
import { contrastColor, elevatedBGColor } from '../themes/styles';

const ScreenWidth = Dimensions.get('window').width;

function CreatePlaylistButton(props) {
	return (
		<TouchableNativeFeedback onPress={props.onPress}>
			<Wrapper>
				<AddIcon {...addIcon} />
				<Text>Create new playlist</Text>
			</Wrapper>
		</TouchableNativeFeedback>
	);
}

export default CreatePlaylistButton;

const Wrapper = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 30px 20px 20px 20px;
	height: 50px;
	width: ${ScreenWidth - 40}px;
	border-radius: 4px;
	background-color: ${elevatedBGColor};
	elevation: 4;
`;

const AddIcon = styled(Icon)`
	color: ${contrastColor};
	margin-right: 28px;
	margin-top: 1px;
`;

const Text = styled.Text`
	font-family: 'CircularLight';
	font-size: 14px;
	margin-right: 25px;
	color: ${contrastColor};
`;

const addIcon = {
	name: 'playlist-add',
	type: 'material',
	size: 19
};
