export interface IUser {
    id: number | string,
    firstName: string,
    rule: string,
    image?: string
}

export interface IUserAuthorization {
    login: string,
    password: string
}