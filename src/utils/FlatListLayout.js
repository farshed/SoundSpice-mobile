import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const itemWidth = SCREEN_WIDTH / 2 - 35;
const itemHeight = itemWidth + itemWidth / 6;

export const flatListItemLayout = function (data, index) {
	return { length: 75, offset: 75 * index, index };
};

export const flatListCardLayout = function (data, index) {
	return { length: itemHeight, offset: (itemHeight + 20) * index, index };
};
