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
			/>
		));
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView showsVerticalScrollIndicator={false}>{renderFolders()}</ScrollView>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		media: state.media.mediaFiles
	};
}

export default connect(mapStateToProps, actions)(FoldersScreen);

const folderIcon = {
	name: 'folder',
	type: 'entypo',
	size: 24,
	style: {
		backgroundColor: 'transparent'
	}
};
