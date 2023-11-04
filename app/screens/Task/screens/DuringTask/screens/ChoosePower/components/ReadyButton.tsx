import { Text, StyleSheet } from 'react-native';
import React from 'react';

import Pressable from '@components/Pressable';

import { useState } from 'react';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

const ReadyButton = () => {
	const [ready, setReady] = useState(false);
	const theme = useTheme();

	const handlePress = () => {
		setReady(!ready);
	};

	return (
		<Pressable
			style={getStyles(theme, ready).container}
			onPress={handlePress}
		>
			<Text style={getStyles(theme, ready).text}>
				{ready ? 'Listo' : '¿Listo?'}
			</Text>
		</Pressable>
	);
};

const getStyles = (theme: Theme, ready: boolean) =>
	StyleSheet.create({
		container: {
			backgroundColor: ready ? theme.colors.green : theme.colors.black,
			marginHorizontal: 20,
			borderRadius: theme.borderRadius.medium,
			paddingHorizontal: 20,
			paddingVertical: 10,
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 20,
			...theme.shadow
		},
		text: {
			color: theme.colors.white,
			fontSize: theme.fontSize.xl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium
		}
	});

export default ReadyButton;
