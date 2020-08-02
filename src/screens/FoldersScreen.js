import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'underscore';
import ListItem from '../components/ListItem';

function FoldersScreen(props) {
	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	function onListItemPress(title, content) {
		props.navigation.navigate('content', { title, content });
	}

	function renderFolders() {
		let data = _.groupBy(props.media, 'folder');
		let keys = Object.keys(data);
		return keys.map((key, index) => (
			<ListItem
				title={key}
				subtitle={`${data[key].length} tracks`}
				key={(key + index).toString()}
				onPress={() => onListItemPress(key, data[key])}
				iconProps={folderIcon}
				titleStyle={styles.title}
				subtitleStyle={styles.subtitle}
			/>
		));
	}

	let bottomMargin = props.currentTrack.id !== '000' ? { flex: 1, marginBottom: 60 } : { flex: 1 };

	return (
		<View style={bottomMargin}>
			<ScrollView showsVerticalScrollIndicator={false}>{renderFolders()}</ScrollView>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		media: state.media.mediaFiles,
		currentTrack: state.playback.currentTrack
	};
}

export default connect(
	mapStateToProps,
	actions
)(FoldersScreen);

const folderIcon = {
	name: 'folder',
	type: 'feather',
	size: 24,
	style: {
		backgroundColor: 'transparent'
	}
};

const styles = {
	title: {
		fontFamily: 'CircularBold',
		fontSize: 15
	},
	subtitle: {
		fontFamily: 'CircularLight',
		fontSize: 14
	}
};
