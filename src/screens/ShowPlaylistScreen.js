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
		let unsubscribe = props.navigation.addListener('focus', props.hideFooter);
		return unsubscribe;
	}, [props.navigation]);

	let listData = props.route.params.content;
	return listData.length > 0 ? (
		<View style={{ flex: 1 }}>
			<FlatList
				data={listData}
				keyExtractor={(asset) => asset.id.toString()}
				renderItem={({ item }) => <RenderTrack item={item} setOptions={setModal} />}
				getItemLayout={flatListItemLayout}
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

export default connect(null, actions)(ShowPlaylistScreen);

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
