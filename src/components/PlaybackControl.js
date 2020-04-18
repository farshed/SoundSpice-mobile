import React from 'react';
import { TouchableWithoutFeedback, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from '../components/Icon';

const WrapperWidth = Dimensions.get('window').width * 0.85;

function PlaybackControl(props) {
	const {
		setCurrentTrack,
		media,
		currentTrack,
		playbackStatus,
		setPlaybackStatus,
		playbackMode
	} = props;

	function skipForward() {
		setCurrentTrack(
			currentTrack.index === media.length - 1 ? media[0] : media[currentTrack.index + 1]
		);
	}

	function skipBackward() {
		setCurrentTrack(
			currentTrack.index === 0 ? media[media.length - 1] : media[currentTrack.index - 1]
		);
	}

	function toggleMode() {
		props.togglePlaybackMode(playbackMode === 'repeat_all' ? 'repeat_one' : 'repeat_all');
	}

	return (
		<MainWrapper>
			<IconWrapper>
				<TransIcon {...icons.shuffle} />
			</IconWrapper>
			<StyledIcon {...icons.skipBackward} onPress={skipBackward} />
			{playbackStatus === 'playing' ? (
				<TouchableWithoutFeedback onPress={() => setPlaybackStatus('paused')}>
					<PlayWrapper>
						<StyledIcon {...icons.pause} />
					</PlayWrapper>
				</TouchableWithoutFeedback>
			) : (
				<TouchableWithoutFeedback onPress={() => setPlaybackStatus('playing')}>
					<PlayWrapper>
						<StyledIcon {...icons.play} />
					</PlayWrapper>
				</TouchableWithoutFeedback>
			)}
			<StyledIcon {...icons.skipForward} onPress={skipForward} />
			<TouchableWithoutFeedback onPress={toggleMode}>
				<IconWrapper>
					{playbackMode === 'repeat_one' ? (
						<TransIcon {...icons.loopOne} />
					) : (
						<TransIcon {...icons.loop} />
					)}
				</IconWrapper>
			</TouchableWithoutFeedback>
		</MainWrapper>
	);
}

function mapStateToProps(state) {
	return {
		media: state.media.mediaFiles,
		currentTrack: state.playback.currentTrack,
		playbackStatus: state.player.playbackStatus,
		playbackMode: state.playback.playbackMode
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
	border-color: #ffffff;
`;

const StyledIcon = styled(Icon)`
	color: #ffffff;
	padding: 5px;
`;

const TransIcon = styled(Icon)`
	color: rgba(255, 255, 255, 0.75);
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
