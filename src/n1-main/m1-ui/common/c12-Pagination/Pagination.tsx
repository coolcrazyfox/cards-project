import React from 'react';
import styles from './Pagination.module.css';
import {useSelector} from 'react-redux';
import {AppStoreType} from '../../../m2-bll/store';

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onChangedPage: (n: number) => void
}
export const Pagination = ({totalCount, pageSize, currentPage, onChangedPage}: PropsType) => {
    const isLoading = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const pageCounts = totalCount ? Math.ceil(totalCount / pageSize) : 1;
    const pages = [];
    const step = pageCounts > 200 ? 50 : 10;
    /*const isStep = pageCounts > 4;*/

    const newActiveClass = `${isLoading ? `${styles.page}` : `${styles.pageActive}`}`

    let pageLimit = 4;
    let startPage = currentPage - pageLimit / 2;
    let endPage = currentPage + pageLimit / 2;

    if (startPage < 1) {
        startPage = 1;
        endPage = pageLimit + 1;
    }
    if (endPage > pageCounts) {
        endPage = pageCounts;
        startPage = pageCounts - pageLimit < 1 ? 1 : pageCounts - pageLimit;
    }
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const pageList = pages.map(n => {
        const onClickGetByPage = () => onChangedPage(n);
        //const onClickGetByPage = () => !isLoading && onChangedPage(n);

        return (
            <span key={n}
                  className={currentPage === n ? `${newActiveClass} ${styles.currentPage}` : `${newActiveClass} ${styles.page}`}
                  onClick={onClickGetByPage}>
                {n}
            </span>
        );
    })

    //Functions Buttons
    const firstPageHandler = () => onChangedPage(1);
    const lastPageHandler = () => onChangedPage(pageCounts);
    const upPageHandler = () => {
        (currentPage + step) > pageCounts
            ? onChangedPage(pageCounts)
            : onChangedPage(currentPage + step)
    };
    const downPageHandler = () => {
        (currentPage - step) < 0
            ? onChangedPage(1)
            : onChangedPage(currentPage - step)
    };

    const previous = () => {
        onChangedPage(currentPage - 1);
        /*dispatch(setIsLoggedInAC(false))*/

    }

    const next = () => {
        onChangedPage(currentPage + 1);
        /*dispatch(setIsLoggedInAC(false))*/
    }

    //COMPLETE JSX
    return (
        <div className={styles.pagesWrapper}>
            {currentPage > 1 ? <span className={newActiveClass} onClick={previous}>{'<'}</span> : <></>}
            {currentPage > 4 ? <span className={newActiveClass} onClick={firstPageHandler}>1</span> : <></>}
            {currentPage > 3 ? <span className={newActiveClass} onClick={downPageHandler}>{'...'}</span> : <></>}
            <div className={styles.pageList}>
                {pageList}
            </div>
            {currentPage < pageCounts - 3 ?
                <span className={newActiveClass} onClick={upPageHandler}>{'...'}</span> : <></>}
            {endPage === pageCounts ? <></> :
                <span className={newActiveClass} onClick={lastPageHandler}>{pageCounts}</span>}
            {(currentPage !== pageCounts) ? <span className={newActiveClass} onClick={next}>{'>'}</span> : <></>}
        </div>
    );
}