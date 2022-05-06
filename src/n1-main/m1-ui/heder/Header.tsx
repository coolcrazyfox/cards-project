import React from 'react';
import {PATH} from '../routes/RoutesRoot';
import {NavLink} from 'react-router-dom';
import style from '../styles/Profile.module.css';
import SuperButton from '../common/c2-SuperButton/SuperButton';
import {logoutTC} from '../../m2-bll/b1-reducers/loginReducer';
import {useDispatch} from 'react-redux';
import s from './Header.module.css'

const setActive = ({isActive}: { isActive: boolean }) => isActive ? s.activeLink : s.item

export const Header = () => {
    const dispatch = useDispatch()

    const onClickLogoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <nav>
            <div className={s.header}>
                <div className={s.headerContainer}>
                    {/*<h1 className={s.title}>IT-incubator</h1>*/}
                    <div className={s.headerBlock}>
                        <div className={s.itemMenu}>
                            <NavLink className={setActive} to={PATH.PACKS}>PackList</NavLink>
                        </div>
                        <div className={s.itemMenu}>
                            <NavLink className={setActive} to={PATH.PROFILE}>ProfilePage</NavLink>
                        </div>
                        <div className={s.itemMenuBtn}>
                            <SuperButton className={style.btn} onClick={onClickLogoutHandler}>Log Out</SuperButton>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    );
}
