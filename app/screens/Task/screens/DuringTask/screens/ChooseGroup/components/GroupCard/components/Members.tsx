import { View, Text, StyleSheet } from 'react-native'

import useTheme from '@hooks/useTheme'
import { Theme } from '@theme'

import { Student } from '@interfaces/Student.interface'
import { Power } from '@enums/Power.enum'

interface Props {
    members: Student[]
}

const Members = ({ members }: Props) => {
    const theme = useTheme()

    const getPower = (power: Power) => {
        switch (power) {
            case Power.MemoryPro:
                return 'Memory Pro'
            case Power.SuperHearing:
                return 'Super Hearing'
            case Power.SuperRadar:
                return 'Super Radar'
        }
    }


    return (
        <View>
            {
                members.map(member => (
                    <Text style={getStyles(theme).text} key={member.id}>{member.firstName + ' ' + member.lastName + ' - ' + getPower(member.power)}</Text>
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