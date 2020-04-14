import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ListItem from '../components/ListItem';
import RenderToast from '../components/RenderToast';
import { contrastColor } from '../themes/styles';

function AddToPlayList(props) {
	const { navigation, route, playlists } = props;
	useEffect(() => {
		let unsubscribe = navigation.addListener('focus', props.hideFooter);
		return unsubscribe;
	}, [navigation]);

	function addSong(playlistTitle, song) {
		props.addToPlaylist(playlistTitle, song);
		RenderToast('Track was added to playlist');
		navigation.goBack();
	}

	function onPlaylistPress(playlistName) {
		let { song } = route.params;
		let filtered = playlists[playlistName].filter((file) => file.id === song.id);
		if (filtered.length > 0) RenderToast('This track is already in this playlist');
		else addSong(playlistName, song);
	}

	const keys = Object.keys(playlists);
	if (keys.length === 0) {
		return (
			<EmptyWrapper>
				<EmptyText>{"You don't have any playlists yet"}</EmptyText>
			</EmptyWrapper>
		);
	}
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			{keys.map((key, index) => (
				<ListItem
					title={key}
					subtitle={`${playlists[key].length} tracks`}
					onPress={() => onPlaylistPress(key)}
					iconProps={playlistIcon}
					key={(key + index).toString()}
				/>
			))}
		</ScrollView>
	);
}

function mapStateToProps(state) {
	return {
		playlists: state.playlists
	};
}

export default connect(mapStateToProps, actions)(AddToPlayList);

const EmptyWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: 'center';
	margin-bottom: 80px;
`;

const EmptyText = styled.Text`
	font-family: 'Circular';
	font-size: 16px;
	color: ${contrastColor};
`;

const playlistIcon = {
	name: 'playlist-music-outline',
	type: 'material-community',
	size: 28
};
