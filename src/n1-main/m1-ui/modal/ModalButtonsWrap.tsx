import React from 'react';
import SuperButton from '../common/c2-SuperButton/SuperButton';
import styles from "./Modal.module.css";

type PropsType = {
    children: React.ReactNode
    closeModal: () => void
}

const ModalButtonsWrap = (props: PropsType) => {
    return (
        <div className={styles.modalButtons}>
            <SuperButton onClick={props.closeModal} light={true}>Cancel</SuperButton>
            {props.children}
        </div>
    );
};

export default ModalButtonsWrap;