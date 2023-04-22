export interface Task {
	id: number;
	name: string;
	description: string;
	taskOrder: number;
	completed: boolean;
	blocked: boolean;
	comingSoon: boolean;
	thumbnailUrl: string;
	thumbnailAlt: string;
}
