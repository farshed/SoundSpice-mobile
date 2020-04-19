import React, { useState, useEffect } from 'react';
import { ScrollView, Switch, Linking } from 'react-native';
import { withTheme } from 'styled-components/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Share from 'react-native-share';
import ListItem from '../components/ListItem';
import InputDialog from '../components/InputDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import { clearCache } from '../utils/FileSystem';
import { settings } from '../constants';

function SettingsScreen(props) {
	const [isInputVisible, setInputVisible] = useState(false);
	const [isDialogVisible, setDialogVisible] = useState(false);

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.hideFooter);
		return unsubscribe;
	}, [props.navigation]);

	async function onConfirmClear() {
		setDialogVisible(false);
		await clearCache();
		props.getMedia();
	}

	function onInputSave(val) {
		if (props.foldersToSkip !== val) {
			props.setSkipFolders(val);
			props.getMedia();
		}
		setInputVisible(false);
	}

	function onPressReport() {
		Linking.openURL(
			'mailto:faisalarshed28@gmail.com?subject=SoundSpice bug report&body=Device Manufacturer %26 Model: \n\nYour issue: %20'
		);
	}

	function onPressShare() {
		Share.open({
			message:
				'Hey! Check out SoundSpice\nhttps://play.google.com/store/apps/details?id=com.vynilla'
		});
	}

	const { current, elevatedBG, foreground, fgTrans } = props.theme;
	const darkModeThumbColor = current === 'light' ? elevatedBG : foreground;
	const skippedFolders = props.foldersToSkip.join(', ');
	return (
		<ScrollView style={{ flex: 1 }}>
			<ListItem
				iconProps={icons.darkMode}
				title={settings.darkMode.title}
				subtitle={settings.darkMode.subtitle}
				rightElement={
					<Switch
						thumbColor={darkModeThumbColor}
						value={current === 'dark'}
						trackColor={{ true: `${fgTrans}0.5)` }}
						onValueChange={(val) => props.setTheme(val ? 'dark' : 'light')}
					/>
				}
			/>

			<ListItem
				iconProps={icons.scan}
				title={settings.excludeFolders.title}
				onPress={() => setInputVisible(true)}
				subtitle={skippedFolders}
			/>

			<ListItem
				iconProps={icons.delete}
				title={settings.clearCache.title}
				onPress={() => setDialogVisible(true)}
				subtitle={settings.clearCache.subtitle}
			/>

			<ListItem
				iconProps={icons.rearrange}
				title={settings.changeOrder.title}
				onPress={() => props.navigation.navigate('tab-order')}
				subtitle={settings.changeOrder.subtitle}
			/>

			<ListItem
				iconProps={icons.bug}
				title={settings.reportABug.title}
				onPress={onPressReport}
				subtitle={settings.reportABug.subtitle}
			/>

			<ListItem iconProps={icons.share} title={settings.share} onPress={onPressShare} />

			<ListItem
				iconProps={icons.about}
				title={settings.about.title}
				onPress={() => props.navigation.navigate('about')}
				subtitle={settings.about.subtitle}
			/>

			<InputDialog
				isVisible={isInputVisible}
				onPressSave={onInputSave}
				onPressCancel={() => setInputVisible(false)}
				inputPlaceholder={settings.excludeFoldersDialog.placeholder}
				title={settings.excludeFoldersDialog.title}
				name={skippedFolders}
				saveButtonTitle="Save"
				description={settings.excludeFoldersDialog.description}
			/>

			<ConfirmDialog
				isVisible={isDialogVisible}
				title={settings.clearCacheConfirm.title}
				buttonTitle="Clear"
				description={settings.clearCacheConfirm.subtitle}
				onCancel={() => setDialogVisible(false)}
				onConfirm={onConfirmClear}
				cancelButton
			/>
		</ScrollView>
	);
}

function mapStateToProps({ settings }) {
	return {
		foldersToSkip: settings.foldersToSkip
	};
}

export default connect(mapStateToProps, actions)(withTheme(SettingsScreen));

const icons = {
	darkMode: {
		name: 'moon',
		type: 'feather',
		size: 28
	},
	scan: {
		name: 'folder-search-outline',
		type: 'material-community',
		size: 28
	},
	delete: {
		name: 'trash-2',
		type: 'feather',
		size: 28
	},
	musicFile: {
		name: 'rocket',
		type: 'simple-line-icon',
		size: 26
	},
	rearrange: {
		name: 'menu',
		type: 'feather',
		size: 26
	},
	about: {
		name: 'infocirlceo',
		type: 'antdesign',
		size: 26
	},
	bug: {
		name: 'bug',
		type: 'entypo',
		size: 26
	},
	share: {
		name: 'share-2',
		type: 'feather',
		size: 26
	}
};
