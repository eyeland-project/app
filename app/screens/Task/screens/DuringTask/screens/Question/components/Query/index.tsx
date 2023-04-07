import MemoryProView from './MemoryProView'
import SuperRadarView from './SuperRadarView'
import SuperHearing from './SuperHearing'
import DefaultView from './DefaultView'

import { Power } from '@enums/Power.enum'

interface Props {
    text: string
    power: Power | null
    nounTranslations: string[]
    prepositionTranslations: string[]
}

const Query = ({ text, power, nounTranslations, prepositionTranslations }: Props) => {
    switch (power) {
        case Power.MemoryPro:
            return <MemoryProView text={text} nounTranslations={nounTranslations} />

        case Power.SuperRadar:
            return <SuperRadarView text={text} prepositionTranslations={prepositionTranslations} />

        case Power.SuperHearing:
            return <SuperHearing text={text} />

        default:
            return <DefaultView text={text} />
    }
}

export default Query