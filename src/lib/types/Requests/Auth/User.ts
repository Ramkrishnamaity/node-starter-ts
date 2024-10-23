
export type RegisterRequestType = {
    name: string
    email: string
    password: string
    image?: string
}

export type LoginRequestType = {
    email: string
    password: string
}
