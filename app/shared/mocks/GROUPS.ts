import { Group } from '@interfaces/Group.interface';

export const GROUPS: Group[] = [
	{
		id: 1,
		name: 'Group 1',
		members: [
			{
				id: 1,
				name: 'User 1'
			},
			{
				id: 2,
				name: 'User 2'
			},
			{
				id: 3,
				name: 'User 3'
			}
		]
	},
	{
		id: 2,
		name: 'Group 2',
		members: [
			{
				id: 4,
				name: 'User 4'
			},
			{
				id: 5,
				name: 'User 5'
			}
		]
	},
	{
		id: 3,
		name: 'Group 3',
		members: []
	}
];
