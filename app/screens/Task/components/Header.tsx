import { View, StyleSheet, Animated } from 'react-native';
import HomeButton from '@components/HomeButton';
import ContinueButton from '@components/ContinueButton';
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useEffect, useState } from 'react';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	progress?: number;
	showNext?: boolean;
	icon?: keyof typeof AntDesign.glyphMap;
	onPress?: () => void;
}

const Header = ({ progress, showNext, icon, onPress }: Props) => {
	const theme = useTheme();
	const [progressWidth, setProgressWidth] = useState(new Animated.Value(1));
	const [continueOpacity, setContinueOpacity] = useState(
		new Animated.Value(0)
	);
	const [continueTranslateX, setContinueTranslateX] = useState(
		new Animated.Value(50)
	);
	const styles = getStyles(theme);

	useEffect(() => {
		if (showNext) {
			Animated.parallel([
				Animated.timing(progressWidth, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true
				}),
				Animated.timing(continueOpacity, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true
				}),
				Animated.timing(continueTranslateX, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true
				})
			]).start();
		}
	}, [showNext, progressWidth, continueOpacity, continueTranslateX]);

	return (
		<View style={styles.row}>
			<HomeButton icon={icon} accessibilityLabel="Volver al inicio" />
			{progress && (
				<Progress.Bar
					progress={progress}
					width={null}
					height={5}
					color={theme.colors.secondary}
					style={{ flex: 1, marginHorizontal: 20 }}
				/>
			)}
			{progress && onPress ? (
				<Animated.View
					style={{
						opacity: continueOpacity,
						transform: [{ translateX: continueTranslateX }]
					}}
				>
					{showNext && (
						<ContinueButton
							onPress={onPress}
							accessibilityLabel="Continuar"
						/>
					)}
				</Animated.View>
			) : null}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: 20,
			backgroundColor: theme.colors.primary,
			paddingVertical: 10
		}
	});

export default Header;
