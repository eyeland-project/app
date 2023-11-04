import {
	View,
	Text,
	StyleSheet,
	Animated,
	Easing,
	Platform
} from 'react-native';
import LottieView from 'lottie-react-native';

import { useState, useEffect } from 'react';
import useTheme from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@theme';

interface Props {
	dialog: string;
}

const Person = ({ dialog }: Props) => {
	const theme = useTheme();
	const navigation = useNavigation<any>();
	const [opacity, setOpacity] = useState(new Animated.Value(0));
	const [scale, setScale] = useState(new Animated.Value(0));
	const [translateX, setTranslateX] = useState(new Animated.Value(-50));
	const [translateY, setTranslateY] = useState(new Animated.Value(-50));
	const styles = getStyles(theme);
	const currentPlatform = Platform.OS;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 500,
				easing: Easing.linear,
				useNativeDriver: true
			}),
			Animated.timing(scale, {
				toValue: 1,
				duration: 500,
				easing: Easing.linear,
				useNativeDriver: true
			}),
			Animated.timing(translateX, {
				toValue: 0,
				duration: 500,
				easing: Easing.linear,
				useNativeDriver: true
			}),
			Animated.timing(translateY, {
				toValue: 0,
				duration: 500,
				easing: Easing.linear,
				useNativeDriver: true
			})
		]).start(() => {
			setTimeout(() => {
				setOpacity(new Animated.Value(0));
				setScale(new Animated.Value(0));
				setTranslateX(new Animated.Value(-50));
				setTranslateY(new Animated.Value(-50));
			}, 4000);
		});
	}, [dialog]);

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('Question', { taskorder: 1 });
		}, 10000);
	}, []);

	const dialogStyle = {
		opacity,
		transform: [{ scale }, { translateX }, { translateY }]
	};

	return (
		<View style={styles.container}>
			{currentPlatform !== 'web' && (
				<LottieView
					source={require('@animations/person.json')}
					autoPlay
					loop
					style={styles.animation}
				/>
			)}
			<Animated.View style={{ ...styles.dialog, ...dialogStyle }}>
				<Text style={styles.text}>{dialog}</Text>
				<View style={styles.triangle}></View>
			</Animated.View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			flexDirection: 'row',
			alignItems: 'flex-start',
			justifyContent: 'flex-start'
		},
		animation: {
			width: 150,
			height: 150
		},
		dialog: {
			backgroundColor: theme.colors.gray,
			borderRadius: 10,
			padding: 10,
			margin: 10,
			maxWidth: 200,
			position: 'relative'
		},
		text: {
			color: theme.colors.black,
			fontSize: theme.fontSize.medium,
			fontFamily: theme.fontWeight.regular
		},
		triangle: {
			position: 'absolute',
			left: -20,
			top: 20,
			width: 0,
			height: 0,
			backgroundColor: 'transparent',
			borderStyle: 'solid',
			borderLeftWidth: 10,
			borderRightWidth: 10,
			borderBottomWidth: 20,
			borderLeftColor: 'transparent',
			borderRightColor: 'transparent',
			borderBottomColor: theme.colors.gray,
			alignSelf: 'center',
			transform: [{ rotate: '-90deg' }]
		}
	});

export default Person;
