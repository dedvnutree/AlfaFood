import React from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";


const GuestBase = () => {

    useDocumentTitle("База гостей")

    return (
        <div
            className="content"
        >
            <div>А здесь база гостей</div>
        </div>
    )
}


export default GuestBase