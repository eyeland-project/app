import {
	View,
	Text,
	StyleSheet,
	Image,
	Animated,
} from 'react-native';
import Pressable from '@components/Pressable';

import { useState, useEffect, useRef } from 'react';
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

	const textFiltered = text.replace(/[\[\]\{\}]/g, '');

	const onPress = () => {
		speak(imgAlt, 'es');
	};

	const scale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		const pulse = Animated.loop(
			Animated.sequence([
				Animated.timing(scale, {
					toValue: 1.1,
					duration: 500,
					useNativeDriver: true,
				}),
				Animated.timing(scale, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
			])
		);

		pulse.start();
		return () => pulse.stop();
	}, []);

	return (
		<Pressable onPress={onPress} style={styles.container}>
			<Text style={styles.text}>{textFiltered}</Text>
			<Animated.Image
				source={require('@images/superHearing.png')}
				style={[
					styles.image,
					{ transform: [{ scale }] },
				]}
			></Animated.Image>
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
			alignItems: 'center',
		},
		text: {
			fontSize: theme.fontSize.xxl,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
		},
		image: {
			width: 30,
			height: 30,
			marginLeft: 10,
		},
	});

export default SuperHearing;
