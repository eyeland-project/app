import { View, Text, Image, StyleSheet } from 'react-native'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'
import { PowerStatus } from '@enums/PowerStatus.enum'

interface Props {
    image: any
    status: PowerStatus
}

const Icon = ({ image, status }: Props) => {
    const theme = useTheme()

    return (
        <View style={getStyles(theme, status).container}>
            <Image style={getStyles(theme, status).image} source={image} />
            <View style={getStyles(theme, status).textContainer}>
                <Text style={getStyles(theme, status).text}>{
                    status === PowerStatus.Disponible ? 'Disponible' :
                        status === PowerStatus.Conflicto ? 'Conflicto' :
                            status === PowerStatus.Seleccionado ? 'Seleccionado' :
                                'No disponible'
                }</Text>
            </View>
        </View>
    )
}

const getStyles = (theme: Theme, status: PowerStatus) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.yellow,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: theme.borderRadius.medium,
            padding: 20,
            height: 100,
            width: 100,
            position: 'relative',
            ...theme.shadow
        },
        image: {
            height: 70,
            width: 70,
        },
        textContainer: {
            backgroundColor: status === PowerStatus.Disponible ? theme.colors.green : status === PowerStatus.Conflicto ? theme.colors.red : status === PowerStatus.Seleccionado ? theme.colors.blue : theme.colors.black,
            position: 'absolute',
            bottom: 5,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: theme.borderRadius.small,
            borderColor: theme.colors.black,
            borderWidth: 1,
            width: '150%',
            height: '40%',
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xs,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
        }
    })

export default Icon