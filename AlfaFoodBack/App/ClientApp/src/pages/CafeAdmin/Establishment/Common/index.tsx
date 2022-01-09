import React, { useEffect } from "react"
import {days as daysName} from "../../../../utils/diff";

import { ReactComponent as Trash} from "../../../../assets/svg/trash.svg";

import { deleteEstablishment } from "../../../../redux/reducers/restaurantReducer";

import "./index.scss"
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

interface ICommonInformationProps {
    common: {
        name: string,
        businessId: string,
        description: string,
        address: string,
        email: string,
        daysWork: [ string, string][] | null
    } | null
}

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

const ReadonlyFieldInput = ( props : IReadonlyFieldInputProps ) => {
    const { type, value, label } = props;
    return (
        <div className="commonInformation__form-field">
            <label
                htmlFor={label}
                className="commonInformation__label"
            >
                {label}
            </label>
            <input
                className="commonInformation__input"
                name={label}
                type="text"
                value={value}
                readOnly
                disabled
            />
        </div>

    )
}


const ReadonlyFieldTime = (props: IReaadonlyFieldTimeProps) => {
    const { value } = props;
    return (
        <div>
            <input
                className="pickerTime__input"
                type="text"
                value={value}
                disabled
            />
        </div>
    )
}


const ReadonlyFieldTextarea = (props: IReadonlyFieldTextareaProps) => {
    const { value, label } = props;
    return (
        <div
            className="commonInformation__form-field"
        >
            <label
                htmlFor={label}
                className="commonInformation__label"
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




const CommonInformation: React.FC<any> = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    //@ts-ignore
    const { common } = props


    const { workingTime, address, description, name, email, businessId, id } = common;

    let daysWork = workingTime ? JSON.parse(workingTime) : []

    const deleteEstablishmentHandler = () => {
        dispatch(deleteEstablishment(id))
        history.push('/establishments')
        console.log(id)
    }

    return (
        <div
            className="commonInformation__wrapper"
        >
            <div
                className="commonInformation__delete-btn"
                onClick={deleteEstablishmentHandler}
            >
                <Trash />
                <span>Удалить ресторан</span></div>
            <div
                className="commonInformation__main-data"
            >
                <h3 className="commonInformation__small-title">Основные данные</h3>
                <div
                    className="commonInformation__inputs"
                >
                    <ReadonlyFieldInput
                        value={name}
                        label="Название"
                        type="text"
                    />
                    <ReadonlyFieldInput
                        value={businessId}
                        label="БизнесИД"
                        type="text"
                    />
                    <ReadonlyFieldInput
                        value={email}
                        label="Email"
                        type="text"
                    />
                    <ReadonlyFieldInput
                        value={address}
                        label="Адресс"
                        type="text"
                    />
                    <ReadonlyFieldTextarea
                        value={description}
                        label="Описание"
                        type="text"
                    />

                </div>
            </div>


            <div
                className="commonInformation__pickerTime"
            >
                <h3
                    className="commonInformation__small-title"
                >Время работы</h3>
                <div
                    className="pickerTime__wrapper"
                >
                    {
                        daysWork && daysWork.map((day: [string, string], i: number) => (
                            <div
                                className="pickerTime__date"
                            >
                            <span
                                className="pickerTime__day"
                            >{daysName[i]}</span>
                                <ReadonlyFieldTime value={day[0]} />
                                <ReadonlyFieldTime value={day[1]} />
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}


export default CommonInformation