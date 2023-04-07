import MemoryProView from './MemoryProView'
import SuperRadarView from './SuperRadarView'
import SuperHearing from './SuperHearing'
import DefaultView from './DefaultView'

import { Power } from '@enums/Power.enum'

interface Props {
    text: string
    power: Power | null
    nounTranslation: string
    prepositionTranslation: string
}

const Query = ({ text, power, nounTranslation, prepositionTranslation }: Props) => {
    switch (power) {
        case Power.MemoryPro:
            return <MemoryProView text={text} nounTranslation={nounTranslation} />

        case Power.SuperRadar:
            return <SuperRadarView text={text} prepositionTranslation={prepositionTranslation} />

        case Power.SuperHearing:
            return <SuperHearing text={text} />

        default:
            return <DefaultView text={text} />
    }
}

export default Query