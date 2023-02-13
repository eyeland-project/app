import { View, Text, StyleSheet, FlatList } from 'react-native'
import GroupCard from './components/GroupCard'

import { Theme } from '@theme'
import useTheme from '@hooks/useTheme'

// MOCK DATA
import { GROUPS } from '@mocks/GROUPS'

const ChooseGroup = () => {
    const theme = useTheme()

    return (
        <FlatList
            data={GROUPS}
            renderItem={({ item }) => (
                <GroupCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    members={item.members}
                />
            )}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            style={getStyles(theme).flatlist}
            ListHeaderComponent={() => <Text style={getStyles(theme).text}>Es momento de que escojas tu grupo:</Text>}
            ListFooterComponent={() => <View style={{ height: 80 }} />}
        />
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            paddingHorizontal: 20,
            marginBottom: 20,
        },
        flatlist: {
            backgroundColor: theme.colors.primary,
        }
    })


export default ChooseGroup