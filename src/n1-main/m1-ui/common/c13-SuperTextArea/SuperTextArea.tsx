import React, {DetailedHTMLProps, KeyboardEvent, TextareaHTMLAttributes} from 'react';
import styles from './SuperTextArea.module.css';

type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type SuperTextareaTextPropsType = DefaultTextareaPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

const SuperTextArea: React.FC<SuperTextareaTextPropsType> = (
    {
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
    const onChangeCallback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalAreaClassName = `${styles.superTextArea} ${error && styles.errorTextArea} ${className}`

    return (
        <>
            <div className={styles.inputContainer}>
                <textarea
                    maxLength={500}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalAreaClassName}

                    {...restProps}
                />
            </div>
        </>
    )
};

export default SuperTextArea;
