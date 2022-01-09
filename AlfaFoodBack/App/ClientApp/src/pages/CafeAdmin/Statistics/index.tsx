import React, {useEffect} from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";

import EstablishmentsList from "../Establishments/components/EstablishmentsList";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {getEstablishmets} from "../../../redux/reducers/restaurantReducer";

import "./index.scss"


const fakeStatistics = {
    val: '12213'
}

const Statistics = () => {
    const dispatch = useDispatch()

    const establishments = useSelector((state: AppStateType) => state.restaurants.establishmentsList)
    const ownerId = useSelector((state: AppStateType) => state.auth.loggedInUser.id)
    useDocumentTitle("Страница статистики")

    useEffect(() => {
        if (!establishments) {
            dispatch(getEstablishmets(ownerId))
        }
    }, [])

    return (
        <div
            className="content"
        >
            <div
                className="cafeAdmin__content"
            >
                <div
                    className="cafeAdmin__container"
                >
                    <EstablishmentsList link={'/statistics/cafe'} establishments={establishments} />
                    <div>
                        Статистика по кнокретному кафе
                        <p>{fakeStatistics.val}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Statistics