import React from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const Chat = () => {

    useDocumentTitle("Чат")
    return (
        <div>
            <div className="content">
                Здесь будет чат наверно
            </div>

        </div>
    )
}

export default Chat