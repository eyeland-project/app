import { View, StyleSheet } from 'react-native'
import Title from './components/Title'
import Members from './components/Members'
import JoinButton from './components/JoinButton'

import useTheme from '@hooks/useTheme'
import useTeam from '@hooks/useTeam'
import { useNavigation } from '@react-navigation/native'

import { Student } from '@interfaces/Student.interface'
import { Theme } from '@theme'

interface Props {
    id: string
    name: string
    members: Student[]
    taskOrder: number
}

const GroupCard = ({ id, name, members, taskOrder }: Props) => {
    const theme = useTheme()
    const { joinTeam } = useTeam()
    const navigation = useNavigation<any>()

    return (
        <View style={getStyles(theme).container}>
            <Title name={name} />
            <Members members={members} />
            {
                members.length < 3 && <JoinButton onPress={
                    async () => {
                        await joinTeam({ code: id, taskOrder })
                        navigation.navigate("WaitingBegin", { taskOrder })
                    }} />
            }
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.medium,
            marginHorizontal: 20,
            padding: 15,
            ...theme.shadow,
        }
    })


export default GroupCard