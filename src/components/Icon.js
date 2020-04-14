import React from 'react';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function Icon(props) {
	const BrandedIcon = getType(props.type);
	return <BrandedIcon {...props} />;
}

function getType(type) {
	switch (type) {
		case 'zocial':
			return ZocialIcon;
		case 'octicon':
			return OcticonIcon;
		case 'material':
			return MaterialIcon;
		case 'material-community':
			return MaterialCommunityIcon;
		case 'fontisto':
			return Fontisto;
		case 'ionicon':
			return Ionicon;
		case 'foundation':
			return FoundationIcon;
		case 'evilicon':
			return EvilIcon;
		case 'entypo':
			return EntypoIcon;
		case 'font-awesome':
			return FAIcon;
		case 'font-awesome-5':
			return FA5Icon;
		case 'simple-line-icon':
			return SimpleLineIcon;
		case 'feather':
			return FeatherIcon;
		case 'antdesign':
			return AntIcon;
		default:
			return MaterialIcon;
	}
}
