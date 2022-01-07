import React, {useEffect} from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { NavLink, Switch, Route } from "react-router-dom"

import EstablishmentsList from "./components/EstablishmentsList";
import CommonEst from "./components/CommonEst";


import { useSelector, useDispatch } from "react-redux";



import Establishment from "../Establishment";
import AddEstablishment from "../AddEstablishment";

import { AppStateType } from "../../../redux/store";
import { getEstablishmets } from "../../../redux/reducers/restaurantReducer";

import { ReactComponent as HomePicture} from "../../../assets/svg/home-delivery.svg";


import './index.scss'




const Establishments = () => {
    const dispatch = useDispatch()
    const establishments = useSelector((state: AppStateType) => state.restaurants.establishmentsList)
    const ownerId = useSelector((state: AppStateType) => state.auth.loggedInUser.id)


    useDocumentTitle("Заведения")


    useEffect(() => {
        dispatch(getEstablishmets(ownerId))
    }, [])

    return (
        <div
            className="establishments__content"
        >
            <div className="establishments__container">
                <EstablishmentsList link={'/establishment'} establishments={establishments} />
                <div>
                    <Switch>
                        <Route path="/establishment/:id" render={({match}) =>
                            {
                                const {id} = match.params;
                                return <Establishment id={id} />
                            }}
                        />
                        <Route path="/addestablishment" component={AddEstablishment}/>
                        <Route path="*" component={CommonEst}/>
                    </Switch>
                </div>
            </div>

        </div>
    )
}


export default Establishments