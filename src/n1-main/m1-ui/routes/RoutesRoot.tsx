import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login} from '../../../n2-features/f1-auth/a1-login/Login';
import {Error404} from '../../../n2-features/f1-auth/a6-error404/Error404';
import {Registration} from '../../../n2-features/f1-auth/a2-registration/Registration';
import {NewPassword} from '../../../n2-features/f1-auth/a3-newPassword/NewPassword';
import {Profile} from '../../../n2-features/f1-auth/a5 -profile/Profile';
import {EditProfile} from '../../../n2-features/f1-auth/a5 -profile/EditProfile';
import {PackList} from '../../../n2-features/f2-cards/packs/PackList';
import {Forgot} from '../../../n2-features/f1-auth/a4-forgot/Forgot';
import {CardsList} from '../../../n2-features/f2-cards/cards/CardsList';
import {Learn} from '../../../n2-features/f2-cards/learn/Learn';


export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/register',
    NEW_PASSWORD: '/set-new-password',
    FORGOT: '/forgot',
    PROFILE: '/profile',
    EDIT_PROFILE: '/edit-profile',
    PACKS: '/packs',
    CARDS: '/cards',
    LEARN: '/learn'
}

export const RoutesRoot = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.FORGOT} element={<Forgot/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.EDIT_PROFILE} element={<EditProfile/>}/>
                <Route path={PATH.PACKS} element={<PackList/>}/>
                <Route path={PATH.CARDS + '/:packId'} element={<CardsList/>}/>
                <Route path={PATH.LEARN + '/:packId/:packName/:cardsTotalCount'} element={<Learn/>} />
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
};
