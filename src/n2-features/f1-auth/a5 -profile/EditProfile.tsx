import React, {useState} from 'react';
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {EditableSpan} from '../../../n1-main/m1-ui/common/c8-EditableSpan/EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesRoot';
import {Navigate, useNavigate} from 'react-router-dom';
import {updateProfileTC} from '../../../n1-main/m2-bll/b1-reducers/profileReducer';
import preload from '../../../n1-main/m1-ui/common/c0-Preloder/Spinner.svg';
import {AppStatusType} from '../../../n1-main/m2-bll/b1-reducers/appReducer';
import style from '../../../n1-main/m1-ui/styles/EditProfile.module.css';

export const EditProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userName = useSelector<AppStoreType, string | undefined>(state => state.login.user?.name)
    const userEmail = useSelector<AppStoreType, string | undefined>(state => state.login.user?.email)
    const userAvatar = useSelector<AppStoreType, string | undefined>(state => state.login.user?.avatar)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppStoreType, AppStatusType>(state => state.app.status)

    const [name, setName] = useState<string | undefined>(userName)
    const [avatar, setAvatar] = useState<string | undefined>(userAvatar)

    const updateNameClickHandler = () => {
        dispatch(updateProfileTC({name, avatar}))
        navigate(PATH.PROFILE)
    }

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return (
        <div className={style.mainContainer}>
            <div className={style.container_log}>
                <div className={style.title}>
                    <h2>Personal Information</h2>
                </div>
                <div className={style.imgAvatar}>
                    <img className={style.img}
                         alt={'img'} src={userAvatar}/>
                </div>
                <div className={style.formContainer}>
                    <form>
                        <div className={style.avatarUrl}>
                            <div><b>Avatar url:</b></div>
                            <EditableSpan  span={avatar} updateSpan={setAvatar}/>
                        </div>
                        <div className={style.avatarUrl}>
                            <div><b>NickName:</b></div>
                            <EditableSpan span={name} updateSpan={setName}/>
                        </div>
                        <div className={style.avatarUrl}>
                            <div><b>Email:</b></div>
                            <span className={style.span}>{userEmail}</span>
                        </div>
                    </form>
                    <div className={style.btnContainer}>
                        <SuperButton
                            className={style.btn}
                            onClick={updateNameClickHandler}
                            disabled={status === 'loading'}>Save
                        </SuperButton>
                    </div>
                    <div>
                        {status === 'loading' ? <img src={preload} style={{height: '30px'}} alt={'pic'}/>
                            : <div><br/></div>}
                    </div>
                </div>
            </div>
        </div>
    );
};



