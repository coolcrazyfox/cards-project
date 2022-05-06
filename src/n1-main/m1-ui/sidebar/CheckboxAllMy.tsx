import React, {useState} from 'react';
import SuperRadio from '../common/c6-SuperRadio/SuperRadio';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../m2-bll/store';
import {MyPackType, setMyPacksAC} from '../../m2-bll/b1-reducers/packReducer';

const options = ['My', 'All']

export const CheckboxAllMy = React.memo( () => {
    const dispatch = useDispatch()
    const myPacks = useSelector<AppStoreType, MyPackType>(state => state.packs.myPacks)
    const [value, onChangeOption] = useState(myPacks)

    if (value === 'My') {
        dispatch(setMyPacksAC('My'))
    } else {
        dispatch(setMyPacksAC('All'))
    }

    return (
        <div>
            <SuperRadio
                name={'radioCheckBox'}
                options={options}
                value={value}
                onChangeOption={onChangeOption}
            />
        </div>
    );
});
