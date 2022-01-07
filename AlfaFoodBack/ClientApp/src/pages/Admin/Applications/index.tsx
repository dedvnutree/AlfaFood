import React, { useEffect } from "react"
import { Switch, Route, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppStateType } from "../../../redux/store";

import Application from "../Application";
import { connectToHub, disconnectHub } from "../../../redux/reducers/applicationsReducer";
import useDocumentTitle from "../../../hooks/useDocumentTitle";


import "./index.scss"






interface IApplicationItemProps {
    name: string,
    id: string
}

const ApplicationItem = ({name, id} : IApplicationItemProps) => {

    return (
        <NavLink
            className="application-item__link"
            activeClassName="application-item__link--active"
            to={`/applicn/${id}`}
            style={{textDecoration: "none"}}
        >
            <div
                className="application-item__wrapper"
            >
                <h3>{name}</h3>
            </div>
        </NavLink>
    )
}





const Applications = () => {

    const dispatch = useDispatch()

    const applicationsItems = useSelector((state: AppStateType) => state.applications.applicationsList)

    useDocumentTitle("Заявки")

    useEffect(() => {
        dispatch(connectToHub())
        return () => {
            console.log('disconnect')
            dispatch(disconnectHub())
        }
    }, [])


    return (
        <div
            className="applications__content"
        >
            <div
                className="applications__container"
            >
                <div
                    className="applications__list applications-list"
                >
                    <h1
                        className="applications-list__title"
                    >
                        Заявки
                    </h1>
                    <div>
                        {
                            Array.isArray(applicationsItems) && applicationsItems.map((app: any) => (
                                <ApplicationItem name={app.Item1} id={app.Item2}/>
                            ))
                        }
                    </div>

                </div>
                <div>
                    <Switch>
                        <Route path="/applicn/:id" render={({match}) =>
                        {
                            const {id} = match.params;
                            //@ts-ignore
                            return <Application id={id} />
                        }}
                        />
                    </Switch>

                </div>
            </div>
        </div>
    )
}


export default Applications