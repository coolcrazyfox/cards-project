import {instance} from '../instance';
import {AxiosResponse} from 'axios';
import {UserResponseType} from './loginAPI';

export const profileAPI = {
    updateUser(data: ProfileParamsType) {
        return instance.put<ProfileParamsType, AxiosResponse<UpdateUserResponseType>>(`auth/me`, data);
    },
    authMe() {
        return instance.post<UserResponseType>(`auth/me`);
    },
}

export type ProfileParamsType = {
    name: string | undefined
    avatar: string | undefined
}

export type UpdateUserResponseType = {
    updatedUser: UserResponseType
}






