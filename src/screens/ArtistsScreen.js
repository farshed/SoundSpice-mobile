import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RenderCategory from '../components/RenderCategory';
import { flatListItemLayout } from '../utils/FlatListLayout';

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

	let bottomMargin = props.currentTrack.id !== '000' ? { marginBottom: 60 } : { flex: 1 };
	return (
		<View style={bottomMargin}>
			<FlatList
				data={props.artists}
				renderItem={renderArtists}
				getItemLayout={flatListItemLayout}
				keyExtractor={(asset) => asset.title.toString()}
			/>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		artists: state.media.artists,
		currentTrack: state.playback.currentTrack
	};
}

export default connect(
	mapStateToProps,
	actions
)(ArtistsScreen);

const styles = {
	itemInvisible: {
		backgroundColor: 'transparent'
	}
};
