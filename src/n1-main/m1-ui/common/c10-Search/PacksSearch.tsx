import React, {ChangeEvent, useState} from "react";
import s from './PackSearch.module.css'
import {useDispatch} from "react-redux";
import {changeCurrentPageAC, setFilteredPacksAC} from '../../../m2-bll/b1-reducers/packReducer';

export const PacksSearch = () => {
    const dispatch = useDispatch()
    let [event, setEvent] = useState<string>('')

    let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent(e.currentTarget.value)

    };

    let BtnHandler = () => {
        dispatch(setFilteredPacksAC(event))
        dispatch(changeCurrentPageAC(1))
    }

    return (
        <div className={s.wrap}>
            <input
                type="text"
                placeholder="Search..."
                value={event}
                onChange={handleChange}
            />
            <button onClick={BtnHandler} className={s.btnSearch}></button>
        </div>
    );
}

