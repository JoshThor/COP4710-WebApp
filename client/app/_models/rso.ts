import { User } from './user';

export class RSO {
    _id: string;
    userId: string;         //userId of admin
    name: string;           //name of RSO
    status: string;         // Approved, not-approved, pending....
    users: User[];
}