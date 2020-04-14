import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';
import Modal from 'react-native-modal';
import * as actions from '../actions';
import ListItem from './ListItem';
import InputDialog from './InputDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import RenderToast from '../components/RenderToast';
import { elevatedBGColor, foreground2Color } from '../themes/styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

function OptionsModal(props) {
	const [isDialogVisible, setDialogVisible] = useState(false);
	const [isRenameModalVisible, setRenameModal] = useState(false);

	const navigation = useNavigation();
	const { selectedTrack, theme, isVisible, onPressCancel, playlistRemoveOption } = props;

	function onAddToPlaylist() {
		props.onPressCancel();
		navigation.navigate('addToPlaylist', { song: selectedTrack });
	}

	function onRemoveFromPlaylist() {
		props.onPressCancel();
		props.removeFromPlaylist(navigation.state.params.title, selectedTrack);
	}

	function onPressRename(newName) {
		if (newName !== selectedTrack.title) {
			let index = newName.split('').indexOf('/');
			if (index === -1) {
				props.renameTrack(selectedTrack, newName);
			} else {
				return RenderToast('Title should not contain "/"');
			}
		}
		setRenameModal(false);
		props.onPressCancel();
	}

	function onShare() {
		props.onPressCancel();
		Share.open({
			url: `file://${selectedTrack.url}`,
			// type: 'audio/mp3',
			failOnCancel: false
		});
	}

	function onDeleteConfirm() {
		setDialogVisible(false);
		props.onPressCancel();
		props.deleteTrack(selectedTrack);
	}

	const { backdrop } = theme;
	const modalTitle = `${selectedTrack.title}  •  ${selectedTrack.artist}`;
	const optionText = playlistRemoveOption ? 'Remove from Playlist' : 'Add to Playlist';
	const optionFunc = playlistRemoveOption ? onRemoveFromPlaylist : onAddToPlaylist;

	return (
		<StyledModal
			isVisible={isVisible}
			onBackButtonPress={onPressCancel}
			deviceHeight={SCREEN_HEIGHT}
			onBackdropPress={onPressCancel}
			backdropColor={backdrop}>
			<ModalContentWrapper>
				<TextWrapper>
					<ModalTitle numberOfLines={1}>{modalTitle}</ModalTitle>
				</TextWrapper>
				<ListItem title={optionText} iconProps={icons.playlist} onPress={optionFunc} />
				<ListItem title="Share" iconProps={icons.share} onPress={onShare} />
				<ListItem
					title="Rename"
					iconProps={icons.rename}
					onPress={() => setRenameModal(true)}
				/>
				<ListItem
					title="Delete"
					iconProps={icons.delete}
					onPress={() => setDialogVisible(true)}
				/>
				<InputDialog
					isVisible={isRenameModalVisible}
					onPressSave={onPressRename}
					onPressCancel={() => setRenameModal(false)}
					inputPlaceholder="New title"
					title="Rename Track"
					name={selectedTrack.title}
					saveButtonTitle="Rename"
				/>
				<ConfirmDialog
					title="Confirm Delete"
					buttonTitle="Delete"
					cancelButton
					description="Are you sure you want to delete this track?"
					onCancel={() => setDialogVisible(false)}
					onConfirm={onDeleteConfirm}
					isVisible={isDialogVisible}
				/>
			</ModalContentWrapper>
		</StyledModal>
	);
}

export default connect(null, actions)(withTheme(OptionsModal));

const StyledModal = styled(Modal)`
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
`;

const ModalContentWrapper = styled.View`
	height: ${SCREEN_HEIGHT / 2.35}px;
	width: ${SCREEN_WIDTH}px;
	background-color: ${elevatedBGColor};
	elevation: 5;
	justify-content: space-evenly;
	margin-bottom: -20px;
`;

const TextWrapper = styled.View`
	height: 35px;
	justify-content: center;
	margin: 12px 15px 0 15px;
`;

const ModalTitle = styled.Text`
	font-family: 'Circular';
	font-size: 14px;
	text-align: center;
	color: ${foreground2Color};
`;

const icons = {
	playlist: {
		name: 'list',
		type: 'feather',
		size: 20
	},
	share: {
		name: 'share-2',
		type: 'feather',
		size: 20
	},
	rename: {
		name: 'edit',
		type: 'feather',
		size: 20
	},
	delete: {
		name: 'trash-2',
		type: 'feather',
		size: 20
	}
};
