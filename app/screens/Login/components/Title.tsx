import { Text, StyleSheet, View, Image } from 'react-native';

import useTheme from '@hooks/useTheme';
import { Theme } from '@theme';

interface TitleProps {
	name: string;
}

const Title = ({ name }: TitleProps) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View>
			{/* <Image style={styles.image} source={ire('@assets/icon.png')} /> */}
			<Text style={styles.title}>{name}</Text>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		title: {
			fontSize: theme.fontSize.xxxxxxl,
			fontFamily: theme.fontWeight.bold,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium
		},
		image: {
			width: 100,
			height: 100,
			borderRadius: theme.borderRadius.medium,
			marginBottom: 50,
		}
	});

export default Title;
