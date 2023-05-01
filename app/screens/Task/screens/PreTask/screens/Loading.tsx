import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import ErrorScreen from '@components/ErrorScreen';

import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import usePreTask from '@app/core/hooks/Task/PreTask/usePreTask';
import useTheme from '@hooks/useTheme';
import usePreTaskContext from '@app/core/hooks/Task/PreTask/usePreTaskContext';

import { Theme } from '@theme';

const Loading = ({ route }: { route: any }) => {
	const { taskOrder } = route.params;
	const theme = useTheme();
	const { getPreTask, data, error, loading, nextQuestion } = usePreTask();
	const { setData, data: dataContext } = usePreTaskContext();
	const styles = getStyles(theme);

	useFocusEffect(
		useCallback(() => {
			const getQuestion = async () => {
				const data = await getPreTask({ taskOrder });
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
					getPreTask({ taskOrder });
				}}
			/>
		);

	return (
		<View style={styles.container}>
			<View accessible={true} accessibilityLabel="Cargando">
				<LottieView
					source={require('@animations/loading.json')}
					autoPlay
					loop
					style={styles.animation}
				/>
			</View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.white
		},
		animation: {
			width: 200,
			height: 200,
			alignSelf: 'center',
			marginTop: 100
		}
	});

export default Loading;
