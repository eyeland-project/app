import { View, Text, StyleSheet, ScrollView } from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	text: string;
}

const Description = ({ text }: Props) => {
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
			marginBottom: 20,
			marginHorizontal: 20
		},
		text: {
			color: theme.colors.black,
			fontSize: theme.fontSize.medium,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium
		}
	});

export default Description;
