import React from 'react';
import { TouchableNativeFeedback as Touchable, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import { CoverImage } from 'react-native-get-music-files-v3dev-test';
import Icon from './Icon';
import CoverPlaceholder from './CoverPlaceholder';
import { contrastColor, foregroundColor, contrastTransColor } from '../themes/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const RenderTrack = React.memo(
	(props) => {
		const { item, currentTrack, setCurrentTrack, currentTheme, setOptions } = props;

		function onTrackPress() {
			if (item.id !== currentTrack.id) setCurrentTrack(item);
		}

		const isDark = currentTheme === 'dark';
		const rippleColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
		const placeholderFG = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
		const placeholderBG = isDark ? 'black' : 'white';
		return (
			<Touchable onPress={onTrackPress} background={Touchable.Ripple(rippleColor, false)}>
				<MainWrapper>
					{item.artwork ? (
						<Thumbnail source={{ uri: item.artwork }} />
					) : (
						<CoverPlaceholder
							size={50}
							iconSize={25}
							radius={3}
							bgColor={placeholderBG}
							fgColor={placeholderFG}
						/>
					)}
					{/* <CoverImage source={item.url} width={50} height={50} /> */}
					<TextWrapper>
						<Title numberOfLines={1} current={item.id === currentTrack.id}>
							{item.title}
						</Title>
						<Artist numberOfLines={1}>{item.artist}</Artist>
					</TextWrapper>
					<StyledIcon {...optionsIcon} onPress={() => setOptions({ visible: true, item })} />
				</MainWrapper>
			</Touchable>
		);
	},
	(prevProps, nextProps) =>
		!(
			nextProps.currentTrack.id === nextProps.item.id ||
			prevProps.currentTrack.id === prevProps.item.id ||
			prevProps.item !== nextProps.item ||
			prevProps.currentTheme !== nextProps.currentTheme
		)
);

function mapStateToProps(state) {
	return {
		currentTrack: state.playback.currentTrack,
		currentTheme: state.settings.theme
	};
}

export default connect(mapStateToProps, actions)(RenderTrack);

const MainWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	height: 65px;
	margin-top: 10px;
	padding-left: 15px;
`;

const Thumbnail = styled.Image`
	height: 50px;
	width: 50px;
	border-radius: 3px;
`;

const TextWrapper = styled.View`
	flex-direction: column;
	flex: 1;
	height: 52px;
	margin-left: 15px;
	justify-content: space-evenly;
`;

const Title = styled.Text`
	font-family: 'CircularBold';
	font-size: 14px;
	width: ${SCREEN_WIDTH / 2}px;
	color: ${(props) => (props.current ? foregroundColor(props) : contrastColor(props))};
`;

const Artist = styled.Text`
	font-family: 'CircularLight';
	font-size: 14px;
	width: ${SCREEN_WIDTH / 2}px;
	color: ${contrastTransColor(0.75)};
`;

const StyledIcon = styled(Icon)`
	color: ${contrastTransColor(0.75)};
	padding: 10px;
`;

const optionsIcon = {
	name: 'more-vertical',
	type: 'feather',
	size: 25
};
