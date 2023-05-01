import { FlatList, View, StyleSheet } from 'react-native';
import Task from './components/Task';
import Title from './components/Title';
import Placeholder from './components/Placeholder';
import ErrorScreen from '@components/ErrorScreen';

import { useCallback } from 'react';
import useTheme from '@hooks/useTheme';
import useTasks from '@hooks/Task/useTasks';
import { useFocusEffect } from '@react-navigation/native';
import useMediaQuery from '@hooks/useMediaQuery';

import { Theme } from '@theme';

const Home = () => {
	const theme = useTheme();
	const { loading, error, data, getTasks } = useTasks();
	const { isPhone, isTablet, isDesktop } = useMediaQuery();
	const styles = getStyles(theme);

	const initTasks = async () => {
		await getTasks();
	};

	useFocusEffect(
		useCallback(() => {
			initTasks();
		}, [])
	);

	if (loading) return <Placeholder />;

	if (error)
		return (
			<>
				<Title text="MENÚ" />
				<ErrorScreen error={error} retryAction={initTasks} />
			</>
		);

	if (!data)
		return (
			<>
				<Title text="MENÚ" />
				<ErrorScreen
					error={'No se recibió información'}
					retryAction={initTasks}
				/>
			</>
		);

	return (
		<FlatList
			style={styles.container}
			ListHeaderComponent={<Title text="MENÚ" />}
			stickyHeaderIndices={[0]}
			stickyHeaderHiddenOnScroll={true}
			data={data}
			renderItem={({ item, index }) => (
				<>
					{index === 0 && <View style={{ marginVertical: 5 }} />}
					<Task
						id={item.id}
						name={item.name}
						order={item.taskOrder}
						description={item.description}
						image={{ uri: item.thumbnailUrl }}
						completed={item.completed}
						blocked={item.blocked || item.comingSoon}
					/>
				</>
			)}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			ListFooterComponent={<View style={styles.safeZone} />}
		/>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			height: '100%'
		},
		separator: {
			height: 20
		},
		safeZone: {
			height: 100
		}
	});

export default Home;
