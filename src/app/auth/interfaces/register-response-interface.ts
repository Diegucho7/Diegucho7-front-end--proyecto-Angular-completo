import { User } from "./user-interface";

export interface RegisterResponse{
    user:  User;
    name: string;
    password: string;
    password2: string;
    email: string;
    role: string[];
}