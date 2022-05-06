import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from './SuperSelect.module.css';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption, className,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options ? options.map((o,i) =>
        <option key={i}> {o} </option>
    ) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
         onChange && onChange(e)
         onChangeOption && onChangeOption(e.currentTarget.value)
    }


    return (
        <div className={s.selectWrapper} >
            <select onChange={onChangeCallback} {...restProps}>
                {mappedOptions}
            </select>
            <div className={s.selectArrow}> </div>
        </div>

    )
}

export default SuperSelect
