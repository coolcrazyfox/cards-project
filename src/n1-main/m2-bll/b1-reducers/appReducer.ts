import {Dispatch} from 'redux';
import {addUserDateAC, AddUserDateACType, setIsLoggedInAC, SetIsLoggedInACType} from './loginReducer';
import {profileAPI} from '../../m3-dal/m1-API/profileAPI';

const initialState: InitialStateType = {
    status: 'idle',
    isInitialize: false,
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-APP-STATUS': {
            return {...state, status: action.payload.status}
        }
        case 'app/INITIALIZE-ME': {
            return {...state, isInitialize: action.payload.isInitialize}
        }
        case 'app/SET-ERROR': {
            return {...state, error: action.payload.error}
        }
        default:
            return state
    }
}

//action
export const setAppStatusAC = (status: AppStatusType) => {
    return {type: 'app/SET-APP-STATUS', payload: {status}} as const
}
export const initializeMeAC = (isInitialize: boolean) => {
    return {type: 'app/INITIALIZE-ME', payload: {isInitialize}} as const
}
export const setErrorAC = (error: string) => {
    return {type: 'app/SET-ERROR', payload: {error}} as const
}

//thunk
export const authMeTC = () => (dispatch: Dispatch<ActionsAppType>) => {
    profileAPI.authMe()
        .then((res) => {
            dispatch(addUserDateAC(res.data))
            dispatch(setIsLoggedInAC(true))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            setErrorAC(error)
        })
        .finally(() => {
            dispatch(initializeMeAC(true))
        })
}

//type
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: AppStatusType
    isInitialize: boolean
    error: string | null
}

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type InitializeMeACType = ReturnType<typeof initializeMeAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>

export type ActionsAppType =
    SetAppStatusACType
    | SetErrorACType
    | AddUserDateACType
    | SetIsLoggedInACType
    | InitializeMeACType
