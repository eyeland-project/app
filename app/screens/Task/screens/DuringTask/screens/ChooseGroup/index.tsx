import { View, Text, StyleSheet, FlatList } from 'react-native'
import GroupCard from './components/GroupCard'
import Placeholder from './components/Placeholder'

import { Theme } from '@theme'

import { useEffect, useState } from 'react'
import useTheme from '@hooks/useTheme'
import useTaskContext from '@hooks/useTaskContext'
import useTeams from '@hooks/useTeams'
import { useDuringTaskContext } from '@hooks/useDuringTaskContext'

import { SocketEvents } from '@enums/SocketEvents.enum'
import { Team } from '@interfaces/Team.interface'


const ChooseGroup = ({ route }: any) => {
    const theme = useTheme()
    const { resetContext } = useTaskContext()
    const { error, loading, data, getTeams, leaveTeam } = useTeams()
    const { socket } = useDuringTaskContext()
    const [groups, setGroups] = useState<Team[]>([])
    const { taskOrder } = route.params

    const getGroups = async () => {
        setGroups(await getTeams())
    }

    useEffect(() => {
        resetContext()
        leaveTeam()
        getGroups()

        socket.on(SocketEvents.TeamsStudentUpdate, (data: Team[]) => {
            setGroups(data)
        });

        return () => {
            socket.off(SocketEvents.TeamsStudentUpdate);
        };
    }, [])

    if (loading)
        return (
            <>
                <Text style={getStyles(theme).text}>Es momento de que escojas tu grupo:</Text>
                <Placeholder />
            </>
        )

    return (
        <FlatList
            data={groups}
            renderItem={({ item }) => (
                <GroupCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    members={item.students}
                    taskOrder={taskOrder}
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