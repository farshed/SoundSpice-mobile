import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function Icon(props) {
	const BrandedIcon = getType(props.type);
	return <BrandedIcon {...props} />;
}

function getType(type) {
	switch (type) {
		case 'feather':
			return FeatherIcon;
		case 'material':
			return MaterialIcon;
		case 'material-community':
			return MaterialCommunityIcon;
		case 'fontisto':
			return Fontisto;
		case 'entypo':
			return EntypoIcon;
		case 'simple-line-icon':
			return SimpleLineIcon;
		case 'antdesign':
			return AntDesign;
		default:
			return MaterialIcon;
	}
}
