import { Role } from "./role";

export class User {
    player_id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
}

export class UserAuthentication {
    user: User;
    auth_message: string;
}