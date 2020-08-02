import React, { useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ListItem from '../components/ListItem';

function Library(props) {
	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	return (
		<View style={{ flex: 1 }}>
			<ListItem
				title="Playlists"
				onPress={() => props.navigation.navigate('playlists')}
				iconProps={icons.playlists}
				titleStyle={styles.title}
			/>
			<ListItem
				title="Artists"
				onPress={() => props.navigation.navigate('artists')}
				iconProps={icons.artists}
				titleStyle={styles.title}
			/>
			<ListItem
				title="Albums"
				onPress={() => props.navigation.navigate('albums')}
				iconProps={icons.albums}
				titleStyle={styles.title}
			/>
			<ListItem
				title="Folders"
				onPress={() => props.navigation.navigate('folders')}
				iconProps={icons.folders}
				titleStyle={styles.title}
			/>
		</View>
	);
}

export default connect(
	null,
	actions
)(Library);

const styles = {
	title: {
		fontFamily: 'CircularBold',
		fontSize: 19
	}
};

const icons = {
	playlists: {
		name: 'headphones',
		type: 'feather',
		size: 26
	},
	artists: {
		name: 'feather',
		type: 'feather',
		size: 26
	},
	albums: {
		name: 'disc',
		type: 'feather',
		size: 26
	},
	folders: {
		name: 'folder',
		type: 'feather',
		size: 26
	}
};
