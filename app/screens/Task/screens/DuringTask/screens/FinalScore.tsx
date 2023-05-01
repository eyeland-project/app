import { View, Text, StyleSheet, Platform } from 'react-native';
import Option from '@screens/Task/components/Option';
import LottieView from 'lottie-react-native';

import { useEffect } from 'react';
import useTheme from '@hooks/useTheme';
import { useDuringTaskContext } from '@app/core/hooks/Task/DurinTask/useDuringTaskContext';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';
import { useNavigation } from '@react-navigation/native';
import usePlaySound from '@app/core/hooks/usePlaySound';

import { Theme } from '@theme';

const FinalScore = () => {
	const theme = useTheme();
	const { position, team } = useDuringTaskContext();
	const { taskOrder } = useTaskContext();
	const navigation = useNavigation<any>();
	const playSoundSuccess = usePlaySound(require('@sounds/complete.wav'));
	const styles = getStyles(theme);
	const currentPlatform = Platform.OS;

	const onButtonPress = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'Introduction', params: { taskOrder } }]
		});
	};

	useEffect(() => {
		playSoundSuccess();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Resultados finales</Text>
			<View>
				<Text style={styles.position}>{position || 0}°</Text>
				<Text style={styles.groupName}>{team?.name || 'Ocelots'}</Text>
				{
					currentPlatform !== 'web' && (
						<LottieView
							source={require('@animations/celebration.json')}
							autoPlay
							loop
							style={{
								width: 500,
								position: 'absolute',
								top: -80,
								alignItems: 'center',
								alignSelf: 'center'
							}}
						/>
					)
				}
			</View>
			<View>
				<Option
					text="Volver al menú"
					onPress={() => {
						onButtonPress();
					}}
					containerStyle={{}}
					textStyle={{
						fontFamily: theme.fontWeight.regular,
						fontSize: theme.fontSize.xl
					}}
				/>
				<View style={styles.safeSpace} />
			</View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.white,
			justifyContent: 'space-between'
		},
		title: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xxxl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			marginBottom: 80,
			textAlign: 'center'
		},
		position: {
			color: theme.colors.black,
			fontSize: 150,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			marginBottom: -90
		},
		groupName: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xxxxxxl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center'
		},
		safeSpace: {
			height: 80
		}
	});

export default FinalScore;
