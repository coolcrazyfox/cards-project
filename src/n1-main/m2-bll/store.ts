import {applyMiddleware, combineReducers, createStore} from 'redux';
import {ActionsProfileType, profileReducer} from './b1-reducers/profileReducer';
import {ActionsLoginType, loginReducer} from './b1-reducers/loginReducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {ActionsAppType, appReducer} from './b1-reducers/appReducer';
import {ActionsRegistrationType, registrationReducer} from './b1-reducers/registrationReducer';
import {ActionsPacksType, packReducer} from './b1-reducers/packReducer';
import {ActionsCardsType, cardReducer} from './b1-reducers/cardReducer';

const reducers = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    packs: packReducer,
    cards: cardReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))
export type AppStoreType = ReturnType<typeof reducers>

export type AppStoreActionType =
    ActionsAppType
    | ActionsLoginType
    | ActionsPacksType
    | ActionsProfileType
    | ActionsRegistrationType
    | ActionsCardsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppStoreActionType>

//@ts-ignore
window.store = store