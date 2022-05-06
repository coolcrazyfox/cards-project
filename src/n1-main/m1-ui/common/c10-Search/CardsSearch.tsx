import React, {ChangeEvent, useState} from 'react';
import s from './CardsSearch.module.css'
import {useDispatch} from 'react-redux';
import {setAnswerFilteredCardsAC, setQuestionFilteredCardsAC} from '../../../m2-bll/b1-reducers/cardReducer';

export const CardsSearch = () => {
    const dispatch = useDispatch()

    let [questionEvent, setQuestionEvent] = useState<string>('')
    let [answerEvent, setAnswerEvent] = useState<string>('')

    const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionEvent(e.currentTarget.value)
    }

    const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerEvent(e.currentTarget.value)
    }

    let onClickQuestionFilteredHandler = () => {
        setAnswerEvent('')
        dispatch(setAnswerFilteredCardsAC(''))
        dispatch(setQuestionFilteredCardsAC(questionEvent));
    }

    let onClickAnswerFilteredHandler = () => {
        setQuestionEvent('')
        dispatch(setQuestionFilteredCardsAC(''));
        dispatch(setAnswerFilteredCardsAC(answerEvent));
    }

    return (
        <div>
            <div className={s.wrap}>
                <div>
                    <input
                        type="text"
                        placeholder="Search question"
                        value={questionEvent}
                        onChange={handleQuestionChange}
                    />
                    <button onClick={onClickQuestionFilteredHandler} className={s.btnSearch}></button>
                </div>
            </div>
            <div className={s.wrap}>
                <div>
                    <input
                        type="text"
                        placeholder="Search answer"
                        value={answerEvent}
                        onChange={handleAnswerChange}
                    />
                    <button onClick={onClickAnswerFilteredHandler} className={s.btnSearch}></button>
                </div>
            </div>
        </div>
    );
}