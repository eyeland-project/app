import { View, Text, StyleSheet } from 'react-native';
import Pressable from '@components/Pressable';
import Option from './Option';
import History from '@screens/Task/components/History';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';
import { PosTaskQuestion } from '@interfaces/PosTaskQuestion.interface';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	question: PosTaskQuestion;
	setAnswered: Dispatch<SetStateAction<boolean>>;
	setIdOptionSelected: Dispatch<SetStateAction<number>>;
	answered: boolean;
}

const Question = ({
	question,
	setAnswered,
	setIdOptionSelected,
	answered
}: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View>
			<History character={question.character} history={question.content} />
			{/* <Text style={styles.question}>{question.content}</Text> */}
			<View style={styles.optionsContainer}>
				{question.options.slice(0, 2).map((option) => (
					<Option
						key={option.id}
						content={option.content}
						correct={option.correct}
						id={option.id}
						setAnswered={setAnswered}
						setIdOptionSelected={setIdOptionSelected}
						answered={answered}
					/>
				))}
			</View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		question: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xxl,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			marginHorizontal: 20
		},
		optionsContainer: {
			backgroundColor: theme.colors.white,
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			marginTop: 10
		}
	});

export default Question;
