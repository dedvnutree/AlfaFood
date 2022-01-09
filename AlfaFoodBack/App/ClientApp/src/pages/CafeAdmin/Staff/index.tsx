import React from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";


const Staff = () => {

    useDocumentTitle("Страница сотрудников")

    return (
        <div
            className="content"
        >
            <div>Здесь выборка и настройка сотрудников</div>
        </div>
    )
}


export default Staff