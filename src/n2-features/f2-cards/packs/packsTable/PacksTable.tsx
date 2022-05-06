import packsS from './PacksTable.module.css';
import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setPacksSortAC} from '../../../../n1-main/m2-bll/b1-reducers/packReducer';
import {Pack} from './Pack';
import {PackType} from '../../../../n1-main/m3-dal/m1-API/packsAPI';

export type PacksTablePropsType = {
    packs: PackType []
}

export const PacksTable: React.FC<PacksTablePropsType> = ({packs}) => {
    const dispatch = useDispatch();

    const [nameSortValue, setNameSortValue] = useState<'0name' | '1name'>('0name');
    const [cardsValue, setCardsValue] = useState<'0cardsCount' | '1cardsCount'>('0cardsCount');
    const [lastUpdatedValue, setLastUpdatedValue] = useState<'0updated' | '1updated'>('0updated');

    const nameSortHandler = useCallback(() => {
        if (nameSortValue === '1name') {
            setNameSortValue('0name');
        } else {
            setNameSortValue('1name');
        }
        dispatch(setPacksSortAC(nameSortValue));
    }, [dispatch, nameSortValue]);

    const cardsSortHandler = useCallback(() => {
        if (cardsValue === '1cardsCount') {
            setCardsValue('0cardsCount');
        } else {
            setCardsValue('1cardsCount');
        }
        dispatch(setPacksSortAC(cardsValue));
    }, [dispatch, cardsValue]);

    const lastUpdatedSortHandler = useCallback(() => {
        if (lastUpdatedValue === '1updated') {
            setLastUpdatedValue('0updated');
        } else {
            setLastUpdatedValue('1updated');
        }
        dispatch(setPacksSortAC(lastUpdatedValue));
    }, [dispatch, lastUpdatedValue]);

    return (
        <div>
            <div className={packsS.tableHeaderWrapper}>
                <div className={packsS.tableHeader}>
                    <div onClick={nameSortHandler}>
                        Name
                    </div>
                    <div onClick={cardsSortHandler}>
                        Cards
                    </div>
                    <div onClick={lastUpdatedSortHandler}>
                        Last Updated
                    </div>
                    <div>
                        Actions
                    </div>
                </div>
            </div>
            <div className={packsS.tableContainer}>
                <div style={{height: '440px'}}>
                    {packs && packs.map(pack => <Pack key={pack._id} pack={pack}/>)}
                </div>
            </div>
        </div>

    );
};
