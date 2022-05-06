import React, {useEffect, useState} from 'react';
import {CheckboxAllMy} from './CheckboxAllMy';
import SuperDoubleRange from '../common/c9-SuperDoubleRange/SuperDoubleRange';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../m2-bll/store';
import {setMaxAC, setMinAC} from '../../m2-bll/b1-reducers/packReducer';
import s from './Sidebar.module.css'

export const Sidebar = () => {
    const dispatch = useDispatch()
    const min = useSelector<AppStoreType, number>(state => state.packs.min)
    const max = useSelector<AppStoreType, number>(state => state.packs.max)
    const maxCardsCount = useSelector<AppStoreType, number>(state => state.packs.maxCardsCount)
    const [id, setId] = useState(0)

    useEffect(() => {
        dispatch(setMaxAC(maxCardsCount))
    }, [maxCardsCount])

    const onChangeDoubleRanger = (value: [number, number]) => {
        if (value[0] !== min || value[1] !== max) {
            const idTime = +setTimeout(() => {
                dispatch(setMinAC(value[0]))
                dispatch(setMaxAC(value[1]))
            }, 1000)
            setId(idTime)
        }
        clearTimeout(id)
    }

    return (
        <div>
            <div>
                <h2>Show packs cards</h2>
                <CheckboxAllMy/>
            </div>

            <div>
                <h2>Number of cards</h2>
                <div className={s.doubleRangeBlock}>
                    <span>{min}</span>
                    <SuperDoubleRange
                        value={[min, max]}
                        max={maxCardsCount}
                        onChangeRange={onChangeDoubleRanger}
                    />
                    <span>{max}</span>
                </div>
            </div>
        </div>
    );
};
