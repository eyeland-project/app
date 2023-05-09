import { View, Text, StyleSheet, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import Option from '@screens/Task/components/Option';

import { useEffect } from 'react';
import useTaskContext from '@hooks/Task/useTaskContext';
import useTheme from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import usePlaySound from '@hooks/usePlaySound';
import usePosTask from '@hooks/Task/PosTask/usePosTask';

import { Theme } from '@theme';

const Complete = () => {
	const theme = useTheme();
	const { taskOrder } = useTaskContext();
	const { setPosTaskComplete } = usePosTask();
	const navigation = useNavigation<any>();
	const playSoundSuccess = usePlaySound(require('@sounds/complete.wav'));
	const styles = getStyles(theme);
	const currentPlatform = Platform.OS;

	const onButtonPress = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'Home' }]
		});
	};

	useEffect(() => {
		setPosTaskComplete({ taskOrder });
		playSoundSuccess();
	}, []);

	return (
		<View style={styles.container}>
			<View>
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
				<Text style={styles.text}>
					¡Felicidades, has terminado este módulo!
				</Text>
			</View>
			{
				currentPlatform !== 'web' && (
					<LottieView
						source={require('@animations/winningCup.json')}
						autoPlay
						loop={false}
					/>
				)
			}
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
			backgroundColor: theme.colors.white,
			height: '100%',
			justifyContent: 'space-between'
		},
		text: {
			fontSize: theme.fontSize.xxxxxxl,
			fontFamily: theme.fontWeight.bold,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium,
			marginHorizontal: 20,
			marginTop: 20,
			textAlign: 'center'
		},
		safeSpace: {
			height: 80
		},
		animationsContainer: {
			alignItems: 'center',
			position: 'relative'
		}
	});

export default Complete;
