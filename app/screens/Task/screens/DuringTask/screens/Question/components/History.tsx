import { View, Text, StyleSheet, Platform } from 'react-native'
import LottieView from 'lottie-react-native';

import useTheme from '@app/core/hooks/useTheme'
import { Character } from '@app/shared/enums/Character.enum';

import { Theme } from '@theme'

interface Props {
    history: string,
    character: Character,
}

const History = ({ history, character }: Props) => {
    const theme = useTheme()
    const isWeb = Platform.OS === 'web'
    const styles = getStyles(theme, isWeb, character)

    const getPerson = () => {
        switch (character) {
            case Character.ALEX:
                return require('@animations/alex.json')
            case Character.BETO:
                return require('@animations/beto.json')
            case Character.CHUCHO:
                return require('@animations/chucho.json')
            case Character.VALERY:
                return require('@animations/valery.json')
            default:
                return require('@animations/alex.json')
        }
    }

    return (
        <View style={styles.history}>
            {
                !isWeb && (
                    <LottieView
                        source={getPerson()}
                        autoPlay
                        loop
                        style={styles.person}
                    />
                )
            }
            <View style={styles.dialog}>
                <View style={styles.dialogTriangle} />
                <Text style={styles.text}>
                    {history}
                </Text>
            </View>
        </View>
    )
}

const getStyles = (theme: Theme, isWeb: boolean, character: Character) => StyleSheet.create({
    history: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 40,
        marginBottom: 10,
        marginStart: isWeb ? 20 : 0,
    },
    person: {
        width: 110,
        height: 110,
        marginLeft: character === Character.CHUCHO ? 10 : 0,
    },
    dialog: {
        flex: 1,
        backgroundColor: theme.colors.gray,
        borderRadius: theme.borderRadius.medium,
        // marginEnd: 20,
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: character !== Character.CHUCHO ? 20 : 0,
    },
    dialogTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: theme.colors.gray,
        position: 'absolute',
        transform: [
            { rotate: '-90deg' }
        ],
        bottom: 5,
        left: -15,
    },
    text: {
        color: theme.colors.black,
        fontSize: theme.fontSize.small,
        fontFamily: theme.fontWeight.regular,
        letterSpacing: theme.spacing.medium,
        textAlign: 'left',
    }
})

export default History