import { View, StyleSheet, ActivityIndicator, Platform, Text } from 'react-native';
import ErrorScreen from '@components/ErrorScreen';
import LottieView from 'lottie-react-native';

import React, { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import usePosTask from '@app/core/hooks/Task/PosTask/usePosTask';
import useTheme from '@hooks/useTheme';
import { usePosTaskContext } from '@app/core/hooks/Task/PosTask/usePosTaskContext';

import { Theme } from '@theme';

const Loading = ({ route }: { route: any }) => {
	const { taskOrder } = route.params;
	const theme = useTheme();
	const { getPosTask, data, nextQuestion, error } = usePosTask();
	const { setData, data: dataContext } = usePosTaskContext();
	const styles = getStyles(theme);
	const currentPlatform = Platform.OS;

	useFocusEffect(
		useCallback(() => {
			const getQuestion = async () => {
				const data = await getPosTask({ taskOrder });
				if (data) {
					setData(data);
				}
			};
			getQuestion();
		}, [])
	);

	useEffect(() => {
		if (dataContext) {
			nextQuestion();
		}
	}, [dataContext]);

	if (error)
		return (
			<ErrorScreen
				error={error}
				retryAction={() => {
					getPosTask({ taskOrder });
				}}
			/>
		);

	return (
		<View style={styles.container}>
			<View accessible={true} accessibilityLabel="Cargando">
				{
					currentPlatform !== 'web' ?
						<LottieView
							source={require('@animations/loading.json')}
							autoPlay
							loop
							style={styles.animation}
						/>
						:
						<ActivityIndicator size={50} color={theme.colors.black} style={styles.animation} />

				}
			</View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.white,
			justifyContent: 'center',
		},
		animation: {
			width: 200,
			height: 200,
			alignSelf: 'center',
			// justifyContent: 'center',
		}
	});

export default Loading;
