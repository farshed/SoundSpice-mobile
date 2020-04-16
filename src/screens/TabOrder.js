import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ListItem from '../components/ListItem';
import { contrastColor } from '../themes/styles';

function TabOrder(props) {
	function renderItem({ item, drag }) {
		return (
			<ListItem
				title={item.charAt(0).toUpperCase() + item.slice(1)}
				iconProps={dragIcon}
				onLongPress={drag}
				delayLongPress={150}
			/>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<Message numberOfLines={2}>Hold and drag the tabs to rearrange them</Message>
			<DraggableFlatList
				data={props.tobTabs}
				renderItem={renderItem}
				keyExtractor={(item) => item}
				onDragEnd={({ data }) => props.setTopTabs(data)}
			/>
		</View>
	);
}

function mapStateToProps(state) {
	return { tobTabs: state.settings.topTabs };
}

export default connect(mapStateToProps, actions)(TabOrder);

const Message = styled.Text`
	font-family: 'ProductSansBold';
	font-size: 16px;
	margin: 20px;
	color: ${contrastColor};
	text-align: center;
`;

const dragIcon = {
	name: 'drag',
	type: 'material-community',
	size: 25
};
