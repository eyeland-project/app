import { View, Text, StyleSheet } from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	text: string;
}

const Title = ({ text }: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			marginTop: 10,
			marginHorizontal: 20
		},
		text: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xxxl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium
		}
	});

export default Title;
