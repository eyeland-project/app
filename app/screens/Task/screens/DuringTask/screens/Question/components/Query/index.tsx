import MemoryProView from './MemoryProView';
import SuperRadarView from './SuperRadarView';
import SuperHearing from './SuperHearing';
import DefaultView from './DefaultView';

import { Power } from '@enums/Power.enum';

interface Props {
	text: string;
	power: Power | null;
	nounTranslations: string[];
	prepositionTranslations: string[];
	imgAlt: string;
}

const Query = ({
	text,
	power,
	nounTranslations,
	prepositionTranslations,
	imgAlt
}: Props) => {
	switch (power) {
		case Power.MEMORY_PRO:
			return (
				<MemoryProView
					text={text}
					nounTranslations={nounTranslations}
				/>
			);

		case Power.SUPER_RADAR:
			return (
				<SuperRadarView
					text={text}
					prepositionTranslations={prepositionTranslations}
				/>
			);

		case Power.SUPER_HEARING:
			return <SuperHearing text={text} imgAlt={imgAlt} />;

		default:
			return <DefaultView text={text} />;
	}
};

export default Query;
