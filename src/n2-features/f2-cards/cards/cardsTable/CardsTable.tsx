import React, {useCallback, useState} from 'react';
import {CardType} from '../../../../n1-main/m3-dal/m1-API/cardsAPI';
import {Card} from './Card';
import cardsS from './CardsTable.module.css'
import {useDispatch} from 'react-redux';
import {setCardsSortAC} from '../../../../n1-main/m2-bll/b1-reducers/cardReducer';

export type CardsTablePropsType = {
    cards: CardType []
}

export const CardsTable: React.FC<CardsTablePropsType> = ({cards}) => {
    const dispatch = useDispatch()

    const [questionSortValue, setQuestionSortValue] = useState<'0question' | '1question'>('0question');
    const [answerSortValue, setAnswerSortValue] = useState<'0answer' | '1answer'>('0answer');
    const [lastUpdatedValue, setLastUpdatedValue] = useState<'0updated' | '1updated'>('0updated');
    const [gradeSortValue, setGradeSortValue] = useState<'0grade' | '1grade'>('0grade');

    const questionSortHandler = useCallback(() => {
        if (questionSortValue === '1question') {
            setQuestionSortValue('0question')
        } else {
            setQuestionSortValue('1question')
        }
        dispatch(setCardsSortAC(questionSortValue))
    }, [dispatch, questionSortValue])

    const answerSortHandler = useCallback(() => {
        if (answerSortValue === '1answer') {
            setAnswerSortValue('0answer')
        } else {
            setAnswerSortValue('1answer')
        }
        dispatch(setCardsSortAC(answerSortValue))
    }, [dispatch, answerSortValue])

    const lastUpdatedHandler = useCallback(() => {
        if (lastUpdatedValue === '1updated') {
            setLastUpdatedValue('0updated')
        } else {
            setLastUpdatedValue('1updated')
        }
        dispatch(setCardsSortAC(lastUpdatedValue))
    }, [dispatch, lastUpdatedValue])

    const gradeSortHandler = useCallback(() => {
        if (gradeSortValue === '1grade') {
            setGradeSortValue('0grade')
        } else {
            setGradeSortValue('1grade')
        }
        dispatch(setCardsSortAC(gradeSortValue))
    }, [dispatch, gradeSortValue])

    return (
        <div>
            <div className={cardsS.tableHeaderWrapper}>
                <div className={cardsS.tableHeader}>
                    <div onClick={questionSortHandler}>
                        Question
                    </div>
                    <div onClick={answerSortHandler}>
                        Answer
                    </div>
                    <div onClick={lastUpdatedHandler}>
                        Last Updated
                    </div>
                    <div onClick={gradeSortHandler}>
                        Grade
                    </div>
                    <div>
                        Actions
                    </div>
                </div>
            </div>
            <div className={cardsS.tableContainer}>
                <div style={{height: '440px'}}>
                    {cards && cards.map(card => <Card key={card._id} card={card}/>)}
                </div>
            </div>
        </div>
    );
};
