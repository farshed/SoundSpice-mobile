/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { View, Animated } from 'react-native';

const INDETERMINATE_DURATION = 2000;
const INDETERMINATE_MAX_WIDTH = 0.6;

class ProgressBar extends React.Component {
	static defaultProps = {
		visible: true,
		progress: 0,
		theme: {
			animation: {
				scale: 1
			}
		}
	};

	state = {
		width: 0,
		timer: new Animated.Value(0),
		fade: new Animated.Value(0)
	};

	indeterminateAnimation = null;

	componentDidUpdate(prevProps) {
		const { visible, progress } = this.props;

		if (progress !== prevProps.progress || visible !== prevProps.visible) {
			if (visible) {
				this.startAnimation();
			} else {
				this.stopAnimation();
			}
		}
	}

	onLayout = (event) => {
		const { visible } = this.props;
		const { width: previousWidth } = this.state;

		this.setState({ width: event.nativeEvent.layout.width }, () => {
			if (visible && previousWidth === 0) {
				this.startAnimation();
			}
		});
	};

	startAnimation = () => {
		const {
			indeterminate,
			progress,
			theme: {
				animation: { scale }
			}
		} = this.props;
		const { fade, timer } = this.state;

		Animated.timing(fade, {
			duration: 200 * scale,
			toValue: 1,
			useNativeDriver: true,
			isInteraction: false
		}).start();

		if (indeterminate) {
			if (!this.indeterminateAnimation) {
				this.indeterminateAnimation = Animated.timing(timer, {
					duration: INDETERMINATE_DURATION,
					toValue: 1,
					useNativeDriver: true,
					isInteraction: false
				});
			}
			timer.setValue(0);
			Animated.loop(this.indeterminateAnimation).start();
		} else {
			Animated.timing(timer, {
				duration: 200 * scale,
				toValue: progress ? progress : 0,
				useNativeDriver: true,
				isInteraction: false
			}).start();
		}
	};

	stopAnimation = () => {
		const { fade } = this.state;
		const { scale } = this.props.theme.animation;

		if (this.indeterminateAnimation) {
			this.indeterminateAnimation.stop();
		}

		Animated.timing(fade, {
			duration: 200 * scale,
			toValue: 0,
			useNativeDriver: true,
			isInteraction: false
		}).start();
	};

	render() {
		const { color, indeterminate, style } = this.props;
		const { fade, timer, width } = this.state;
		const tintColor = color;
		const trackTintColor = color.replace('1', '0.2');

		return (
			<View onLayout={this.onLayout}>
				<Animated.View
					style={[
						styles.container,
						{ backgroundColor: trackTintColor, opacity: fade },
						style
					]}>
					<Animated.View
						style={[
							styles.progressBar,
							{
								backgroundColor: tintColor,
								width,
								transform: [
									{
										translateX: timer.interpolate(
											indeterminate
												? {
														inputRange: [0, 0.5, 1],
														outputRange: [
															-1 * 0.5 * width,
															-1 * 0.5 * INDETERMINATE_MAX_WIDTH * width,
															0.7 * width
														]
												  }
												: {
														inputRange: [0, 1],
														outputRange: [-1 * 0.5 * width, 0]
												  }
										)
									},
									{
										scaleX: timer.interpolate(
											indeterminate
												? {
														inputRange: [0, 0.5, 1],
														outputRange: [0.0001, INDETERMINATE_MAX_WIDTH, 0.0001]
												  }
												: {
														inputRange: [0, 1],
														outputRange: [0.0001, 1]
												  }
										)
									}
								]
							}
						]}
					/>
				</Animated.View>
			</View>
		);
	}
}

const styles = {
	container: {
		height: 4,
		overflow: 'hidden'
	},
	progressBar: {
		flex: 1
	}
};

export default ProgressBar;
