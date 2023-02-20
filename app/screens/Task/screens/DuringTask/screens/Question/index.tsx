import { View, ImageBackground, StyleSheet } from 'react-native'
import PositionBar from './components/PositionBar'
import Query from './components/Query'
import Option from '@screens/Task/components/Option'

import { useState } from 'react'
import useTheme from '@hooks/useTheme'
import usePlaySound from '@hooks/usePlaySound'

import { Theme } from '@theme'
import { Power } from '@enums/Power.enum'

const Question = () => {
    const theme = useTheme()
    const [containerStyleOptions, setContainerStyleOptions] = useState([{}])
    const [textStyleOptions, setTextStyleOptions] = useState([{}])
    const playSoundSuccess = usePlaySound(require('@sounds/success.wav'))
    const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'))

    const onPressOption = async (index: number, correct: boolean) => {
        const newContainerStyleOptions = [...containerStyleOptions]
        const newTextStyleOptions = [...textStyleOptions]

        if (correct) {
            playSoundSuccess()
            newContainerStyleOptions[index] = { backgroundColor: theme.colors.green }
            newTextStyleOptions[index] = { color: theme.colors.white }
        } else {
            playSoundWrong()
            newContainerStyleOptions[index] = { backgroundColor: theme.colors.red }
            newTextStyleOptions[index] = { color: theme.colors.white }
        }

        setContainerStyleOptions(newContainerStyleOptions)
        setTextStyleOptions(newTextStyleOptions)

        // TODO - Navigate to next question
    }

    //MOCK DATA
    const options = [
        {
            text: 'Yes, we are',
            correct: true
        },
        {
            text: 'Yes, there is',
            correct: false
        }
    ]

    return (
        <View style={getStyles(theme).container}>
            <PositionBar groupName='Ocelots' position={5} />
            <View style={{ flexDirection: 'column-reverse' }}>
                <View style={getStyles(theme).imageContainer}>
                    <ImageBackground style={getStyles(theme).image} source={require('@images/bridge.png')} />
                </View>
                <Query text='Are you [on] the {bridge}?' power={Power.MemoryPro} />
            </View>
            <View style={getStyles(theme).optionsContainer}>
                <Option
                    text={options[0].text}
                    onPress={() => {
                        onPressOption(0, options[0].correct)
                    }}
                    ContainerStyle={containerStyleOptions[0]}
                    textStyle={textStyleOptions[0]}
                />
                <Option
                    text={options[1].text}
                    onPress={() => {
                        onPressOption(1, options[1].correct)
                    }}
                    ContainerStyle={containerStyleOptions[1]}
                    textStyle={textStyleOptions[1]}
                />
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
        },
        imageContainer: {
            marginHorizontal: 20,
            height: 200,
            borderRadius: theme.borderRadius.medium,
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        optionsContainer: {
            marginTop: 40,
        }
    })


export default Question