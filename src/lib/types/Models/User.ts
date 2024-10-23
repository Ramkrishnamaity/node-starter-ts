
export type UserModelType<T> = T & {
    name: string
    email: string
    password: string
    image: string
}