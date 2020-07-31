import React from 'react';
import { View, FlatList, Animated, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const ScreenWidth = Dimensions.get('window').width;

class QuickScrollList extends React.Component {
	static defaultProps = {
		flashDuration: 40,
		flashOutDuration: 2000,
		rightOffset: 10,
		thumbHeight: 60,
		hiddenPosition: ScreenWidth + 10,
		touchAreaWidth: 25,
		thumbStyle: {},
		scrollbarStyle: {},
		containerStyle: {}
	};

	position = new Animated.Value(0);
	scrollBar = new Animated.Value(ScreenWidth);
	flatlistRef = React.createRef();
	disableOnScrollEvent = false;

	createRef = (ref) => {
		this.flatlistRef = ref;
		this.props.ref && this.props.ref(ref);
	};

	onThumbDrag = (event) => {
		const { data, itemHeight, thumbHeight, viewportHeight } = this.props;
		const availableHeight = viewportHeight - thumbHeight;
		const positionY = this.position.__getValue();
		const gestureY = event.nativeEvent.absoluteY;
		if (gestureY >= 0 && gestureY <= availableHeight) {
			this.disableOnScrollEvent = true;
			const thumbPos = (positionY / (viewportHeight - thumbHeight)).toFixed(3);
			let lastIndex = data.length - Math.floor(viewportHeight / itemHeight) + 1;
			let index = Math.floor(lastIndex * thumbPos);
			if (index > lastIndex) index = lastIndex;
			if (index < 0) index = 0;
			Animated.event([{ nativeEvent: { absoluteY: this.position } }])(event);
			this.flatlistRef.scrollToIndex({
				index,
				viewPosition: 0,
				animated: true
			});
		}
	};

	moveThumbOnScroll = (e) => {
		if (this.disableOnScrollEvent) {
			this.disableOnScrollEvent = false;
			return;
		}
		const { itemHeight, data, thumbHeight, viewportHeight } = this.props;
		const listHeight = data.length * itemHeight;
		const endPosition = listHeight - viewportHeight;
		const offsetY = e.nativeEvent.contentOffset.y;
		const diff = (viewportHeight - thumbHeight) / endPosition;
		this.position.setValue(offsetY * diff);
	};

	flashScrollBar = () => {
		const { flashDuration, rightOffset } = this.props;
		Animated.timing(this.scrollBar, {
			toValue: ScreenWidth - rightOffset,
			duration: flashDuration,
			useNativeDriver: true
		}).start();
	};

	onScroll = (event, gesture) => {
		this.flashScrollBar();
		this.moveThumbOnScroll(event);
		this.props.onScroll && this.props.onScroll(event, gesture);
	};

	onScrollGlideEnd = (event, gesture) => {
		const { flashDuration, flashOutDuration } = this.props;
		const flashOut = Animated.timing(this.scrollBar, {
			toValue: this.props.hiddenPosition,
			duration: flashDuration,
			useNativeDriver: true
		});
		setTimeout(() => flashOut.start(), flashOutDuration);
		this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(event, gesture);
	};

	convertStyle(prop) {
		if (Array.isArray(prop)) {
			let propObj = {};
			prop.forEach((val) => {
				propObj = { ...propObj, ...val };
			});
			return propObj;
		}
		return prop;
	}

	render() {
		//prettier-ignore
		const { thumbHeight, thumbStyle, scrollbarStyle, containerStyle, viewportHeight, touchAreaWidth } = this.props;
		const rightOffset = { transform: [{ translateX: this.scrollBar }] };
		const thumbTransform = { transform: [{ translateY: this.position }] };
		return (
			<View style={[styles.mainWrapper, this.convertStyle(containerStyle)]}>
				<FlatList
					{...this.props}
					ref={this.createRef}
					onScroll={this.onScroll}
					onScrollEndDrag={this.onScrollEnd}
					onMomentumScrollEnd={this.onScrollGlideEnd}
					showsVerticalScrollIndicator={false}
					onScrollToIndexFailed={() => {}}
				/>
				<Animated.View
					style={[
						styles.scrollBar,
						rightOffset,
						{ height: viewportHeight },
						this.convertStyle(scrollbarStyle)
					]}>
					<PanGestureHandler
						onGestureEvent={this.onThumbDrag}
						hitSlop={{ left: touchAreaWidth }}
						maxPointers={1}>
						<Animated.View
							style={[
								styles.thumb,
								thumbTransform,
								{ height: thumbHeight },
								this.convertStyle(thumbStyle)
							]}
						/>
					</PanGestureHandler>
				</Animated.View>
			</View>
		);
	}
}

export default QuickScrollList;

const styles = {
	mainWrapper: {
		flex: 1
	},
	scrollBar: {
		position: 'absolute',
		width: 10,
		backgroundColor: 'transparent',
		alignItems: 'center'
	},
	thumb: {
		width: 4,
		borderRadius: 4,
		backgroundColor: '#4C4C4C',
		elevation: 2
	}
};
