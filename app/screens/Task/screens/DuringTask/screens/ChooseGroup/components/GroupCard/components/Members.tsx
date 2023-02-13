import { View, Text, StyleSheet } from 'react-native'
import { User } from '@interfaces/User.interface'

import useTheme from '@hooks/useTheme'
import { Theme } from '@theme'

interface Props {
    members: User[]
}

const Members = ({ members }: Props) => {
    const theme = useTheme()

    return (
        <View>
            {
                members.map(member => (
                    <Text style={getStyles(theme).text} key={member.id}>{member.name}</Text>
                ))
            }
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.medium,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
        }
    })


export default Members