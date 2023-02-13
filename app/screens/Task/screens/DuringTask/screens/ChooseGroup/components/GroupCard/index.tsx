import { View, StyleSheet } from 'react-native'
import Title from './components/Title'
import Members from './components/Members'
import JoinButton from './components/JoinButton'

import useTheme from '@hooks/useTheme'

import { User } from '@interfaces/User.interface'
import { Theme } from '@theme'



interface Props {
    id: number
    name: string
    members: User[]
}

const GroupCard = ({ id, name, members }: Props) => {
    const theme = useTheme()

    return (
        <View style={getStyles(theme).container}>
            <Title name={name} />
            <Members members={members} />
            {
                members.length < 3 && <JoinButton id={id} />
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