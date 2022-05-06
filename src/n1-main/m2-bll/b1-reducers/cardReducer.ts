import {Dispatch} from 'redux';
import {AppStoreType, AppThunkType} from '../store';
import {setAppStatusAC, SetAppStatusACType, setErrorAC, SetErrorACType} from './appReducer';
import {
    CardsAPI,
    CardsResponseType,
    CardType,
    GradeCardParamsType,
    UpdatedGradeResponseType
} from '../../m3-dal/m1-API/cardsAPI';

const initialState: InitialCardsStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 1,
    page: 1,
    pageCount: 10,
    packUserId: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 0,
    sortCards: '0updated',
    cardsPack_id: '',
}

export const cardReducer = (state: InitialCardsStateType = initialState, action: ActionsCardsType): InitialCardsStateType => {
    switch (action.type) {
        case 'card/SET-CARDS': {
            return {...state, ...action.payload}
        }
        case 'cards/SET-QUESTION-FILTERED-CARDS': {
            return {...state, cardQuestion: action.payload}
        }
        case 'cards/SET-ANSWER-FILTERED-CARDS': {
            return {...state, cardAnswer: action.payload}
        }
        case 'cards/SET-PAGE-COUNT': {
            return {...state, pageCount: action.payload}
        }
        case 'cards/SET-CARDS-SORT': {
            return {...state, sortCards: action.payload, page: 1}
        }
        case 'cards/CHANGE-CURRENT-PAGE-CARDS': {
            return {...state, page: action.payload}
        }
        case 'cards/SET-CARDS-GRADE': {
            return {
                ...state, cards: state.cards.map(card => card._id === action.payload.card_id
                    ? {...card, shots: action.payload.shots, grade: action.payload.grade}
                    : card)
            }
        }
        default:
            return state
    }
}

//action
export const setCardsAC = (data: CardsResponseType) => {
    return {type: 'card/SET-CARDS', payload: data} as const
}
export const setQuestionFilteredCardsAC = (cardQuestion: string) => {
    return {type: 'cards/SET-QUESTION-FILTERED-CARDS', payload: cardQuestion} as const
}
export const setAnswerFilteredCardsAC = (cardAnswer: string) => {
    return {type: 'cards/SET-ANSWER-FILTERED-CARDS', payload: cardAnswer} as const
}
export const setCardsSortAC = (sortCards: string) => {
    return {type: 'cards/SET-CARDS-SORT', payload: sortCards} as const
}
export const setPageCountAC = (pageCount: number) => {
    return {type: 'cards/SET-PAGE-COUNT', payload: pageCount} as const
}
export const setCardsGradeAC = (updatedGrade: UpdatedGradeResponseType) => {
    return {type: 'cards/SET-CARDS-GRADE', payload: updatedGrade} as const
}
export const changeCurrentPageCardsAC = (page: number) => {
    return {type: 'cards/CHANGE-CURRENT-PAGE-CARDS', payload: page} as const
}

//thunk
export const fetchCardsTC = (packUId: string, maxCardsCount?: number) => (dispatch: Dispatch<ActionsCardsType>, getState: () => AppStoreType) => {

    let {cardAnswer, cardQuestion, page, min, max, sortCards, pageCount, cardsPack_id} = getState().cards
    cardsPack_id = packUId
    const currentPageCount = maxCardsCount || pageCount
    const payload = {cardAnswer, cardQuestion, page, min, max, sortCards, pageCount: currentPageCount, cardsPack_id}

    dispatch(setAppStatusAC('loading'))
    CardsAPI.getCards(payload)
        .then((res) => {
            dispatch(setCardsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}
export const addCardTC = (cardId: string, question: string, answer: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const payload = {
        cardsPack_id: cardId,
        question: question,
        answer: answer
    }
    CardsAPI.addCard(payload)
        .then(() => {
            cardId && dispatch(fetchCardsTC(cardId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}
export const deleteCardTC = (cardId: string, packId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    CardsAPI.deleteCard(cardId)
        .then(() => {
            dispatch(fetchCardsTC(packId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}
export const updateCardTC = (cardId: string, packId: string, question: string, answer: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const payload = {
        _id: cardId,
        question: question,
        answer: answer
    }
    CardsAPI.updateCard(payload)
        .then(() => {
            dispatch(fetchCardsTC(packId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}
export const gradeAnswerTC = (grade: number, cardId: string): AppThunkType => (dispatch) => {
    const payload: GradeCardParamsType = {
        grade: grade,
        card_id: cardId
    }
    dispatch(setAppStatusAC('loading'))
    CardsAPI.gradeCard(payload)
        .then((res) => {
            dispatch(setCardsGradeAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}

//type
export type InitialCardsStateType = {
    cards: CardType []
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
}

type GetCardsACType = ReturnType<typeof setCardsAC>
type SetQuestionFilteredCardsACType = ReturnType<typeof setQuestionFilteredCardsAC>
type SetAnswerFilteredCardsACType = ReturnType<typeof setAnswerFilteredCardsAC>
type SetPageCountACType = ReturnType<typeof setPageCountAC>
type SetCardsGradeACType = ReturnType<typeof setCardsGradeAC>
type SetCardsSortACType = ReturnType<typeof setCardsSortAC>
type ChangeCurrentPageCardsACType = ReturnType<typeof changeCurrentPageCardsAC>

export type ActionsCardsType =
    GetCardsACType
    | SetErrorACType
    | SetAppStatusACType
    | SetQuestionFilteredCardsACType
    | SetAnswerFilteredCardsACType
    | SetPageCountACType
    | SetCardsGradeACType
    | SetCardsSortACType
    | ChangeCurrentPageCardsACType