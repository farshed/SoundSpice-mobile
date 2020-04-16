import { ToastAndroid } from 'react-native';

export default function RenderToast(message) {
	ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300);
}
