import React, {ChangeEvent, useState} from 'react';
import styles from './PageSizeSelector.module.css'
import SuperSelect from '../c5-SuperSelect/SuperSelect';

type PropsType = {
    pageCount: number
    handler: (value: number) => void
}
export const PageSizeSelector: React.FC<PropsType> = ({pageCount, handler}) => {

    const arr: number[] = [10, 15, 20, 50]

    const [value, setValue] = useState(pageCount)

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = +e.currentTarget.value
        setValue(value)
        handler(value)
    }

    return (
        <div className={styles.containerSelector}>
            <p>Show</p>
            <SuperSelect
                options={arr}
                value={value}
                onChange={onChangeHandler}
            />
            <p>Cards per Page</p>
        </div>
    );
};
