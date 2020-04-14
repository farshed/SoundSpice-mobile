import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RenderTrack from '../components/RenderTrack';
import OptionsModal from '../components/OptionsModal';
import { flatListItemLayout } from '../utils/FlatListLayout';
import { contrastColor } from '../themes/styles';

function ShowPlaylistScreen(props) {
	const [modal, setModal] = useState({ visible: false, item: {} });

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.hideFooter);
		return unsubscribe;
	}, [props.navigation]);

	let listData = props.route.params.content;
	return listData.length > 0 ? (
		<View style={{ flex: 1 }}>
			<FlatList
				data={listData}
				keyExtractor={(asset, index) => asset.id.toString()}
				renderItem={({ item }) => <RenderTrack item={item} setOptions={setModal} />}
				getItemLayout={flatListItemLayout}
			/>
			<OptionsModal
				selectedTrack={modal.item}
				isVisible={modal.visible}
				onPressCancel={() => setModal({ ...modal, visible: false })}
				playlistRemoveOption
			/>
		</View>
	) : (
		<EmptyWrapper>
			<EmptyText>Oops! This playlist is empty</EmptyText>
		</EmptyWrapper>
	);
}

// class ShowPlaylis extends React.Component {
// onPressModalRename = (playlistName) => {
// 	if (playlistName) {
// 		let keys = Object.keys(this.props.playlists);
// 		let index = keys.indexOf(playlistName);
// 		if (index === -1) {
// 			this.props.renamePlaylist(this.props.navigation.state.params.title, playlistName);
// 			this.closeModal();
// 			this.props.navigation.pop();
// 		} else {
// 			RenderToast('A playlist with the same name already exists');
// 		}
// 	} else {
// 		RenderToast('Playlists cannot be untitled');
// 	}
// };
// onPressDelete = () => {
// 	this._menu.hide();
// 	this.setState({ isDialogVisible: true });
// };
// onDelete = () => {
// 	this.props.deletePlaylist(this.props.navigation.state.params.title);
// 	this.props.navigation.pop();
// };
// renderModal(colors) {
// 	return (
// 		<InputDialog
// 			isVisible={this.state.isModalVisible}
// 			inputPlaceholder="New title"
// 			name={this.props.navigation.state.params.title}
// 			saveButtonTitle="Rename"
// 			colors={colors}
// 			onPressCancel={this.closeModal}
// 			onPressSave={this.onPressModalRename}
// 			title="Rename Playlist"
// 		/>
// 	);
// }
// renderDialog(colors) {
// 	return (
// 		<ConfirmDialog
// 			title="Confirm Delete"
// 			buttonTitle="Delete"
// 			colors={colors}
// 			cancelButton
// 			description="Are you sure you want to delete this playlist?"
// 			isVisible={this.state.isDialogVisible}
// 			onCancel={this.closeDialog}
// 			onConfirm={this.onDelete}
// 		/>
// 	);
// }
// }

function mapStateToProps({ playlists }) {
	return { playlists };
}

export default connect(mapStateToProps, actions)(ShowPlaylistScreen);

const EmptyWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin-bottom: 60px;
`;

const EmptyText = styled.Text`
	font-family: 'Circular';
	font-size: 16px;
	color: ${contrastColor};
`;
