import React from 'react';
import { TouchableNativeFeedback as Touchable, Dimensions } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from './Icon';
import { contrastColor, foregroundColor, contrastTransColor } from '../themes/styles';
const placeholder = require('../../assets/placeholder.jpg');

const SCREEN_WIDTH = Dimensions.get('window').width;

const RenderTrack = React.memo(
	(props) => {
		const { item, currentTrack, setCurrentTrack, setOptions, theme } = props;

		function onTrackPress() {
			if (item.id !== currentTrack.id) setCurrentTrack(item);
		}

		const coverSrc = item.artwork ? { uri: item.artwork } : placeholder;
		return (
			<Touchable
				onPress={onTrackPress}
				background={Touchable.Ripple(`${theme.contrastTrans}0.1)`, false)}>
				<MainWrapper>
					<Thumbnail source={coverSrc} />
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
		currentTrack: state.playback.currentTrack
	};
}

export default connect(mapStateToProps, actions)(withTheme(RenderTrack));

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
	border-radius: 2px;
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
