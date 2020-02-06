export interface User {
    value: string,
    password: string,
}
export interface AuthResponse {
    access_token: string,
}

export interface Post {
    checked?: boolean,
    _id?: string,
    priority?: number,
    value: string,

}
