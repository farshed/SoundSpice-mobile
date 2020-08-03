import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RenderTrack from '../components/RenderTrack';
import OptionsModal from '../components/OptionsModal';
import { flatListItemLayout } from '../utils/FlatListLayout';
import { contrastColor } from '../themes/styles';

function ShowPlaylistScreen(props) {
	const [modal, setModal] = useState({ visible: false, item: {} });

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	let listData = props.route.params.content;
	let bottomMargin = props.currentTrack.id !== '000' ? { flex: 1, marginBottom: 60 } : { flex: 1 };
	return listData.length > 0 ? (
		<View style={bottomMargin}>
			<FlatList
				data={listData}
				keyExtractor={(asset) => asset.id.toString()}
				renderItem={({ item }) => <RenderTrack item={item} setOptions={setModal} />}
				getItemLayout={flatListItemLayout}
				indicatorStyle={props.theme === 'dark' ? 'white' : 'black'}
			/>
			<OptionsModal
				selectedTrack={modal.item}
				isVisible={modal.visible}
				onPressCancel={() => setModal({ ...modal, visible: false })}
				playlistRemoveOption
			/>
		</View>
	) : (
		<EmptyWrapper>
			<EmptyText>Oops! This playlist is empty</EmptyText>
		</EmptyWrapper>
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
)(ShowPlaylistScreen);

const EmptyWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin-bottom: 60px;
`;

const EmptyText = styled.Text`
	font-family: 'Circular';
	font-size: 16px;
	color: ${contrastColor};
`;
