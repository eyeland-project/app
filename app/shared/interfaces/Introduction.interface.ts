export interface Introduction {
	id: number;
	name: string;
	description: string;
	taskOrder: number;
	thumbnailUrl: string;
	thumbnailAlt: string;
	keywords: string[];
	longDescription: string;
}

export interface getIntroductionParams {
	taskOrder: number;
}
