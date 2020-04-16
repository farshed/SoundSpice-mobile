import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'underscore';
import RenderCategory from '../components/RenderCategory';
import { flatListCardLayout } from '../utils/FlatListLayout';

function ArtistsScreen(props) {
	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	function onArtistPress(title, content) {
		props.navigation.navigate('content', { title, content });
	}

	function renderArtists({ item, index }) {
		if (item.empty) return <View style={styles.itemInvisible} />;
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

	function mediaListParser() {
		let sectionsData = [];
		let data = _.groupBy(props.media, 'artist');
		let titles = Object.keys(data);
		titles.forEach((title) => {
			sectionsData.push({
				title,
				data: data[title]
			});
		});
		let unknownArtist = sectionsData.filter((item) => item.title === 'null');
		unknownArtist = unknownArtist.map((item) => (item.title = 'unknown'));
		let sortedData = _.sortBy(sectionsData, 'title').filter((item) => item.title !== 'null');
		return sortedData;
	}

	let bottomMargin = props.currentTrack.id !== '000' ? { marginBottom: 60 } : { flex: 1 };
	return (
		<View style={bottomMargin}>
			<FlatList
				data={mediaListParser()}
				renderItem={renderArtists}
				numColumns={2}
				getItemLayout={flatListCardLayout}
				keyExtractor={(asset) => asset.title.toString()}
			/>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		media: state.media.mediaFiles,
		currentTrack: state.playback.currentTrack
	};
}

export default connect(mapStateToProps, actions)(ArtistsScreen);

const styles = {
	itemInvisible: {
		backgroundColor: 'transparent'
	}
};
