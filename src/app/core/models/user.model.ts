export interface Authenticate {
    email   : string;
    password: string;
}

export class User {
    id?          : number;
    username?    : string;
    password?    : string;
    avatar?      : string;
    bio?         : string;
    firstName?   : string;
    lastName?    : string;
    roles?       : string[];
    token?       : string;
}

export enum Role {
    User    = 'User',
    Admin   = 'Admin'
}