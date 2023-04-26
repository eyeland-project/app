import { View, StyleSheet, Image, ActivityIndicator, Text } from 'react-native';
import Query from './components/Query';
import Option from '@screens/Task/components/Option';
import Placeholder from './components/Placeholder';
import PositionBar from './components/PositionBar';

import { useState, useEffect } from 'react';
import useTheme from '@hooks/useTheme';
import usePlaySound from '@hooks/usePlaySound';
import useTime from '@hooks/useTime';
import useDuringTaskQuestion from '@app/core/hooks/Task/DurinTask/useDuringTaskQuestion';
import { useDuringTaskContext } from '@app/core/hooks/Task/DurinTask/useDuringTaskContext';
import { useNavigation } from '@react-navigation/native';
import useDuringTask from '@app/core/hooks/Task/DurinTask/useDuringTask';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';

import { SocketEvents } from '@enums/SocketEvents.enum';

import { Theme } from '@theme';

interface Props {
	route: any;
}

const Question = ({ route }: Props) => {
	const { taskOrder, questionOrder } = route.params;
	const theme = useTheme();
	const navigation = useNavigation<any>();
	const [containerStyleOptions, setContainerStyleOptions] = useState([{}]);
	const [textStyleOptions, setTextStyleOptions] = useState([{}]);
	const [loadingImage, setLoadingImage] = useState(true);
	const [errorImage, setErrorImage] = useState(false);
	const { time, startTimer, stopTimer } = useTime();
	const {
		data,
		loading,
		error,
		getDuringTaskQuestion,
		sendDuringTaskAnswer
	} = useDuringTaskQuestion();
	const { power, socket, team, position, setPosition, numQuestions } =
		useDuringTaskContext();
	const { getDuringTask, data: generalData } = useDuringTask();
	const { setProgress } = useTaskContext();
	const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
	const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'));
	const styles = getStyles(theme);

	const onPressOption = async (
		index: number,
		correct: boolean,
		id: number
	) => {
		const newContainerStyleOptions = [...containerStyleOptions];
		const newTextStyleOptions = [...textStyleOptions];

		if (correct) {
			playSoundSuccess();
			stopTimer();
			newContainerStyleOptions[index] = {
				backgroundColor: theme.colors.green
			};
			newTextStyleOptions[index] = { color: theme.colors.white };
		} else {
			playSoundWrong();
			newContainerStyleOptions[index] = {
				backgroundColor: theme.colors.red
			};
			newTextStyleOptions[index] = { color: theme.colors.white };
		}

		setContainerStyleOptions(newContainerStyleOptions);
		setTextStyleOptions(newTextStyleOptions);

		await sendDuringTaskAnswer({
			taskOrder,
			questionOrder,
			body: { idOption: id, answerSeconds: time }
		}),
			navigateNextQuestion();
	};

	const navigateNextQuestion = (nextQuestion?: number) => {
		if (questionOrder === numQuestions) {
			navigation.reset({
				index: 1,
				routes: [{ name: 'FinalScore' }]
			});
		} else {
			if (numQuestions) setProgress((nextQuestion ? nextQuestion : questionOrder + 1) / numQuestions);
			navigation.pop(1);
			navigation.push('Question', {
				taskOrder,
				questionOrder: nextQuestion ? nextQuestion : questionOrder + 1
			});
		}
	};

	useEffect(() => {
		const initQuestion = async () => {
			getDuringTaskQuestion({ taskOrder, questionOrder });
			startTimer();
		};

		initQuestion();

		socket.once(
			SocketEvents.teamStudentAnswer,
			async (data: { correct: boolean; nextQuestion: number }) => {
				const { numQuestions } = await getDuringTask({ taskOrder });
				navigateNextQuestion(data.nextQuestion);
			}
		);

		socket.on(
			SocketEvents.courseLeaderboardUpdate,
			(
				data: {
					id: number;
					name: string;
					position: number;
				}[]
			) => {
				if (!team || !data) return;

				const { id } = team;
				const myTeam = data.find((team) => team.id === id);
				if (!myTeam) return;
				setPosition(myTeam.position);
			}
		);

		return () => {
			socket.off(SocketEvents.teamStudentAnswer);
		};
	}, []);

	if (loading || !data) return <Placeholder />;

	return (
		<View style={styles.container}>
			<PositionBar groupName={team?.name} position={position} />
			<Query
				text={data.content}
				power={power}
				nounTranslations={data.nounTranslation}
				prepositionTranslations={data.prepositionTranslation}
				imgAlt={data.imgAlt}
			/>
			<View style={styles.imageContainer} accessible={true} accessibilityLabel={'Imagen de la pregunta'} accessibilityHint={`Super hearing: ${data.imgAlt}`}>
				{loadingImage && <ActivityIndicator size="large" color={theme.colors.primary} />}
				{errorImage && <Text style={styles.errorMessage}>Un error inesperado ha ocurrido</Text>}
				<Image
					style={styles.image}
					source={{ uri: `${data.imgUrl}?t=${data.id}` }}
					resizeMode="contain"
					onLoadStart={() => setLoadingImage(true)}
					onLoadEnd={() => setLoadingImage(false)}
					onError={() => {
						setLoadingImage(false);
						setErrorImage(true);
					}}
				/>
			</View>

			<View style={styles.optionsContainer}>
				<Option
					text={data.options[0].content}
					onPress={() => {
						onPressOption(
							0,
							data.options[0].correct,
							data.options[0].id
						);
					}}
					containerStyle={containerStyleOptions[0]}
					textStyle={textStyleOptions[0]}
				/>
				<Option
					text={data.options[1].content}
					onPress={() => {
						onPressOption(
							1,
							data.options[1].correct,
							data.options[1].id
						);
					}}
					containerStyle={containerStyleOptions[1]}
					textStyle={textStyleOptions[1]}
				/>
			</View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.primary,
			height: '100%'
		},
		imageContainer: {
			marginHorizontal: 20,
			height: 200,
			borderRadius: theme.borderRadius.medium,
			overflow: 'hidden'
		},
		image: {
			width: '100%',
			height: '100%'
		},
		optionsContainer: {
			marginTop: 40
		},
		errorMessage: {
			fontSize: theme.fontSize.large,
			color: theme.colors.red,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			marginTop: 20
		},
	});

export default Question;
