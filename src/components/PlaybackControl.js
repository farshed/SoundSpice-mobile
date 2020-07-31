import React from 'react';
import { TouchableWithoutFeedback, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from '../components/Icon';
import RenderToast from '../components/RenderToast';
import { getRandomNumber } from '../utils';
import { contrastColor, contrastTransColor } from '../themes/styles';

const WrapperWidth = Dimensions.get('window').width * 0.82;

function PlaybackControl(props) {
	const { media, currentTrack, isPlaying, loop, shuffle } = props;

	function skipForward() {
		let nextTrack = shuffle
			? media[getRandomNumber(0, media.length)]
			: currentTrack.index === media.length - 1
			? media[0]
			: media[currentTrack.index + 1];
		props.setCurrentTrack(nextTrack);
	}

	function skipBackward() {
		let nextTrack = shuffle
			? media[getRandomNumber(0, media.length)]
			: currentTrack.index === 0
			? media[media.length - 1]
			: media[currentTrack.index - 1];
		props.setCurrentTrack(nextTrack);
	}

	function onShufflePress() {
		RenderToast(`Shuffle: ${shuffle ? 'Off' : 'On'}`);
		props.setShuffle(!shuffle);
	}

	function onLoopPress() {
		RenderToast(`Loop ${loop ? 'all tracks' : 'this track'}`);
		props.setLoop(!loop);
	}

	return (
		<MainWrapper>
			<TouchableWithoutFeedback onPress={onShufflePress}>
				<IconWrapper>
					{shuffle ? <TransIcon {...icons.shuffle} /> : <DisabledIcon {...icons.shuffle} />}
				</IconWrapper>
			</TouchableWithoutFeedback>
			<StyledIcon {...icons.skipBackward} onPress={skipBackward} />
			<TouchableWithoutFeedback onPress={() => props.setPlayback(!isPlaying)}>
				<PlayWrapper>
					{isPlaying ? <StyledIcon {...icons.pause} /> : <StyledIcon {...icons.play} />}
				</PlayWrapper>
			</TouchableWithoutFeedback>
			<StyledIcon {...icons.skipForward} onPress={skipForward} />
			<TouchableWithoutFeedback onPress={onLoopPress}>
				<IconWrapper>
					{loop ? <TransIcon {...icons.loopOne} /> : <TransIcon {...icons.loop} />}
				</IconWrapper>
			</TouchableWithoutFeedback>
		</MainWrapper>
	);
}

function mapStateToProps(state) {
	return {
		media: state.media.mediaFiles,
		currentTrack: state.playback.currentTrack,
		isPlaying: state.player.isPlaying,
		loop: state.playback.loop,
		shuffle: state.playback.shuffle
	};
}

export default connect(mapStateToProps, actions)(PlaybackControl);

const MainWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: ${WrapperWidth + 10}px;
`;

const PlayWrapper = styled.View`
	justify-content: center;
	align-items: center;
	border-width: 3px;
	border-radius: 30px;
	width: 60px;
	height: 60px;
	border-color: ${contrastColor};
`;

const StyledIcon = styled(Icon)`
	color: ${contrastColor};
	padding: 5px;
`;

const TransIcon = styled(Icon)`
	color: ${contrastTransColor(0.75)};
`;

const DisabledIcon = styled(Icon)`
	color: ${contrastTransColor(0.35)};
`;

const IconWrapper = styled.View`
	height: 28px;
	width: 28px;
	border-radius: 14px;
	justify-content: center;
	align-items: center;
`;

const icons = {
	play: {
		name: 'play-arrow',
		type: 'material',
		size: 32
	},
	pause: {
		name: 'pause',
		type: 'material',
		size: 32
	},
	skipForward: {
		name: 'step-forward',
		type: 'fontisto',
		size: 20
	},
	skipBackward: {
		name: 'step-backwrad',
		type: 'fontisto',
		size: 20
	},
	loop: {
		name: 'repeat',
		type: 'material',
		size: 22
	},
	loopOne: {
		name: 'repeat-one',
		type: 'material',
		size: 22
	},
	shuffle: {
		name: 'shuffle',
		type: 'feather',
		size: 17
	}
};
