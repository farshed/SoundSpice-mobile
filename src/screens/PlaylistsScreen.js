import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CreatePlaylistButton from '../components/CreatePlaylistButton';
import ListItem from '../components/ListItem';
import InputDialog from '../components/InputDialog';
import Icon from '../components/Icon';
import PlaylistOptions from '../components/PlaylistOptions';
import RenderToast from '../components/RenderToast';
import { contrastTransColor } from '../themes/styles';

function PlaylistsScreen(props) {
	const [isModalVisible, setModal] = useState(false);
	const [optionsModal, setOptionsModal] = useState({ visible: false, name: '' });

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	function onPressSave(playlistName) {
		if (playlistName) {
			let keys = Object.keys(props.playlists);
			let index = keys.indexOf(playlistName);
			if (index === -1) {
				props.createPlaylist(playlistName);
				setModal(false);
			} else {
				RenderToast('A playlist with the same name already exists');
			}
		} else RenderToast('Playlists cannot be untitled');
	}

	function onListItemPress(title, content) {
		props.navigation.navigate('playlist', { title, content });
	}

	function onOptionsPress(name) {
		setOptionsModal({ visible: true, name });
	}

	const { playlists } = props;
	let bottomMargin = props.currentTrack.id !== '000' ? { marginBottom: 160 } : { flex: 1 };
	let keys = Object.keys(playlists);
	return (
		<View style={bottomMargin}>
			<CreatePlaylistButton onPress={() => setModal(true)} />
			<InputDialog
				isVisible={isModalVisible}
				onPressSave={onPressSave}
				onPressCancel={() => setModal(false)}
				inputPlaceholder="Give your playlist a name"
				saveButtonTitle="Create"
				title="Create playlist"
			/>
			<PlaylistOptions
				selectedPlaylist={optionsModal.name}
				isVisible={optionsModal.visible}
				onPressCancel={() => setOptionsModal({ ...optionsModal, visible: false })}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				{keys.map((key, index) => (
					<ListItem
						title={key}
						subtitle={`${playlists[key].length} tracks`}
						key={String(key + index)}
						onPress={() => onListItemPress(key, playlists[key])}
						iconProps={playlistIcon}
						rightElement={<StyledIcon {...optionsIcon} onPress={() => onOptionsPress(key)} />}
					/>
				))}
			</ScrollView>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		playlists: state.playlists,
		currentTrack: state.playback.currentTrack
	};
}

export default connect(mapStateToProps, actions)(PlaylistsScreen);

const StyledIcon = styled(Icon)`
	color: ${contrastTransColor(0.75)};
`;

const playlistIcon = {
	name: 'headphones',
	type: 'feather',
	size: 26
};

const optionsIcon = {
	name: 'more-vertical',
	type: 'feather',
	size: 25
};
