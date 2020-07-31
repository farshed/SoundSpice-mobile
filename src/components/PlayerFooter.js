import React from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
import * as navigation from '../navigation/NavigationService';
import ProgressBar from '../components/ProgressBar';
import Icon from '../components/Icon';
import { contrastColor, elevatedBGColor, contrastTransColor } from '../themes/styles';
const placeholder = require('../../assets/placeholder.jpg');

const SCREEN_WIDTH = Dimensions.get('window').width;

function PlayerFooter(props) {
	const { isPlaying, renderFooter, currentTrack, theme } = props;
	const { position, duration } = useTrackPlayerProgress(100);

	function togglePlayback() {
		props.setPlayback(!isPlaying);
	}

	const progress = position / duration;
	const coverSrc = currentTrack.artwork ? { uri: currentTrack.artwork } : placeholder;
	return renderFooter && currentTrack.id !== '000' ? (
		<TouchableWithoutFeedback onPress={() => navigation.navigate('player')}>
			<MainWrapper>
				<Thumbnail source={coverSrc} />
				<TextWrapper>
					<Title numberOfLines={1}>{currentTrack.title || 'unknown'}</Title>
					<Artist numberOfLines={1}>{currentTrack.artist || 'unknown'}</Artist>
				</TextWrapper>
				{isPlaying ? (
					<StyledIcon {...icons.pauseIcon} onPress={togglePlayback} />
				) : (
					<StyledIcon {...icons.playIcon} onPress={togglePlayback} />
				)}
				<ProgressWrapper>
					<Progress
						progress={isNaN(progress) ? 0 : +progress.toFixed(3)}
						color={theme.foreground}
					/>
				</ProgressWrapper>
			</MainWrapper>
		</TouchableWithoutFeedback>
	) : null;
}

function mapStateToProps(state) {
	return {
		renderFooter: state.footer.footerVisible,
		currentTrack: state.playback.currentTrack,
		isPlaying: state.player.isPlaying
	};
}

export default connect(mapStateToProps, actions)(withTheme(PlayerFooter));

const MainWrapper = styled.View`
	height: 60px;
	position: absolute;
	left: 0px;
	right: 0px;
	bottom: 50px;
	flex-direction: row;
	align-items: center;
	padding-left: 15px;
	background-color: ${elevatedBGColor};
`;

const Thumbnail = styled.Image`
	height: 42px;
	width: 42px;
	border-radius: 21px;
`;

const TextWrapper = styled.View`
	height: 75%;
	flex: 1;
	flex-direction: column;
	justify-content: space-evenly;
	margin-left: 15px;
`;

const Title = styled.Text`
	font-family: 'CircularBold';
	font-size: 14px;
	color: ${contrastColor};
	width: ${SCREEN_WIDTH / 2}px;
`;

const Artist = styled.Text`
	font-family: 'CircularLight';
	font-size: 12px;
	color: ${contrastTransColor(0.8)};
	width: ${SCREEN_WIDTH / 2}px;
`;

const StyledIcon = styled(Icon)`
	color: ${contrastColor};
	padding: 18px;
`;

const ProgressWrapper = styled.View`
	position: absolute;
	top: 0;
`;

const Progress = styled(ProgressBar)`
	height: 2px;
	width: ${SCREEN_WIDTH}px;
	background-color: ${contrastTransColor(0.1)};
`;

const icons = {
	playIcon: {
		name: 'play-arrow',
		type: 'material',
		size: 24
	},
	pauseIcon: {
		name: 'pause',
		type: 'material',
		size: 24
	}
};
