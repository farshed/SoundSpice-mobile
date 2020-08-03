import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
		default:
			return;
	}
}
