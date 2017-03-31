import { User } from './user';

export class RSO {
    rid: string;
    userId: string;         //userId of admin
    rsoName: string;           //name of RSO
    status: string;         // Approved, not-approved, pending....
    unid: string;           //university id
    users: User[];
}