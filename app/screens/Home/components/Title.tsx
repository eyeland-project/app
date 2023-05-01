import { View, Text, StyleSheet, Image } from 'react-native';
import Pressable from '@components/Pressable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useTheme from '@hooks/useTheme';
import useAuthStorage from '@hooks/useAuthStorage';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@theme';

interface TitleProps {
	text: string;
}

const Title = ({ text }: TitleProps) => {
	const theme = useTheme();
	const authStorage = useAuthStorage();
	const navigation = useNavigation<any>();
	const styles = getStyles(theme);

	return (
		<View
			style={styles.container}
			accessible={true}
			accessibilityLabel={`Titulo y boton para cerrar sesión`}
			accessibilityRole="header"
		>
			<Image source={require('@icons/appIcon.png')} style={styles.logo} resizeMode='center' />
			<Pressable
				onPress={() => {
					authStorage.removeAccessToken();
					navigation.reset({
						index: 0,
						routes: [{ name: 'Login' }]
					});
				}}
				style={styles.button}
				accessible={true}
				accessibilityLabel="Cerrar sesión"
				accessibilityHint="Presiona para cerrar sesión"
				accessibilityRole="button"
			>
				<MaterialCommunityIcons
					name="logout"
					size={30}
					color={theme.colors.white}
					accessible={false}
				/>
			</Pressable>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			paddingHorizontal: 20,
			justifyContent: 'space-between',
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 8
		},
		text: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xxxl,
			fontFamily: theme.fontWeight.bold
		},
		logo: {
			width: 50,
			height: 50
		},
		button: {
			padding: 8,
			borderRadius: theme.borderRadius.medium,
			backgroundColor: theme.colors.darkGreen,
			...theme.shadow
		}
	});

export default Title;
