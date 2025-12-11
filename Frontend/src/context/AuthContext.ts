import { createContext } from 'react'

export type AuthContextUserType = {
    id: string,
    name: string,
    gender: string,
    description: string,
    email: string,
    birthdate: string,
    image: string,
    available: string,
    password: string,
    token: string,
}
export type AuthContextType = {
    user : AuthContextUserType | null,
    // isLoading : boolean,
    login : (email : string, password : string) => void,
    logout : () => void,
    reload : () => void,
}

// export const AuthContext = createContext<AuthContextType>({user : null, login : () => {}, logout : () => {}} );
export const AuthContext = createContext<AuthContextType>({user : null, login : () => {}, logout : () => {}, reload : () => {}} );

/* const defaultValues : AuthContextType = {
    id: '',
    name: '',
    gender: '',
    description: '',
    email: '',
    birthdate: '',
    image: '',
    available: '',
    password: '',
    token: '',
} */

// export const AuthContext = createContext<AuthContextType | null>(defaultValues);