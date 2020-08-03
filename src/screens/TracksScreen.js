import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
// import { View, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import QuickScrollList from 'react-native-quick-scroll';
import setupPlayer from '../services/SetupPlayer';
import RenderActivityIndicator from '../components/RenderActivityIndicator';
import RenderTrack from '../components/RenderTrack';
import OptionsModal from '../components/OptionsModal';
import { flatListItemLayout } from '../utils/FlatListLayout';
import { scanMessage } from '../constants';
import { contrastColor } from '../themes/styles';
import { FlatList } from 'react-native-gesture-handler';

// const ScreenHeight = Dimensions.get('window').height;
// const StatusBarHeight = StatusBar.currentHeight;
// const FooterHeight = 60;
// const BottomTabHeight = 49;
// const ViewportHeight = ScreenHeight - (StatusBarHeight + FooterHeight + BottomTabHeight);
// const itemHeight = 75;

function TracksScreen(props) {
	const [modal, setModal] = useState({ visible: false, item: {} });
	const { currentTrack } = props;

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter);
		return unsubscribe;
	}, [props.navigation]);

	useEffect(() => {
		props.getMedia();
		setupPlayer().then(() => currentTrack.id !== '000' && TrackPlayer.add(currentTrack));
	}, []);

	const renderMargin = currentTrack.id !== '000' ? { marginBottom: 60, flex: 1 } : { flex: 1 };

	if (props.mediaLoaded) {
		if (props.media.length > 0) {
			return (
				<View style={renderMargin}>
					{/* <QuickScrollList
						keyExtractor={(asset) => asset.id.toString()}
						data={props.media}
						renderItem={({ item }) => <RenderTrack item={item} setOptions={setModal} />}
						getItemLayout={flatListItemLayout}
						scrollEventThrottle={16}
						contentContainerStyle={styles.flatlistContent}
						initialScrollIndex={currentTrack.index || undefined}
						itemHeight={itemHeight}
						viewportHeight={ViewportHeight}
						rightOffset={10}
						thumbStyle={styles.thumbStyle}
					/> */}
					<FlatList
						keyExtractor={(asset) => asset.id.toString()}
						data={props.media}
						renderItem={({ item }) => <RenderTrack item={item} setOptions={setModal} />}
						getItemLayout={flatListItemLayout}
						scrollEventThrottle={16}
						contentContainerStyle={styles.flatlistContent}
						initialScrollIndex={currentTrack.index || undefined}
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
		return (
			<MessageWrapper>
				<Message numberOfLines={2}>
					{"Oops! SoundSpice couldn't find any music on your device"}
				</Message>
			</MessageWrapper>
		);
	}

	return <RenderActivityIndicator text={scanMessage} />;
}

function mapStateToProps(state) {
	return {
		currentTrack: state.playback.currentTrack,
		media: state.media.mediaFiles,
		mediaLoaded: state.media.mediaLoaded,
		theme: state.settings.theme
	};
}

export default connect(
	mapStateToProps,
	actions
)(TracksScreen);

const MessageWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Message = styled.Text`
	font-family: 'Circular';
	font-size: 16px;
	color: ${contrastColor};
	margin: 0 55px 0 55px;
	text-align: center;
`;

const styles = {
	// thumbStyle: {
	// 	width: 4,
	// 	borderWidth: 0
	// },
	flatlistContent: {
		paddingBottom: 15
	}
};
