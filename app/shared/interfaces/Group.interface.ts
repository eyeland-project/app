import { User } from "./User.interface";

export interface Group {
    id: number;
    name: string;
    members: User[];
}
