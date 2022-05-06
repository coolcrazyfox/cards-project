import {instance} from '../instance';
import {AxiosResponse} from 'axios';

export const registrationAPI = {
    registration(data: RegistrationParamsType) {
        return instance.post<RegistrationParamsType, AxiosResponse>(`auth/register/`, data);
    }
}

export type RegistrationParamsType = {
    email: string
    password: string
    confirmPassword:string
}