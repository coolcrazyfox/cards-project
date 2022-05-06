import React from 'react';
import style from './Modal.module.css';

type PropsType = {
    title?: string
    show: boolean
    closeModal: () => void
    children: React.ReactNode
}

const Modal = (props: PropsType) => {

    if (!props.show) return null;

    return (
        <div className={style.modal}>
            <div className={style.overlay} onClick={props.closeModal}/>
            <div className={style.dialog}>
                {props.title && <h3>{props.title}</h3>}
                <div className={style.content}>{props.children}</div>
                <button className={style.close} onClick={props.closeModal}>x</button>
            </div>
        </div>
    );
};

export default Modal;

