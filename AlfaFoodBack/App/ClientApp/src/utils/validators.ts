import * as errors from "./errors"

export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined
    return errors.EMPTY_ERR
}

export const fileRequired: FieldValidatorType = (value) => {
    if (value) return undefined
    return errors.EMPTY_FILE
}


export const maxLengthCreator = (maxLength: number): FieldValidatorType  => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return
}


export const timeHoursAndMinutes = (val: string) => {
    let h1 = val[0], h2 = val[1], m1 = val[3], m2 = val[4]
    if (h1 === "_" || h2 === "_" || m1 === "_" || m2 === "_") return errors.INVALID_SYMBOLS_ERR
    if (Number(h1) > 2 || Number(m1) > 5 || (Number(h2) > 3 && Number(h1) === 2)) return errors.INVALID_VALUE_ERR
    return
}
export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
        return errors.INVALID_EMAIL
    }
    return
}

export const validatePhone = (phone: string) => {
    const re = /^((\+7|7|8)+([0-9]){10})$/;
    if (!re.test(String(phone).toLowerCase())) {
        return errors.INVALID_PHONE
    }
    return
}