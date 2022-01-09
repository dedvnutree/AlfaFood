import React, { useEffect } from "react"
import { useDispatch } from "react-redux";


import { getBookingsRestaurantData } from "../../../../redux/reducers/restaurantReducer";

import "./index.scss"



interface IBookingsProps  {

}


const defs = [
    { color: '#66afe9', name: 'Забронирован' },
    { color: '#66afe9', name: 'Свободен' },
]

const Bookings = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBookingsRestaurantData())
    }, [])

    return (
        <div
            className="establishmentBooking__wrapper"
        >
            <div
                className="establishmentBooking__image-zone"
            >

            </div>
            <div
                className="establishmentBooking__content"
            >
                <div className="establishmentBooking__designations">
                    <h3>Обозначения</h3>
                    {defs.map(({color, name}, index) => (
                        <div key={index} className="tableDesignations-item">
                            <div
                                className="tableDesignations-item__square"
                                //@ts-ignore
                                styles={{backgroundColor: color}}>

                            </div>
                            <span className="tableDesignations-item__name">{name}</span>
                        </div>
                        )
                    )}
                </div>

                <div>
                    {/*<h3>Список столов</h3>*/}

                </div>

            </div>
        </div>
    )
}

export default Bookings