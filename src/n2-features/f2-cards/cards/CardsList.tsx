import React, {useEffect, useState} from 'react';
import {Header} from '../../../n1-main/m1-ui/heder/Header';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesRoot';
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {
    addCardTC,
    changeCurrentPageCardsAC,
    fetchCardsTC,
    setPageCountAC
} from '../../../n1-main/m2-bll/b1-reducers/cardReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {CardType} from '../../../n1-main/m3-dal/m1-API/cardsAPI';
import {CardsTable} from './cardsTable/CardsTable';
import {CardsSearch} from '../../../n1-main/m1-ui/common/c10-Search/CardsSearch';
import style from '../../../n1-main/m1-ui/styles/CardsPage.module.css';
import SuperTextArea from '../../../n1-main/m1-ui/common/c13-SuperTextArea/SuperTextArea';
import ModalButtonsWrap from '../../../n1-main/m1-ui/modal/ModalButtonsWrap';
import Modal from '../../../n1-main/m1-ui/modal/Modal';
import {Pagination} from '../../../n1-main/m1-ui/common/c12-Pagination/Pagination';
import {PageSizeSelector} from '../../../n1-main/m1-ui/common/c11-PageSizeSelector/PageSizeSelector';

export const CardsList = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const cards = useSelector<AppStoreType, CardType []>(state => state.cards.cards)
    const packsUserId = useSelector<AppStoreType, string>(state => state.cards.packUserId)
    const myUserId = useSelector<AppStoreType, string | undefined>(state => state.login.user?._id)
    const cardQuestion = useSelector<AppStoreType, string>(state => state.cards.cardQuestion)
    const cardAnswer = useSelector<AppStoreType, string>(state => state.cards.cardAnswer)
    const cardsSort = useSelector<AppStoreType, string>(state => state.cards.sortCards)
    const cardsTotalCount = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount)
    const pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount)
    const page = useSelector<AppStoreType, number>(state => state.cards.page)

    const {packId} = useParams<{ packId: string }>()

    const [isModalAdd, setIsModalAdd] = useState<boolean>(false)
    const showModal = () => setIsModalAdd(true);
    const closeModal = () => setIsModalAdd(false);

    const [newCardQuestion, setNewCardQuestion] = useState<string>('');
    const [newCardAnswer, setNewCardAnswer] = useState<string>('');


    useEffect(() => {
        if (packId) {
            dispatch(fetchCardsTC(packId))
        }
    }, [dispatch, packId, cardQuestion, cardAnswer, cardsSort, pageCount, page])


    const onClickAddNewPackHandler = () => {
        if (packId) {
            dispatch(addCardTC(packId, newCardQuestion, newCardAnswer))
            setNewCardQuestion('')
            setNewCardAnswer('')
            closeModal()
        }
    }

    const onChangedPageHandler = (newPage: number) => {
        if (newPage !== page) dispatch(changeCurrentPageCardsAC(newPage))
    }

    const pageSizeHandler = (value: number) => {
        dispatch(setPageCountAC(value))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <Header/>
            <div className={style.mainContainer}>
                <div className={style.container_log}>
                    <div className={style.blockAvatar}>
                        <div className={style.btnContainer}>
                            <NavLink to={PATH.PACKS}><SuperButton className={style.btn}>Back</SuperButton></NavLink>
                        </div>
                    </div>
                    <div className={style.packsBlock}>
                        <h1 className={style.titleCardsBlock}> Cards</h1>
                        <div className={style.searchAddBlock}>
                            <CardsSearch/>
                            {myUserId === packsUserId && <SuperButton onClick={showModal}>Add new card</SuperButton>}

                        </div>
                        <div className={style.mainTable}>
                            <CardsTable cards={cards}/>
                            <div className={style.paginationWrapper}>
                                {
                                    cardsTotalCount < pageCount
                                        ? <></>
                                        : <>
                                            <Pagination totalCount={cardsTotalCount}
                                                        pageSize={pageCount}
                                                        currentPage={page}
                                                        onChangedPage={onChangedPageHandler}
                                            />
                                            <PageSizeSelector pageCount={pageCount}
                                                              handler={pageSizeHandler}
                                            />
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title={'Card Info'} show={isModalAdd} closeModal={closeModal}>
                <div className={style.textArea}>
                    <label>Question</label>
                    <SuperTextArea value={newCardQuestion} onChangeText={setNewCardQuestion}/>
                </div>
                <div className={style.textArea}>
                    <label>Answer</label>
                    <SuperTextArea value={newCardAnswer} onChangeText={setNewCardAnswer}/>
                </div>
                <ModalButtonsWrap closeModal={closeModal}>
                    <SuperButton onClick={onClickAddNewPackHandler}>Save</SuperButton>
                </ModalButtonsWrap>
            </Modal>
        </div>

    );
};

