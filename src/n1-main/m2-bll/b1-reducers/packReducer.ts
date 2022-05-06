import {Dispatch} from 'redux';
import {PacksAPI, PacksResponseType, PackType} from '../../m3-dal/m1-API/packsAPI';
import {AppStoreType, AppThunkType} from '../store';
import {setAppStatusAC, SetAppStatusACType, setErrorAC, SetErrorACType} from './appReducer';

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 10,
    myPacks: 'All',
    sortPacks: '0updated',
    min: 0,
    max: 0,
    packName: '',
    user_id: '',
}

export const packReducer = (state: InitialStateType = initialState, action: ActionsPacksType): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS': {
            return {...state, ...action.payload}
        }
        case 'packs/SET-MY-PACKS': {
            return {...state, myPacks: action.payload, min: 0}
        }
        case 'packs/SET-FILTERED-PACKS': {
            return {...state, packName: action.payload}
        }
        case 'packs/CHANGE-CURRENT-PAGE': {
            return {...state, page: action.payload}
        }
        case 'packs/SET-PAGE-COUNT': {
            return {...state, pageCount: action.payload}
        }
        case 'packs/SET-PACKS-SORT': {
            return {...state, sortPacks: action.payload}
        }
        case 'packs/SET-MIN': {
            return {...state, min: action.payload}
        }
        case 'packs/SET-MAX': {
            return {...state, max: action.payload}
        }
        default:
            return state
    }
}

//action
export const setPacksAC = (data: PacksResponseType) => {
    return {type: 'packs/SET-PACKS', payload: data} as const
}
export const setMyPacksAC = (value: MyPackType) => {
    return {type: 'packs/SET-MY-PACKS', payload: value} as const
}
export const setFilteredPacksAC = (packName: string) => {
    return {type: 'packs/SET-FILTERED-PACKS', payload: packName} as const
}
export const changeCurrentPageAC = (page: number) => {
    return {type: 'packs/CHANGE-CURRENT-PAGE', payload: page} as const
}
export const setPageCountAC = (pageCount: number) => {
    return {type: 'packs/SET-PAGE-COUNT', payload: pageCount} as const
}
export const setPacksSortAC = (sortPacks: string) => {
    return {type: 'packs/SET-PACKS-SORT', payload: sortPacks} as const
}
export const setMinAC = (min: number) => {
    return {type: 'packs/SET-MIN', payload: min} as const
}
export const setMaxAC = (max: number) => {
    return {type: 'packs/SET-MAX', payload: max} as const
}

//thunk
export const fetchPacksTC = () => (dispatch: Dispatch<ActionsPacksType>, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'))

    let {cardPacksTotalCount, packName, min, max, sortPacks, page, pageCount, user_id, myPacks} = getState().packs
    let myUserId = getState().login.user!._id

    user_id = myPacks === 'My' ? myUserId : user_id
    const payload = {cardPacksTotalCount, packName, min, max, sortPacks, page, pageCount, user_id}

    PacksAPI.getPacks(payload)
        .then((res) => {
            dispatch(setPacksAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}
export const addPackTC = (packName: string, privateValue: boolean): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const payload = {
        name: packName,
        deckCover: '',
        private: privateValue
    }
    PacksAPI.addPack(payload)
        .then(() => {
            dispatch(fetchPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}
export const deletePackTC = (packId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    PacksAPI.deletePack(packId)
        .then(() => {
            dispatch(fetchPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}
export const updatePackTC = (packId: string, packName: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const payload = {
        _id: packId,
        name: packName
    }
    PacksAPI.updatePack(payload)
        .then(() => {
            dispatch(fetchPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}

//type
export type InitialStateType = {
    cardPacks: PackType [],
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    page: number,
    pageCount: number,
    myPacks: MyPackType,
    sortPacks: string,
    min: number,
    max: number,
    packName: string,
    user_id: string,
}
export type MyPackType = 'All' | 'My'

type GetPacksACType = ReturnType<typeof setPacksAC>
type SetMyPacksACType = ReturnType<typeof setMyPacksAC>
type setFilteredPacksACType = ReturnType<typeof setFilteredPacksAC>
type ChangeCurrentPageACType = ReturnType<typeof changeCurrentPageAC>
type SetPageCountACType = ReturnType<typeof setPageCountAC>
type SortPacksACType = ReturnType<typeof setPacksSortAC>
type SetMinACType = ReturnType<typeof setMinAC>
type SetMaxACType = ReturnType<typeof setMaxAC>

export type ActionsPacksType =
    GetPacksACType
    | SetErrorACType
    | SetAppStatusACType
    | SetMyPacksACType
    | setFilteredPacksACType
    | ChangeCurrentPageACType
    | SetPageCountACType
    | SortPacksACType
    | SetMinACType
    | SetMaxACType