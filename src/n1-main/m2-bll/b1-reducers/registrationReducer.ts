import {Dispatch} from 'redux';
import {setAppStatusAC, SetAppStatusACType, setErrorAC, SetErrorACType} from './appReducer';
import {registrationAPI, RegistrationParamsType} from '../../m3-dal/m1-API/registrationAPI';
import {SetIsLoggedInACType} from './loginReducer';

const initialState: InitialStateType = {
    isRegistered: false,
}

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsRegistrationType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-REGISTRATION': {
            return {...state, isRegistered: action.payload.isRegistered}
        }
        default:
            return state
    }
}

//action
export const setRegistrationAC = (isRegistered: boolean) => {
    return {type: 'registration/SET-REGISTRATION', payload: {isRegistered}} as const
}

//thunk
export const registrationTC = (data: RegistrationParamsType) => (dispatch: Dispatch<ActionsRegistrationType>) => {
    dispatch(setAppStatusAC('loading'))
    registrationAPI.registration(data)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setRegistrationAC(true))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}

//type
export type InitialStateType = {
    isRegistered: boolean
}

type SetRegistrationACType = ReturnType<typeof setRegistrationAC>

export type ActionsRegistrationType =
    | SetAppStatusACType
    | SetIsLoggedInACType
    | SetRegistrationACType
    | SetErrorACType
