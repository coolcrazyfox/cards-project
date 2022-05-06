import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {CardType} from '../../../n1-main/m3-dal/m1-API/cardsAPI';
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {fetchCardsTC, gradeAnswerTC, setPageCountAC} from '../../../n1-main/m2-bll/b1-reducers/cardReducer';
import {AppStatusType} from '../../../n1-main/m2-bll/b1-reducers/appReducer';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesRoot';
import SuperRadio from '../../../n1-main/m1-ui/common/c6-SuperRadio/SuperRadio';
import {Header} from '../../../n1-main/m1-ui/heder/Header';
import {Loading} from '../../../n1-main/m1-ui/common/c0-Preloder/Loading';
import s from './Learn.module.css'

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const Learn = () => {
    const {packId, packName, cardsTotalCount} = useParams<string>();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const status = useSelector<AppStoreType, AppStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const cards = useSelector<AppStoreType, CardType []>((store) => store.cards.cards);

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [rating, setRating] = useState<string>('')
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        created: '',
        updated: '',
        user_id: '',
    });

    useEffect(() => {
        if (packId && cardsTotalCount) {
            dispatch(fetchCardsTC(packId, +cardsTotalCount))
        }
        return () => {
            dispatch(setPageCountAC(10))
        }
    }, [packId, cardsTotalCount])

    useEffect(() => {
        if (cards.length > 0) setCard(getCard(cards));
    }, [cards, dispatch]);

    const onNext = () => {
        if (rating) {
            setIsChecked(false)
            setRating('')
            dispatch(gradeAnswerTC(grades.findIndex(el => el === rating) + 1, card._id))
            if (cards.length > 0) setCard(getCard(cards));
        }
    }

    const onClickCancelHandler = () => {
        navigate(PATH.PACKS, {replace: true})
    }

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if (status === 'loading') return <Loading/>

    return (
        <div>
            <Header/>
            <div className={s.mainContainer}>

                <div className={s.container_log}>
                    <h2>Learn {packName}</h2>
                    <div>
                        <div className={s.block}><b>Question</b>: {card.question}</div>
                        {
                            isChecked && (
                                <>
                                    <div className={s.radioBlock}>
                                        <div className={`${s.gap} ${s.block}`}><b>Answer</b>: {card.answer}</div>
                                        <SuperRadio name={'radio'}
                                                    options={grades}
                                                    value={rating}
                                                    onChangeOption={setRating}
                                        />
                                    </div>
                                </>
                            )}
                    </div>
                    <div className={s.btnBlock}>
                        {
                            isChecked
                                ? <SuperButton onClick={onNext} disabled={!rating}>Next</SuperButton>
                                : <SuperButton onClick={() => setIsChecked(true)}>Answer</SuperButton>
                        }
                        <SuperButton onClick={onClickCancelHandler}>Cancel</SuperButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
