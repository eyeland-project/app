import { Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'

import useTheme from '@hooks/useTheme'
import usePlaySound from '@hooks/usePlaySound'

import { Theme } from '@theme'
import { Dispatch, SetStateAction, useState } from 'react'



interface Props {
    content: string
    correct: boolean
    id: number
    setAnswered: Dispatch<SetStateAction<boolean>>
    setIdOptionSelected: Dispatch<SetStateAction<number>>
    answered: boolean
}

const Option = ({ content, correct, id, setAnswered, setIdOptionSelected, answered }: Props) => {
    const theme = useTheme()
    const [selected, setSelected] = useState(false)
    const [rigth, setRigth] = useState(false)
    const playSuccessSound = usePlaySound(require('@sounds/success.wav'))
    const playWrongSound = usePlaySound(require('@sounds/wrong.wav'))

    return (
        <Pressable style={getStyles(theme, selected, rigth).option} onPress={
            () => {
                if (!answered) {
                    setSelected(true)
                    setIdOptionSelected(id)
                }

                if (correct) {
                    playSuccessSound()
                    setRigth(true)
                    setAnswered(true)
                } else {
                    playWrongSound()
                }
            }
        }>
            <Text style={getStyles(theme, selected, rigth).optionText}>{content}</Text>
        </Pressable>
    )
}

const getStyles = (theme: Theme, selected: boolean, right: boolean) =>
    StyleSheet.create({
        option: {
            backgroundColor: !selected ? theme.colors.black : right ? theme.colors.green : theme.colors.red,
            width: "45%",
            paddingVertical: 10,
            marginHorizontal: 5,
            borderRadius: theme.borderRadius.medium,
            justifyContent: 'center',
            alignItems: 'center',
            ...theme.shadow
        },
        optionText: {
            color: theme.colors.white,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
        },
    })

export default Option