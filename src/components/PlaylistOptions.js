import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import * as actions from '../actions';
import ListItem from './ListItem';
import InputDialog from './InputDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import RenderToast from '../components/RenderToast';
import { elevatedBGColor, contrastColor } from '../themes/styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

function PlaylistOptions(props) {
	const [isDialogVisible, setDialogVisible] = useState(false);
	const [isRenameModalVisible, setRenameModal] = useState(false);

	const { selectedPlaylist, isVisible, onPressCancel } = props;

	function onPressRename(newName) {
		let playlistName = newName.trim();
		if (playlistName === selectedPlaylist) {
			setRenameModal(false);
			props.onPressCancel();
			return;
		}
		if (playlistName) {
			let keys = Object.keys(props.playlists);
			let index = keys.indexOf(playlistName);
			if (index === -1) {
				props.renamePlaylist(selectedPlaylist, playlistName);
				setRenameModal(false);
				props.onPressCancel();
			} else RenderToast('A playlist with the same name already exists');
		} else RenderToast('Playlists cannot be untitled');
	}

	function onDeleteConfirm() {
		setDialogVisible(false);
		props.onPressCancel();
		props.deletePlaylist(selectedPlaylist);
	}

	return (
		<StyledModal
			isVisible={isVisible}
			swipeDirection="down"
			deviceHeight={SCREEN_HEIGHT}
			onBackButtonPress={onPressCancel}
			onBackdropPress={onPressCancel}
			onSwipeComplete={onPressCancel}
			backdropColor="rgba(0, 0, 0, 0.5)"
			animationOutTiming={100}
			animationInTiming={100}
			hideModalContentWhileAnimating>
			<ModalContentWrapper>
				<TextWrapper>
					<ModalTitle numberOfLines={1}>{selectedPlaylist}</ModalTitle>
				</TextWrapper>
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
					title="Rename Playlist"
					name={selectedPlaylist}
					saveButtonTitle="Rename"
				/>
				<ConfirmDialog
					title="Confirm Delete"
					buttonTitle="Delete"
					cancelButton
					description="Are you sure you want to delete this playlist?"
					onCancel={() => setDialogVisible(false)}
					onConfirm={onDeleteConfirm}
					isVisible={isDialogVisible}
				/>
			</ModalContentWrapper>
		</StyledModal>
	);
}

function mapStateToProps(state) {
	return {
		playlists: state.playlists
	};
}

export default connect(
	mapStateToProps,
	actions
)(PlaylistOptions);

const StyledModal = styled(Modal)`
	justify-content: flex-end;
	align-items: center;
`;

const ModalContentWrapper = styled.View`
	height: 172px;
	width: ${SCREEN_WIDTH}px;
	background-color: ${elevatedBGColor};
	elevation: 5;
	justify-content: space-evenly;
	margin-bottom: -20px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

const TextWrapper = styled.View`
	height: 35px;
	justify-content: center;
	margin: 12px 15px 0 15px;
`;

const ModalTitle = styled.Text`
	font-family: 'Circular';
	font-size: 15px;
	text-align: center;
	color: ${contrastColor};
`;

const icons = {
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
