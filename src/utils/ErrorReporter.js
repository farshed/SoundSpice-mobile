import { Alert, Linking } from 'react-native';

export default function (e) {
	Alert.alert(
		'Oops! an error ocurred',
		'Send crash logs to developers?',
		[{ text: 'Send', onPress: () => mailError(e) }],
		{ cancelable: false }
	);
}

function mailError(e) {
	Linking.openURL(
		`mailto:faisalarshed28@gmail.com?subject=SoundSpice error log&body=LOG\n\n${JSON.stringify(
			e
		)}`
	);
}
