import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RenderCategory from '../components/RenderCategory';
import { flatListItemLayout } from '../utils/FlatListLayout';

function AlbumsScreen(props) {
	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	function onAlbumPress(title, content) {
		props.navigation.navigate('content', { title, content });
	}

	function renderAlbums({ item, index }) {
		if (item.empty) return <View style={styles.itemInvisible} />;
		let songsWithCover = item.data.filter((song) => song.artwork !== 'cover');
		let cover = songsWithCover.length === 0 ? 'cover' : songsWithCover[0].artwork;
		return (
			<RenderCategory
				title={item.title}
				image={cover}
				index={index}
				numOfTracks={item.data.length}
				onPress={() => onAlbumPress(item.title, item.data)}
			/>
		);
	}

	let bottomMargin = props.currentTrack.id !== '000' ? { marginBottom: 60 } : { flex: 1 };
	return (
		<View style={bottomMargin}>
			<FlatList
				data={props.albums}
				renderItem={renderAlbums}
				getItemLayout={flatListItemLayout}
				keyExtractor={(asset) => asset.title.toString()}
			/>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		albums: state.media.albums,
		currentTrack: state.playback.currentTrack
	};
}

export default connect(
	mapStateToProps,
	actions
)(AlbumsScreen);

const styles = {
	itemInvisible: {
		backgroundColor: 'transparent'
	}
};
