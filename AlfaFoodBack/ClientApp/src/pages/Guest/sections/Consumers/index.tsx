import React from "react"



import notImage from "../../../../assets/images/not-available.png";

import "./index.scss"

const consumersList = [
    {name: "Рестораны", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1030&q=80"},
    {name: "Кафе", image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    {name: "Рестораны", image: ""},
    {name: "Рестораны", image: ""},
    {name: "Рестораны", image: ""},
    {name: "Рестораны", image: ""},
    {name: "Рестораны", image: ""},
]


const Consumers = () => {
    return (
        <div className="content">
            <div
                className="consumersSection__wrapper"
            >
                <h4
                    className="consumersSection__title"
                >Для кого наше приложение?</h4>
                <div
                    className="consumersSection__items"
                >
                    {
                        consumersList.map((consumer,index) => (
                            <div
                            key={index}
                                className="consumersSection__item"
                            >
                                <img
                                    src={consumer.image ? consumer.image : notImage}
                                    alt={consumer.name}
                                    height={"200px"}
                                    // width={"260px"}
                                    // className="consumerSection__item-image"
                                />

                                <div className="consumersSection__item-span-wrap">
                                    <div
                                        className="consumersSection__item-span"
                                    >{consumer.name}</div>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <div>
                    <p className="consumersSection__choose"><strong>1488+</strong>кафе и рестаранов выбрали <span className="consumersSection__choose-logo">ALFAFOOD</span></p>
                </div>
            </div>

        </div>
    )
}


export default Consumers