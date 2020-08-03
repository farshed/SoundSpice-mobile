import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RenderTrack from '../components/RenderTrack';
import OptionsModal from '../components/OptionsModal';
import { flatListItemLayout } from '../utils/FlatListLayout';

function ShowFolderScreen(props) {
	const [modal, setModal] = useState({ visible: false, item: {} });

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	let bottomMargin = props.currentTrack.id !== '000' ? { flex: 1, marginBottom: 60 } : { flex: 1 };

	return (
		<View style={bottomMargin}>
			<FlatList
				keyExtractor={(asset) => asset.id.toString()}
				renderItem={({ item }) => <RenderTrack item={item} setOptions={setModal} />}
				data={props.route.params.content}
				getItemLayout={flatListItemLayout}
				indicatorStyle={props.theme === 'dark' ? 'white' : 'black'}
			/>
			<OptionsModal
				selectedTrack={modal.item}
				isVisible={modal.visible}
				onPressCancel={() => setModal({ ...modal, visible: false })}
			/>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		currentTrack: state.playback.currentTrack,
		theme: state.settings.theme
	};
}

export default connect(
	mapStateToProps,
	actions
)(ShowFolderScreen);
