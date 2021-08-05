export interface IRegAccount {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    roles: string[] | string;
}

export interface IAuthAccount {
    username: string;
    password: string;
}

export interface IAuthResponse {
    token: string;
    roles: string[] | string;
}

export interface IAccountData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}
export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}