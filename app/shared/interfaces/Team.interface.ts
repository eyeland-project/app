import { Student } from './Student.interface';

export interface Team {
    id: number;
    code: string;
    name: string;
    students: Student[];
}