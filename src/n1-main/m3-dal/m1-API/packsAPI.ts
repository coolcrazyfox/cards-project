import {instance} from '../instance';

export const PacksAPI = {
    getPacks(params: Partial<PackParamsType>) {
        return instance.get<PacksResponseType>('cards/pack/', {params: params})
    },
    addPack(cardsPack: AddPackParamsType) {
        return instance.post('cards/pack/', {cardsPack})
    },
    deletePack(packId: string) {
        return instance.delete('cards/pack/', {params: {id: packId}})
    },
    updatePack(cardsPack:UpdatePackParamsType) {
        return instance.put('cards/pack/', {cardsPack})
    },
}

export type PackParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}

export type PacksResponseType = {
    cardPacks: PackType []
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type AddPackParamsType = {
    name: string
    deckCover: string
    private: boolean
}

export type UpdatePackParamsType = {
    _id: string
    name: string
}