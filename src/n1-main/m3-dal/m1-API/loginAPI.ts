import {instance} from '../instance';
import {AxiosResponse} from 'axios';

export const LoginAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<UserResponseType>>(`auth/login/`, data);
    },
    logout() {
        return instance.delete<AxiosResponse<LogoutResponseType>>('auth/me')
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LogoutResponseType = {
    info: string
    error?: string
}

export type UserResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    token: string;
    publicCardPacksCount: number; // количество колод
    created: Date | null;
    updated: Date | null;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string,
}


