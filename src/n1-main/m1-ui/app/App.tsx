import React, {useEffect} from 'react';
import './App.css';
import {Main} from '../Main';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../m2-bll/store';
import {authMeTC} from '../../m2-bll/b1-reducers/appReducer';
import {Loading} from '../common/c0-Preloder/Loading';
import {RoutesRoot} from '../routes/RoutesRoot';

export const App = () => {
    const dispatch = useDispatch()
    const isInitialize = useSelector<AppStoreType, boolean>(state => state.app.isInitialize)

    useEffect(() => {
        dispatch(authMeTC())
    },[dispatch])

    if (!isInitialize) {
        return <Loading/>
    }

    return (
        <div className="App">
            <Main/>
            <RoutesRoot/>
        </div>
    );
}

