import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Dialog from 'react-native-dialog';
import styled, { withTheme } from 'styled-components/native';
import { contrastColor, foregroundColor, foreground2Color } from '../themes/styles';

function InputDialog(props) {
	const { isVisible, name, inputPlaceholder, saveButtonTitle, title, description, theme } = props;
	const [input, setInput] = useState('');

	useEffect(() => {
		if (isVisible && name) setInput(name);
		return () => setInput('');
	}, [isVisible]);

	function onSave() {
		props.onPressSave(input.trim());
	}

	function onCancel() {
		props.onPressCancel();
	}

	const { contrast, foreground, elevatedBG } = theme;

	return (
		<Dialog.Container
			visible={isVisible}
			backdropColor="black"
			onBackButtonPress={onCancel}
			onBackdropPress={onCancel}
			contentStyle={{ backgroundColor: elevatedBG }}>
			<DialogTitle>{title}</DialogTitle>
			{description ? <DialogDescription>{description}</DialogDescription> : null}
			<DialogInput
				placeholder={inputPlaceholder}
				placeholderTextColor={contrast}
				autoCorrect={false}
				onChangeText={(val) => setInput(val)}
				selectionColor={foreground}
				value={input}
				autoFocus
			/>
			<Dialog.Button label="Cancel" color={contrast} onPress={onCancel} />
			<Dialog.Button label={saveButtonTitle} color={foreground} onPress={onSave} />
		</Dialog.Container>
	);
}

export default connect(null, actions)(withTheme(InputDialog));

const DialogTitle = styled(Dialog.Title)`
	font-family: 'ProductSans';
	margin-left: 10px;
	color: ${foreground2Color};
`;

const DialogDescription = styled(Dialog.Description)`
	font-family: 'ProductSans';
	margin-left: 10px;
	margin-right: 10px;
	color: ${contrastColor};
`;

const DialogInput = styled(Dialog.Input)`
	color: ${contrastColor};
	font-family: 'ProductSans';
	border-bottom-width: 1px;
	border-bottom-color: ${foregroundColor};
`;
