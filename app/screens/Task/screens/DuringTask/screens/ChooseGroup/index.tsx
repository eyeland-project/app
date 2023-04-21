import { View, Text, StyleSheet, FlatList, useWindowDimensions, StatusBar } from 'react-native'
import GroupCard from './components/GroupCard'
import Placeholder from './components/Placeholder'

import { Theme } from '@theme'

import { useEffect, useState, useCallback } from 'react'
import useTheme from '@hooks/useTheme'
import useTaskContext from '@hooks/useTaskContext'
import useTeams from '@hooks/useTeams'
import { useDuringTaskContext } from '@hooks/useDuringTaskContext'
import { useFocusEffect } from '@react-navigation/native'
import useTeam from '@hooks/useTeam'

import { SocketEvents } from '@enums/SocketEvents.enum'
import { Team } from '@interfaces/Team.interface'


const ChooseGroup = ({ route }: any) => {
    const theme = useTheme()
    const { resetContext, setProgress, setTotalQuestions, setHeaderColor, setHeaderComplementaryColor } = useTaskContext()
    const { error, loading, data, getTeams } = useTeams()
    const { leaveTeam } = useTeam()
    const { socket } = useDuringTaskContext()
    const [groups, setGroups] = useState<Team[]>([])
    const { taskOrder } = route.params
    const { width: screenWidth } = useWindowDimensions();
    const isPhone = screenWidth <= 768;

    const getGroups = async () => {
        setGroups(await getTeams())
    }

    const init = async () => {
        resetContext()
        setProgress(0.01)
        setHeaderColor('darkestGreen')
        setHeaderComplementaryColor('bluerGreen')

        await leaveTeam()
        await getGroups()
        socket.on(SocketEvents.teamsStudentUpdate, (data: Team[]) => {
            setGroups(data)
        });

        return () => {
            socket.off(SocketEvents.teamsStudentUpdate);
        };
    }


    useFocusEffect(
        useCallback(() => {
            init()
        }, [])
    )

    if (loading)
        return (
            <>
                <View style={getStyles(theme, isPhone).container}>
                    <Text style={getStyles(theme, isPhone).text}>Escoge tu equipo para comenzar el reto grupal</Text>
                    <Text style={getStyles(theme, isPhone).secondaryText}> Cada equipo está conformado por 3 participantes, que podrán acceder a un <Text style={getStyles(theme, isPhone).secondaryInnerText}>superpoder</Text> aleatoriamente</Text>
                </View>
                <Placeholder />
            </>
        )

    return (
        <>
            <StatusBar backgroundColor={theme.colors.darkestGreen} barStyle="light-content" />
            <View style={getStyles(theme, isPhone).container}>
                <Text style={getStyles(theme, isPhone).text}>Escoge tu equipo para comenzar el reto grupal</Text>
                <Text style={getStyles(theme, isPhone).secondaryText}> Cada equipo está conformado por 3 participantes, que podrán acceder a un <Text style={getStyles(theme, isPhone).secondaryInnerText}>superpoder</Text> aleatoriamente</Text>
            </View>
            <FlatList
                data={groups.filter(group => group.taskOrder === taskOrder || group.taskOrder === null)}
                renderItem={({ item, index }) => (
                    <GroupCard
                        key={item.id}
                        id={item.code}
                        index={index + 1}
                        name={item.name}
                        members={item.students}
                        taskOrder={taskOrder}
                    />
                )}
                numColumns={isPhone ? 1 : 3}
                centerContent={true}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                style={getStyles(theme, isPhone).flatlist}
                ListFooterComponent={() => <View style={{ height: 80 }} />}
            />
        </>
    )
}

const getStyles = (theme: Theme, isPhone: boolean) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.darkestGreen,

        },
        text: {
            color: theme.colors.white,
            fontSize: isPhone ? theme.fontSize.xxxl : theme.fontSize.xxxxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            paddingHorizontal: 20,
            marginBottom: 20,
            textAlign: 'center',
            alignSelf: 'center',
        },
        flatlist: {
            backgroundColor: theme.colors.darkestGreen,
            paddingStart: isPhone ? 0 : 100,
            // alignSelf: 'center',
            // width: '100%',
            // marginHorizontal: 'auto',


            // flexDirection: isPhone ? 'column' : 'row',
        },
        secondaryText: {
            color: theme.colors.bluerGreen,
            fontSize: isPhone ? theme.fontSize.xl : theme.fontSize.xxl,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
            paddingHorizontal: 20,
            marginBottom: 20,
            textAlign: 'center',
            alignSelf: 'center',
            maxWidth: 700,
        },
        secondaryInnerText: {
            color: theme.colors.bluerGreen,
            fontSize: isPhone ? theme.fontSize.xxxl : theme.fontSize.xxxxl,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
            paddingHorizontal: 20,
            marginBottom: 20,
            textAlign: 'center',
            alignSelf: 'center',
        }
    })


export default ChooseGroup