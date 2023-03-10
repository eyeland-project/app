import { View, Text, StyleSheet } from 'react-native'
import MemoryProView from './MemoryProView'
import SuperRadarView from './SuperRadarView'
import SuperHearing from './SuperHearing'
import DefaultView from './DefaultView'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'
import { Power } from '@enums/Power.enum'

interface Props {
    text: string
    power: Power
    nounTranslation: string
    prepositionTranslation: string
}

const Query = ({ text, power, nounTranslation, prepositionTranslation }: Props) => {
    const theme = useTheme()

    switch (power) {
        case Power.MemoryPro:
            return <MemoryProView text={text} nounTranslation={nounTranslation} />

        case Power.SuperRadar:
            return <SuperRadarView text={text} prepositionTranslation={prepositionTranslation} />

        case Power.SuperHearing:
            return <SuperHearing />

        default:
            return <DefaultView />
    }
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
        }
    })


export default Query