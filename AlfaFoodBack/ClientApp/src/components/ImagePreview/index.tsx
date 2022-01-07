import React, {SyntheticEvent, useEffect, useState} from "react"



import "./index.scss"


const ImageUpload = (props: any) => {
    const [imagePreviewUrl, setImageData ] = useState('')

    useEffect(() => {
        console.log('new props in Image Upload --- ', props)
        if (props.image) {
            setImageData(URL.createObjectURL(props.image))
        }
    }, [props])

    let imgPreview = null
    if (imagePreviewUrl) {
        imgPreview = <img src={imagePreviewUrl} />
    } else {
        imgPreview = (<div className="imageUpload__emptyImg">Please select an Image for Preview</div>)
    }

    return (
        <div
            className="imageUpload__previewComponent"
        >
            <div className="imageUpload__imgPreview">
                {imgPreview}
            </div>
        </div>
    )
}


export default ImageUpload