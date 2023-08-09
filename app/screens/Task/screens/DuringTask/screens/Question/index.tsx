import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	ToastAndroid,
	View
} from 'react-native';
import { useEffect, useRef, useState } from 'react';

import AudioPlayer from '@app/screens/Task/components/AudioPlayer';
import History from '../../../../components/History';
import Option from '@screens/Task/components/Option';
import Placeholder from './components/Placeholder';
import PositionBar from './components/PositionBar';
import Pressable from '@app/shared/components/Pressable';
import Query from './components/Query';
import { SocketEvents } from '@enums/SocketEvents.enum';
import { Theme } from '@theme';
import { useDuringTaskContext } from '@app/core/hooks/Task/DurinTask/useDuringTaskContext';
import useDuringTaskQuestion from '@app/core/hooks/Task/DurinTask/useDuringTaskQuestion';
import useMediaQuery from '@app/core/hooks/useMediaQuery';
import { useNavigation } from '@react-navigation/native';
import usePlaySound from '@hooks/usePlaySound';
import useTheme from '@hooks/useTheme';
import useTime from '@hooks/useTime';

interface Props {
	route: any;
}

const Question = ({ route }: Props) => {
	const { taskOrder } = route.params;
	const theme = useTheme();
	const navigation = useNavigation<any>();
	const [containerStyleOptions, setContainerStyleOptions] = useState([{}]);
	const [textStyleOptions, setTextStyleOptions] = useState([{}]);
	const [answered, setAnswered] = useState(false);
	const { time, startTimer, stopTimer } = useTime();
	const {
		data,
		loading,
		error,
		getDuringTaskQuestion,
		sendDuringTaskAnswer
	} = useDuringTaskQuestion();
	const playSoundAnimal = usePlaySound({ uri: data?.audioUrl });
	const { power, socket, team, position, setPosition } =
		useDuringTaskContext();
	const currentPlatform = Platform.OS;
	const { isPhone, isTablet, isDesktop } = useMediaQuery();
	const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
	const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'));
	const styles = getStyles(theme);

	const onPressOption = async (
		index: number,
		correct: boolean,
		id: number
	) => {
		if (answered) return;

		setAnswered(true);
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

		if (data)
			await sendDuringTaskAnswer({
				taskOrder,
				questionOrder: data.questionOrder,
				body: { idOption: id, answerSeconds: time }
			}),
				navigateNextQuestion();
	};

	const navigateNextQuestion = () => {
		navigation.pop();
		navigation.push('Question', {
			taskOrder
		});
	};

	const onPressPlayAudio = () => {
		if (data?.audioUrl) playSoundAnimal();
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

		socket.once(SocketEvents.TEAM_STUDENT_ANSWER, () => {
			navigateNextQuestion();
		});

		socket.once(
			SocketEvents.TEAM_STUDENT_LEAVE,
			(data: { name: string }) => {
				ToastAndroid.show(
					`El usuario ${data.name} se ha perdido durante el paseo`,
					ToastAndroid.SHORT
				);
				navigateNextQuestion();
			}
		);
		('');
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

	const question =
		data.content.indexOf('\\') > -1
			? data.content.split('\\')[1]
			: data.content;
	const history =
		data.content.indexOf('\\') > -1 ? data.content.split('\\')[0] : null;

	return (
		<ScrollView style={styles.container}>
			<PositionBar groupName={team?.name} position={position} />
			{history ? (
				<History history={history} character={data.character} />
			) : (
				<View style={{ height: 20 }} />
			)}
			<Query
				text={question}
				power={power}
				nounTranslations={data.memoryPro}
				prepositionTranslations={data.superRadar}
				imgAlt={data.imgAlt}
			/>
			<View
				style={styles.imageContainer}
				accessible={true}
				accessibilityLabel={'Imagen de la pregunta'}
				accessibilityHint={`Super hearing: ${data.imgAlt}`}
			>
				<Image
					style={styles.image}
					source={{ uri: `${data.imgUrl}?t=${data.id}` }}
					resizeMode="contain"
				/>
			</View>

			{data.audioUrl && <AudioPlayer source={{ uri: data.audioUrl }} />}

			<View style={styles.optionsContainer}>
				{data.options.map((option, index) => (
					<Option
						key={index}
						text={option.content}
						onPress={() => {
							onPressOption(index, option.correct, option.id);
						}}
						containerStyle={containerStyleOptions[index]}
						textStyle={textStyleOptions[index]}
					/>
				))}
				{/* <Option
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
				/> */}
			</View>
			<View style={{ height: 80 }} />
		</ScrollView>
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
			marginTop: 20
		},
		errorMessage: {
			fontSize: theme.fontSize.large,
			color: theme.colors.red,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			marginTop: 20
		},
		playerContainer: {
			height: 55,
			marginTop: -60,
			backgroundColor: theme.colors.white,
			borderRadius: theme.borderRadius.medium,
			marginBottom: 20,
			marginHorizontal: 25,
			paddingHorizontal: 10,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			...theme.shadow
		},
		animationContainer: {
			flexDirection: 'row'
		},
		animation: {
			height: 72
		}
	});

export default Question;
