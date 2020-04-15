import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ProgressSlider from '../components/ProgressSlider';
import PlaybackControl from '../components/PlaybackControl';
import CoverArt from '../components/CoverArt';
import Icon from '../components/Icon';
import RenderToast from '../components/RenderToast';

const ScreenWidth = Dimensions.get('window').width;

function PlayerScreen(props) {
	const { navigation, currentTrack } = props;
	useEffect(() => {
		let unsubscribe = navigation.addListener('focus', props.hideFooter);
		return unsubscribe;
	}, [navigation]);

	async function onLyricsPress() {
		let { isConnected } = await NetInfo.fetch();
		if (isConnected || currentTrack.lyrics) navigation.navigate('lyrics');
		else RenderToast('No internet connection');
	}

	return (
		<Background source={{ uri: currentTrack.artwork }} blurRadius={25}>
			<Gradient colors={['rgba(0, 0, 0, 0)', '#000']} location={[0.75, 1]}>
				<Header>
					<StyledIcon {...icons.collapse} onPress={navigation.goBack} />
					<HeaderText>now playing</HeaderText>
					<StyledIcon {...icons.options} />
				</Header>
				<Wrapper>
					<CoverArt src={currentTrack.artwork} />
					<TextWrapper>
						<Title numberOfLines={1}>{currentTrack.title || 'unknown'}</Title>
						<Artist numberOfLines={1}>{currentTrack.artist}</Artist>
					</TextWrapper>
					<ProgressSlider />
					<PlaybackControl />
				</Wrapper>
			</Gradient>
		</Background>
	);
}

function mapStateToProps(state) {
	return {
		currentTrack: state.playback.currentTrack,
		playbackMode: state.playback.playbackMode
	};
}

export default connect(mapStateToProps, actions)(PlayerScreen);

const Gradient = styled(LinearGradient)`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.15);
`;

const Background = styled.ImageBackground`
	flex: 1;
`;

const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: ${ScreenWidth * 0.85 + 10}px;
	margin-top: 10px;
`;

const HeaderText = styled.Text`
	font-family: 'Circular';
	font-size: 15px;
	color: rgba(255, 255, 255, 0.75);
`;

const Wrapper = styled.View`
	flex: 1;
	justify-content: space-evenly;
	align-items: center;
`;

const TextWrapper = styled.View`
	justify-content: center;
	align-items: center;
`;

const Title = styled.Text`
	font-family: 'CircularBold';
	font-size: 18px;
	margin: 0 20px 4px 20px;
	color: white;
`;

const Artist = styled.Text`
	font-family: 'CircularLight';
	font-size: 15px;
	margin-top: 4px;
	color: rgba(255, 255, 255, 0.75);
`;

const StyledIcon = styled(Icon)`
	color: rgba(255, 255, 255, 0.75);
	padding: 5px;
`;

const icons = {
	collapse: {
		name: 'chevron-down',
		type: 'feather',
		size: 26
	},
	options: {
		name: 'more-horizontal',
		type: 'feather',
		size: 26
	}
};