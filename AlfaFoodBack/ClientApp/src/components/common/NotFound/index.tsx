import React from "react"
import { Link } from "react-router-dom"
// import { RouteComponentProps } from "react-router-dom";
import "./index.scss"

import useDocumentTitle from "../../../hooks/useDocumentTitle";

import { ReactComponent as NotFound404 } from "../../../assets/svg/404.svg";



// interface INotFoundProps {
//     routeTo: string
// }

const NotFound = () => {

    useDocumentTitle("404")

    return (
        <div className="content">
            <div className="not-found__wrapper">
                <h1 className="not-found__title">
                    Что-то пошло не так
                </h1>
                <Link
                    style={{textDecoration: "none"}}
                    to={"/"}
                    className="not-found__link"
                >
                    На Главную
                </Link>
                <NotFound404 />

            </div>
        </div>

    )
}

export default NotFound