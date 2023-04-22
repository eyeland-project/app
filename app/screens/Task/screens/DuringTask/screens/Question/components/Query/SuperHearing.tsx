import { View, Text, StyleSheet, Image } from 'react-native';
import Pressable from '@components/Pressable';

import { useState, useEffect } from 'react';
import useTheme from '@hooks/useTheme';
import useTextToSpeech from '@hooks/useTextToSpeech';

import { Theme } from '@theme';

interface Props {
	text: string;
	imgAlt: string;
}

const SuperHearing = ({ text, imgAlt }: Props) => {
	const theme = useTheme();
	const { speak } = useTextToSpeech();
	const styles = getStyles(theme);

	// remove from text the brackets and the curly braces
	const textFiltered = text.replace(/[\[\]\{\}]/g, '');

	const onPress = () => {
		speak(imgAlt, 'es');
	};

	return (
		<Pressable onPress={onPress} style={styles.container}>
			<Text style={styles.text}>{textFiltered}</Text>
			<Image
				source={require('@images/superHearing.png')}
				style={styles.image}
			></Image>
		</Pressable>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			marginHorizontal: 20,
			flexDirection: 'row',
			marginTop: 10,
			flexWrap: 'wrap',
			alignItems: 'center'
		},
		text: {
			fontSize: theme.fontSize.xxl,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium
		},
		image: {
			width: 30,
			height: 30,
			marginLeft: 10
		}
	});

export default SuperHearing;
