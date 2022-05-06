import {instance} from '../instance';
import {AxiosResponse} from 'axios';

export const CardsAPI = {
    getCards(params: Partial<CardParamsType>) {
        return instance.get<CardsResponseType>('cards/card/', {params: params})
    },
    addCard(card: Partial<AddCardParamsType>) {
        return instance.post('cards/card/', {card})
    },
    deleteCard(cardId: string) {
        return instance.delete('cards/card/', {params: {id: cardId}})
    },
    updateCard(card: Partial<UpdateCardParamsType>) {
        return instance.put('cards/card/', {card})
    },
    gradeCard(card: GradeCardParamsType) {
        return instance.put<GradeCardParamsType, AxiosResponse<UpdatedGradeResponseType>>('cards/grade/', card)
    }
}

export type CardParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}

export type CardsResponseType = {
    cards: CardType []
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type UpdatedGradeResponseType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type AddCardParamsType = {
    cardsPack_id: string
    question: string
    answer: string
    grade: number
    shots: number
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
}

export type UpdateCardParamsType = {
    _id: string
    question: string
    comments: string
}

export type GradeCardParamsType = {
    grade: number
    card_id: string
}