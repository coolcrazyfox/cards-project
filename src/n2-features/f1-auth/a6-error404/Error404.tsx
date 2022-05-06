import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Error404.module.css'
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesRoot';
import img404 from './error.png'

export function Error404() {
    return (
        <div className={s.errorBlock}>
            <div className={s.nameContainer}>
                <h2 className={s.nameText}>
                    <span>N</span>
                    <span>o</span>
                    <span>t&nbsp;&nbsp;</span>
                    <span>F</span>
                    <span>o</span>
                    <span>u</span>
                    <span>n</span>
                    <span>d</span>
                </h2>
            </div>
            <div className={s.btnBox}>
                <NavLink to={PATH.PROFILE}><SuperButton className={s.btn}>
                    Go to homepage
                </SuperButton>
                </NavLink>
            </div>
            <img src={img404} alt="404"/>
        </div>
    )
}


