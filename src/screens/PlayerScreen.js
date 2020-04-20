import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ProgressSlider from '../components/ProgressSlider';
import PlaybackControl from '../components/PlaybackControl';
import CoverArt from '../components/CoverArt';
import Icon from '../components/Icon';
import OptionsMenu from '../components/OptionsMenu';
import { backgroundColor, bgTransColor, contrastTransColor, contrastColor } from '../themes/styles';

const PlayerWidth = Dimensions.get('window').width * 0.82;

function PlayerScreen(props) {
	const { navigation, currentTrack, theme } = props;
	useEffect(() => {
		let unsubscribe = navigation.addListener('focus', props.hideFooter);
		return unsubscribe;
	}, [navigation]);

	return (
		<Background source={{ uri: currentTrack.artwork }} blurRadius={40}>
			<Gradient colors={[`${theme.bgTrans}0.35)`, `${theme.bgTrans}0.8)`]}>
				<Header>
					<StyledIcon {...icons.collapse} onPress={navigation.goBack} />
					<HeaderText>now playing</HeaderText>
					<OptionsMenu target={<StyledIcon {...icons.options} />} currentItem={currentTrack} />
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
		currentTrack: state.playback.currentTrack
	};
}

export default connect(mapStateToProps, actions)(withTheme(PlayerScreen));

const Gradient = styled(LinearGradient)`
	flex: 1;
	justify-content: center;
	align-items: center;
	/* background-color: ${bgTransColor(0.15)}; */
`;

const Background = styled.ImageBackground`
	flex: 1;
	background-color: ${backgroundColor};
`;

const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: ${PlayerWidth + 10}px;
	margin-top: 10px;
`;

const HeaderText = styled.Text`
	font-family: 'Circular';
	font-size: 15px;
	color: ${contrastTransColor(0.75)};
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
	color: ${contrastColor};
	width: ${PlayerWidth}px;
	text-align: center;
`;

const Artist = styled.Text`
	font-family: 'CircularLight';
	font-size: 15px;
	margin-top: 4px;
	color: ${contrastTransColor(0.75)};
	width: ${PlayerWidth}px;
	text-align: center;
`;

const StyledIcon = styled(Icon)`
	color: ${contrastTransColor(0.75)};
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
