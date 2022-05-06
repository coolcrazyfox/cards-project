import React, {ChangeEvent, useEffect, useState} from 'react';

export type ProfileStatusPropsType = {
    span: string | undefined
    updateSpan: (span: any) => void

}

export const EditableSpan: React.FC<ProfileStatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [span, setSpan] = useState(props.span)

    useEffect(() => {
        setSpan(props.span)
    }, [props.span])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        if (span != null) {
            props.updateSpan(span)
        }
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSpan(e.currentTarget.value)
    }

    return (
        <div >
            {!editMode &&
                <div  >
                        <span style={{width:'400px', height:'30px', fontSize:'12px'}}  onDoubleClick={activateEditMode}>
                            {props.span || 'none'}
                        </span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        autoFocus
                        onChange={onStatusChange}
                        onBlur={deactivateEditMode}
                        type="text"
                        value={span}/>
                </div>
            }
        </div>
    )
}
