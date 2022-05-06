import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardType} from '../../../../n1-main/m3-dal/m1-API/cardsAPI';
import {AppStoreType} from '../../../../n1-main/m2-bll/store';
import {AppStatusType} from '../../../../n1-main/m2-bll/b1-reducers/appReducer';
import {Loading} from '../../../../n1-main/m1-ui/common/c0-Preloder/Loading';
import {deleteCardTC, updateCardTC} from '../../../../n1-main/m2-bll/b1-reducers/cardReducer';
import s from './Card.module.css';
import Modal from '../../../../n1-main/m1-ui/modal/Modal';
import SuperButton from '../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import ModalButtonsWrap from '../../../../n1-main/m1-ui/modal/ModalButtonsWrap';
import SuperTextArea from '../../../../n1-main/m1-ui/common/c13-SuperTextArea/SuperTextArea';
import StarRating from './StarRating';

export type CardPropsType = {
    card: CardType
}

export const Card: React.FC<CardPropsType> = ({card}) => {

    const dispatch = useDispatch()
    const status = useSelector<AppStoreType, AppStatusType>(state => state.app.status)
    const myUserId = useSelector<AppStoreType, string | undefined>(state => state.login.user?._id)

    const [newQuestion, setNewQuestion] = useState<string>(card.question);
    const [newAnswer, setNewAnswer] = useState<string>(card.answer);
    const [isShownModal, setIsShownModal] = useState<boolean>(false)

    const [modalType, setModalType] = useState<'Delete' | 'Edit' | ''>('');
    const closeModal = () => setIsShownModal(false)
    const showModal = (modalType: 'Delete' | 'Edit' | '') => {
        setIsShownModal(true)
        setModalType(modalType)
    }

    const onClickDeleteCardHandler = () => {
        setIsShownModal(false)
        dispatch(deleteCardTC(card._id, card.cardsPack_id))
    }
    const onClickUpdateCardHandler = () => {
        dispatch(updateCardTC(card._id, card.cardsPack_id, newQuestion, newAnswer))
        closeModal()
    }

    if (status === 'loading') {
        return <Loading/>
    }

    return (
        <div className={s.item}>
            <div className={s.question}>{card.question.slice(0, 20)}</div>
            <div className={s.answer}>{card.answer.slice(0, 15)}</div>
            <div className={s.updated}>{card.updated.slice(0, 10)}</div>
            <StarRating numTotalStars={5} initialRating={card.grade}/>
            <div className={s.buttons}>{myUserId === card.user_id &&
                <>
                    <button className={s.btn} onClick={() => showModal('Delete')}>Delete</button>
                    <button className={s.btn} onClick={() => showModal('Edit')}>Edit</button>
                </>
            }
            </div>
            {modalType === 'Delete' &&
                <Modal title={'Delete Card'} show={isShownModal} closeModal={closeModal}>
                    <p>Do you really want to remove Card?</p>
                    <ModalButtonsWrap closeModal={closeModal}>
                        <SuperButton onClick={onClickDeleteCardHandler} red={true}>Delete</SuperButton>
                    </ModalButtonsWrap>
                </Modal>
            }
            {modalType === 'Edit' &&
                <Modal title={'Edit Card'} show={isShownModal} closeModal={closeModal}>
                    <div className={s.textArea}>
                        <label>New Question</label>
                        <SuperTextArea value={newQuestion} onChangeText={setNewQuestion}/>
                    </div>
                    <div className={s.textArea}>
                        <label>New Answer</label>
                        <SuperTextArea value={newAnswer} onChangeText={setNewAnswer}/>
                    </div>
                    <ModalButtonsWrap closeModal={closeModal}>
                        <SuperButton onClick={onClickUpdateCardHandler}>Save</SuperButton>
                    </ModalButtonsWrap>
                </Modal>
            }
        </div>
    );
};
