import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Pressable from '@components/Pressable';
import AntDesign from '@expo/vector-icons/AntDesign';

import React, { useEffect, useRef } from 'react';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	title: string;
	completed: boolean;
	blocked: boolean;
	onPress: () => void;
}

const Section = ({ title, completed, blocked, onPress }: Props) => {
	const theme = useTheme();

	const scaleAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		if (!completed && !blocked) {
			const pulse = () => {
				Animated.sequence([
					Animated.timing(scaleAnim, {
						toValue: 1.01,
						duration: 2000,
						easing: Easing.inOut(Easing.quad),
						useNativeDriver: true
					}),
					Animated.timing(scaleAnim, {
						toValue: 1,
						duration: 2000,
						easing: Easing.inOut(Easing.quad),
						useNativeDriver: true
					})
				]).start(pulse);
			};
			pulse();
		}
	}, [completed, blocked, scaleAnim]);

	return (
		<Pressable onPress={onPress} disabled={blocked}>
			<Animated.View
				style={[
					getStyles(theme, completed, blocked).container,
					{ transform: [{ scale: scaleAnim }] }
				]}
			>
				<Text style={getStyles(theme, completed, blocked).text}>
					{title}
				</Text>
				<View style={getStyles(theme, completed, blocked).button}>
					<View>
						<AntDesign
							name={completed ? 'reload1' : 'arrowright'}
							size={23}
							color={theme.colors.white}
						/>
					</View>
				</View>
			</Animated.View>
		</Pressable>
	);
};

const getStyles = (theme: Theme, completed: boolean, blocked: boolean) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			marginBottom: 20,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 15,
			paddingVertical: 7,
			marginHorizontal: 20,
			borderRadius: theme.borderRadius.medium,
			borderColor: theme.colors.blue,
			borderWidth: completed ? 2 : 0,
			...theme.shadow
		},
		text: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			opacity: blocked ? 0.5 : 1
		},
		button: {
			backgroundColor: completed
				? theme.colors.blue
				: theme.colors.darkGreen,
			borderRadius: theme.borderRadius.full,
			padding: 10,
			marginVertical: 5,
			alignItems: 'center',
			justifyContent: 'center',
			opacity: blocked ? 0.5 : 1,
			...theme.shadow
		}
	});

export default Section;
