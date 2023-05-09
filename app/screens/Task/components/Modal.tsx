import { View, Text, Modal as ModalNative, StyleSheet } from 'react-native';
import Option from './Option';
import React from 'react';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	showModal: boolean;
	closeModal: () => void;
	correct?: boolean;
	help: string;
}

const Modal = ({ showModal, correct, closeModal, help }: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<ModalNative
			animationType="fade"
			transparent={true}
			visible={showModal}
			onRequestClose={closeModal}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalView}>
					<Text style={styles.modalTitleText}>
						{correct
							? '¡Respuesta correcta! '
							: '¡Respuesta incorrecta!'}
					</Text>
					<View style={styles.helpContainer}>
						<View style={styles.iconContainer}>
							<Text style={styles.iconText}>Ayuda:</Text>
						</View>
						<Text style={styles.helpText}>{help}</Text>
					</View>
					<Option
						text="Reintentar"
						onPress={closeModal}
						containerStyle={{ marginBottom: 10 }}
						textStyle={{
							fontFamily: theme.fontWeight.regular,
							fontSize: theme.fontSize.large
						}}
					/>
				</View>
			</View>
		</ModalNative>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		modalContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'rgba(0, 0, 0, 0.5)'
		},
		modalView: {
			backgroundColor: theme.colors.white,
			borderRadius: theme.borderRadius.medium,
			paddingHorizontal: 20,
			marginHorizontal: 20,
			paddingVertical: 10
		},
		modalTitleText: {
			fontSize: theme.fontSize.xxl,
			fontFamily: theme.fontWeight.bold,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			marginBottom: 10
		},
		helpContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginBottom: 40
		},
		iconContainer: {
			backgroundColor: theme.colors.yellow,
			borderColor: theme.colors.black,
			borderWidth: 1,
			borderRadius: theme.borderRadius.small,
			paddingHorizontal: 5,
			marginEnd: 10,
			marginBottom: 10
		},
		iconText: {
			fontSize: theme.fontSize.medium,
			fontFamily: theme.fontWeight.regular,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium
		},
		helpText: {
			fontSize: theme.fontSize.medium,
			fontFamily: theme.fontWeight.regular,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium
		}
	});

export default Modal;
