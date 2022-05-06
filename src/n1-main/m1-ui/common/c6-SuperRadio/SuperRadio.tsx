import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperRadio.module.css';

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        className,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const finalInputClassName = `${s.radioCheckbox} ${className ? className : ''}`

    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label className={s.label} key={name + '-' + i}>
            <input
                type={'radio'}
                onChange={onChangeCallback}
                value={o}
                name={name}
                checked={value === o}
                className={finalInputClassName}
                {...restProps}
                // name, checked, value, onChange
            />
            { o }
            <div className={s.labelRadioCheckBox}> </div>
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default SuperRadio
