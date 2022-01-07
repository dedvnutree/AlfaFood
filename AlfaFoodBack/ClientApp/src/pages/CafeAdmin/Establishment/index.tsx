import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import {Switch, Route, NavLink} from "react-router-dom";


import {AppStateType} from "../../../redux/store";
import { getEstablishment } from "../../../redux/reducers/restaurantReducer";
import CommonInformation from "./Common";
import Bookings from "./Bookings";

import "./index.scss"

// interface MatchParams {
//     id: string;
// }


interface IEstablishmentProps {
    id: string;
}


const Establishment = ({ id }: IEstablishmentProps) => {

    const dispatch = useDispatch()
    const currentEstablishment = useSelector((state: AppStateType) => state.restaurants.currentEstablishment)
    //
    //
    useEffect(() => {
        dispatch(getEstablishment(id))
    }, [id])


    return (
        <div
            className="establishment__wrapper"
        >
            <div className="establishment__links">
                <NavLink
                    to={`/establishment/${id}/common`}
                    style={{textDecoration: "none"}}
                    className="establishment__link"
                    activeClassName="establishment__link-active"
                >Общая информация</NavLink>
                <NavLink
                    to={`/establishment/${id}/bookings`}
                    style={{textDecoration: "none"}}
                    className="establishment__link"
                    activeClassName="establishment__link-active"
                >Бронирования и предзаказы</NavLink>
            </div>

            <div
                className="establishment__content"
            >
                <Switch>

                    <Route path={"/establishment/:id/common"} render={
                        () => {
                            return (
                                <CommonInformation common={currentEstablishment} />
                            )
                        }
                    } />

                    <Route path={"/establishment/:id/bookings"} component={Bookings} />
                </Switch>
            </div>

        </div>
    )
}

//@ts-ignore
export default Establishment