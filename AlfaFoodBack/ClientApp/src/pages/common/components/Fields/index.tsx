import React from "react";

import "./index.scss"

interface IReadonlyFieldInputProps {
    type?: string,
    value: string
    label: string
}

interface IReadonlyFieldTextareaProps {
    label: string,
    type?: string,
    value: string
}

interface IReaadonlyFieldTimeProps {
    value: string
}



export const ReadonlyFieldTime = (props: IReaadonlyFieldTimeProps) => {
    const { value } = props;
    return (
        <div className="commonField-pickerTime__field">
            <input
                className="commonField-pickerTime__input"
                type="text"
                value={value}
                disabled
            />
        </div>
    )
}

export const ReadonlyFieldInput = ( props : IReadonlyFieldInputProps ) => {
    const { type, value, label } = props;
    return (
        <div className="commonField-input__field">
            <label
                htmlFor={label}
                className="commonField-input__label"
            >
                {label}
            </label>
            <input
                className="commonField-input__input"
                name={label}
                type="text"
                value={value}
                readOnly
                disabled
            />
        </div>

    )
}

export const ReadonlyFieldTextarea = (props: IReadonlyFieldTextareaProps) => {
    const { value, label } = props;
    return (
        <div
            className="commonField-textarea__field"
        >
            <label
                htmlFor={label}
                className="commonField-textarea__label"
            >
                {label}
            </label>
            <textarea
                cols={20}
                rows={6}
                value={value}
                disabled
            />
        </div>
    )
}