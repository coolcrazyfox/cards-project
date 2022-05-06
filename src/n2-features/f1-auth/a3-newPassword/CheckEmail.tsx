import React from 'react';
import style from '../../../n1-main/m1-ui/styles/Login.module.css';
import imgM from "../a3-password/mail.png";
/*const images = [
    { url: `${imgM}` },
];*/
export const CheckEmail = () => {
    const imageIco = {
        backgroundImage: `url(${imgM})`,
    }
    return (
        <div className={style.mainContainer}>
            <div className={style.container_log} >
                <div className={style.title} >
                    <h1>IT-incubator</h1>
                </div>

                <div>
                    <form >
                        <div className={style.img} style={imageIco}> </div>
                        <div className={style.subtitle}>
                            <h2> Check Email</h2>
                        </div>
                        <h4 style={{color:'black', marginTop:'20px', textAlign:'center'}}>Enter your email address and we will send you further instructions</h4>

                    </form>
                </div>
            </div>
        </div>
    );
};

