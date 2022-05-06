import React, {useState} from 'react';
import {PackType} from '../../../../n1-main/m3-dal/m1-API/packsAPI';
import {useDispatch, useSelector} from 'react-redux';
import {Loading} from '../../../../n1-main/m1-ui/common/c0-Preloder/Loading';
import {AppStoreType} from '../../../../n1-main/m2-bll/store';
import {AppStatusType} from '../../../../n1-main/m2-bll/b1-reducers/appReducer';
import s from './Pack.module.css'
import {deletePackTC, updatePackTC} from '../../../../n1-main/m2-bll/b1-reducers/packReducer';
import {NavLink} from 'react-router-dom';
import Modal from '../../../../n1-main/m1-ui/modal/Modal';
import ModalButtonsWrap from '../../../../n1-main/m1-ui/modal/ModalButtonsWrap';
import SuperButton from '../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import SuperInputText from '../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText';

type PackPropsType = {
    pack: PackType
}

export const Pack: React.FC<PackPropsType> = ({pack}) => {
    const dispatch = useDispatch()
    const status = useSelector<AppStoreType, AppStatusType>(state => state.app.status)
    const myUserId = useSelector<AppStoreType, string | undefined>(state => state.login.user?._id)
    const cardsTotalCount = useSelector<AppStoreType, number>(state => state.packs.maxCardsCount)

    const [newPackName, setNewPackName] = useState<string>(pack.name);
    const [isShownModal, setIsShownModal] = useState<boolean>(false)

    const [modalType, setModalType] = useState<'Delete' | 'Edit' | ''>('');
    const closeModal = () => setIsShownModal(false)
    const showModal = (modalType: 'Delete' | 'Edit' | '') => {
        setIsShownModal(true)
        setModalType(modalType)
    }

    const onClickDeletePackHandler = () => {
        setIsShownModal(false)
        dispatch(deletePackTC(pack._id))
    }
    const onClickUpdatePackHandler = () => {
        dispatch(updatePackTC(pack._id, newPackName))
        closeModal()
    }

    if (status === 'loading') {
        return <Loading/>
    }

    return (
        <div className={s.item}>
            <NavLink to={`/cards/${pack._id}`}>
                <div className={s.nameItem}>{pack.name.slice(0, 25)}</div>
            </NavLink>
            <div className={s.cardsCount}>{pack.cardsCount}</div>
            <div className={s.updated}>{pack.updated.slice(0, 10)}</div>
            <div className={s.buttons}>{myUserId === pack.user_id &&
                <>
                    <button className={s.btn} onClick={() => showModal('Delete')}>Delete</button>
                    <button className={s.btn} onClick={() => showModal('Edit')}>Edit</button>
                </>
            }
                <NavLink to={`/learn/${pack._id}/${pack.name}/${cardsTotalCount}`}>
                    <button className={s.btn} disabled={!pack.cardsCount}>Learn</button>
                </NavLink>
            </div>
            {
                modalType === 'Delete' &&
                <Modal title={'Delete Pack'} show={isShownModal} closeModal={closeModal}>
                    <p>Do you really want to remove Pack Name - {pack.name}?
                        You won't be able to revert this Pack Name.</p>
                    <ModalButtonsWrap closeModal={closeModal}>
                        <SuperButton onClick={onClickDeletePackHandler} red={true}>Delete</SuperButton>
                    </ModalButtonsWrap>
                </Modal>
            }
            {
                modalType === 'Edit' &&
                <Modal title={'Edit Pack'} show={isShownModal} closeModal={closeModal}>
                    <label>New name</label>
                    <SuperInputText value={newPackName} onChangeText={setNewPackName}/>
                    <ModalButtonsWrap closeModal={closeModal}>
                        <SuperButton onClick={onClickUpdatePackHandler}>Save</SuperButton>
                    </ModalButtonsWrap>
                </Modal>
            }
        </div>
    );
};