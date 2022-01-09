import { useEffect } from "react"

const useDocumentTitle = (title: any) => {
    useEffect(() => {
        title && (document.title = typeof title === "function" ? title() : title)
    }, [title])
}

export default useDocumentTitle;