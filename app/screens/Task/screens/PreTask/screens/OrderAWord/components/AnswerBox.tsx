import { View, Text, StyleSheet } from 'react-native';
import Option from './Option';
import React from 'react';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	answerList: string[];
	onAnswerPress: (index: number) => void;
}

const AnswerBox = ({ answerList, onAnswerPress }: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View
			style={[
				styles.container,
				answerList.length > 0
					? styles.notEmptyContainer
					: styles.emptyContainer
			]}
		>
			{answerList.length > 0 ? (
				answerList.map((answer, index) => (
					<Option
						text={answer}
						onPress={() => {
							onAnswerPress(index);
						}}
						key={index}
						inAnswerBox={true}
					/>
				))
			) : (
				<Text style={styles.text}>
					Pulsa las letras para formar la palabra
				</Text>
			)}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			borderColor: theme.colors.black,
			borderWidth: 1.5,
			borderRadius: theme.borderRadius.medium,
			marginHorizontal: 20
			// minHeight: 200,
		},
		emptyContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			height: 82
		},
		notEmptyContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			alignItems: 'flex-start',
			paddingHorizontal: 10,
			paddingBottom: 10
		},
		text: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			opacity: 0.4,
			marginHorizontal: 20
		}
	});

export default AnswerBox;
