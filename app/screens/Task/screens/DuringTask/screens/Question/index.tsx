import { View, StyleSheet, Image, ToastAndroid } from 'react-native';
import Query from './components/Query';
import Option from '@screens/Task/components/Option';
import Placeholder from './components/Placeholder';
import PositionBar from './components/PositionBar';
import History from './components/History';

import { useState, useEffect } from 'react';
import useTheme from '@hooks/useTheme';
import usePlaySound from '@hooks/usePlaySound';
import useTime from '@hooks/useTime';
import useDuringTaskQuestion from '@app/core/hooks/Task/DurinTask/useDuringTaskQuestion';
import { useDuringTaskContext } from '@app/core/hooks/Task/DurinTask/useDuringTaskContext';
import { useNavigation } from '@react-navigation/native';

import { SocketEvents } from '@enums/SocketEvents.enum';

import { Theme } from '@theme';
import { Character } from '@app/shared/enums/Character.enum';

interface Props {
	route: any;
}

const Question = ({ route }: Props) => {
	const { taskOrder } = route.params;
	const theme = useTheme();
	const navigation = useNavigation<any>();
	const [containerStyleOptions, setContainerStyleOptions] = useState([{}]);
	const [textStyleOptions, setTextStyleOptions] = useState([{}]);
	const { time, startTimer, stopTimer } = useTime();
	const {
		data,
		loading,
		error,
		getDuringTaskQuestion,
		sendDuringTaskAnswer
	} = useDuringTaskQuestion();
	const { power, socket, team, position, setPosition } =
		useDuringTaskContext();
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

		if (data) await sendDuringTaskAnswer({
			taskOrder,
			questionOrder: data.questionOrder,
			body: { idOption: id, answerSeconds: time }
		}),

			navigateNextQuestion();
	};

	const navigateNextQuestion = () => {
		navigation.pop();
		navigation.push('Question', {
			taskOrder,
		});

	};

	useEffect(() => {
		if (error === 'Recurso no encontrado') {
			navigation.reset({
				index: 1,
				routes: [{ name: 'FinalScore' }]
			});
		}
	}, [error]);

	useEffect(() => {
		const initQuestion = async () => {
			await getDuringTaskQuestion({ taskOrder });
			startTimer();
		};

		initQuestion();

		socket.once(
			SocketEvents.TEAM_STUDENT_ANSWER, () => { navigateNextQuestion() }
		);

		socket.once(
			SocketEvents.TEAM_STUDENT_LEAVE, (data: { name: string }) => {
				ToastAndroid.show(`El usuario ${data.name} se ha perdido durante el paseo`, ToastAndroid.SHORT);
				navigateNextQuestion()
			}
		);
		''
		socket.on(
			SocketEvents.COURSE_LEADERBOARD_UPDATE,
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
			socket.off(SocketEvents.TEAM_STUDENT_ANSWER);
		};
	}, []);

	if (loading || !data) return <Placeholder />;

	const question = data.content.indexOf('\\') > -1 ? data.content.split('\\')[1] : data.content;
	const history = data.content.indexOf('\\') > -1 ? data.content.split('\\')[0] : null;

	return (
		<View style={styles.container}>
			<PositionBar groupName={team?.name} position={position} />
			{
				history ? <History history={history} character={data.character} /> : <View style={{ height: 20 }} />
			}
			<Query
				text={question}
				power={power}
				nounTranslations={data.nounTranslation}
				prepositionTranslations={data.prepositionTranslation}
				imgAlt={data.imgAlt}
			/>
			<View style={styles.imageContainer} accessible={true} accessibilityLabel={'Imagen de la pregunta'} accessibilityHint={`Super hearing: ${data.imgAlt}`}>
				{/* {loadingImage && <ActivityIndicator size="large" color={theme.colors.white} />}
				{errorImage && <Text style={styles.errorMessage}>Un error inesperado ha ocurrido</Text>} */}
				<Image
					style={styles.image}
					source={{ uri: `${data.imgUrl}?t=${data.id}` }}
					resizeMode="contain"
				// onLoadStart={() => setLoadingImage(true)}
				// onLoadEnd={() => setLoadingImage(false)}
				// onError={() => {
				// 	setLoadingImage(false);
				// 	setErrorImage(true);
				// }}
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
			backgroundColor: theme.colors.white,
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
