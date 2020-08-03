import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RenderCategory from '../components/RenderCategory';
import { flatListItemLayout } from '../utils/FlatListLayout';
import { contrastColor } from '../themes/styles';

function ArtistsScreen(props) {
	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	function onArtistPress(title, content) {
		props.navigation.navigate('content', { title, content });
	}

	function renderArtists({ item, index }) {
		let songsWithCover = item.data.filter((song) => song.artwork !== 'cover');
		let cover = songsWithCover.length === 0 ? 'cover' : songsWithCover[0].artwork;
		return (
			<RenderCategory
				title={item.title}
				image={cover}
				index={index}
				numOfTracks={item.data.length}
				onPress={() => onArtistPress(item.title, item.data)}
			/>
		);
	}

	if (props.artists.length === 0) {
		return (
			<EmptyWrapper>
				<Text>Oops! Nothing to show here</Text>
			</EmptyWrapper>
		);
	}

	let bottomMargin = props.currentTrack.id !== '000' ? { marginBottom: 60 } : { flex: 1 };

	return (
		<View style={bottomMargin}>
			<FlatList
				data={props.artists}
				renderItem={renderArtists}
				getItemLayout={flatListItemLayout}
				keyExtractor={(asset) => asset.title.toString()}
				indicatorStyle={props.theme === 'dark' ? 'white' : 'black'}
			/>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		artists: state.media.artists,
		currentTrack: state.playback.currentTrack,
		theme: state.settings.theme
	};
}

export default connect(
	mapStateToProps,
	actions
)(ArtistsScreen);

const EmptyWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin-bottom: 60px;
`;

const Text = styled.Text`
	font-family: 'Circular';
	font-size: 16px;
	color: ${contrastColor};
`;
