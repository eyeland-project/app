import {
	View,
	Text,
	Modal as ModalNative,
	StyleSheet,
	Platform
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	showModal: boolean;
	closeModal: () => void;
}

const LoadingModal = ({ showModal, closeModal }: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);
	const currentPlatform = Platform.OS;

	return (
		<ModalNative
			animationType="fade"
			transparent={true}
			visible={showModal}
			onRequestClose={closeModal}
			accessible={true}
			accessibilityLabel="Retroalimentación"
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalView}>
					{currentPlatform !== 'web' && (
						<LottieView
							source={require('@assets/animations/waitingPigeon.json')}
							autoPlay
							loop
							style={{ width: 150, height: 150 }}
						/>
					)}
					<Text style={styles.modalTitleText}>Cargando...</Text>
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
			// flexDirection: 'row',
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

export default LoadingModal;
