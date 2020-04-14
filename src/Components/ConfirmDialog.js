import React from 'react';
import Dialog from 'react-native-dialog';
import styled, { withTheme } from 'styled-components/native';
import { foreground2Color, contrastColor } from '../themes/styles';

function ConfirmDialog(props) {
	const { title, description, buttonTitle, isVisible, onCancel, cancelButton } = props;
	const { foreground, contrast, elevatedBG, backdrop } = props.theme;
	return (
		<Dialog.Container
			visible={isVisible}
			backdropColor={backdrop}
			onBackButtonPress={onCancel}
			onBackdropPress={onCancel}
			contentStyle={{ backgroundColor: elevatedBG }}>
			<DialogTitle>{title}</DialogTitle>
			<DialogDescription>{description}</DialogDescription>
			{cancelButton ? (
				<Dialog.Button label="Cancel" color={contrast} onPress={onCancel} />
			) : null}
			<Dialog.Button label={buttonTitle} color={foreground} onPress={props.onConfirm} />
		</Dialog.Container>
	);
}

export default withTheme(ConfirmDialog);

const DialogTitle = styled(Dialog.Title)`
	color: ${foreground2Color};
`;

const DialogDescription = styled(Dialog.Description)`
	color: ${contrastColor};
`;
