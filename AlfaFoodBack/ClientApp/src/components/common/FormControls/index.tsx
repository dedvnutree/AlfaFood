import React from "react"
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from "redux-form";
import {FieldValidatorType} from "../../../utils/validators";

type CommonFormControlType = {
    meta: WrappedFieldMetaProps
}

const CommonFormControl: React.FC<CommonFormControlType> = ({ meta: { touched, error }, children }) => {

    return (
        <div className="form-control">
            <div>
                {children}
            </div>
            {touched && error && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return (
        <CommonFormControl {...props} >
            <textarea {...input } {...restProps } />
        </CommonFormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return (
        <CommonFormControl {...props }>
            <input  {...input} {...restProps} />
        </CommonFormControl>
    )
}

export function createField<FT extends string>(placeholder: string | undefined,
                            name: FT,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = "",
                        ) {
    return (
        <div>
            <Field
                placeholder={placeholder}
                validate={validators}
                component={component}
                {...props}
            />
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>