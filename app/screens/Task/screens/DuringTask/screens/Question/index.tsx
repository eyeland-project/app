import { View, ImageBackground, StyleSheet } from 'react-native'
import PositionBar from './components/PositionBar'
import Query from './components/Query'
import Option from '@screens/Task/components/Option'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'
import { Power } from '@enums/Power.enum'

const Question = () => {
    const theme = useTheme()

    return (
        <View style={getStyles(theme).container}>
            <PositionBar groupName='Ocelots' position={5} />
            <View style={getStyles(theme).imageContainer}>
                <ImageBackground style={getStyles(theme).image} source={require('@images/bridge.png')} />
            </View>
            <Query text='Are you [on] the {bridge}?' power={Power.MemoryPro} />
            <View>
                <Option />
                <Option />
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
        }
    })


export default Question