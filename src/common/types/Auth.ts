import exp from "constants";

export interface User {
    username: string;
    password?: string;
    isPdpa?: boolean;
    firstName?: string; 
    lastName?: string; 
    email?: string; 
    mobile?: string; 
    img?: string; 
}
export interface User { 
    role?: string;
    isRememberMe?:boolean;
    confirm_password?: string; 
}
 
export interface DataTokenDecode {
    data?: User;
    iat?: number;
    exp?: number;
}

export interface LogIn {
    user: string;
    password: string; 
    isRememberMe: boolean;
}