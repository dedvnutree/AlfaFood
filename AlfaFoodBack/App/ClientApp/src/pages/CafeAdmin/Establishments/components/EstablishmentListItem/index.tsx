import React from "react"
import {NavLink} from "react-router-dom";
import {ReactComponent as HomePicture} from "../../../../../assets/svg/home-delivery.svg";


interface IEstablishmentItemList {
    name: string,
    id: string,
    published: boolean,
    link: string
}


const EstablishmentItemList = ({name = "", id, published, link} : IEstablishmentItemList) => {
    return (
        <NavLink
            style={{textDecoration: "none"}}
            to={`${link}/${id}`}
            className="establishment-item__link"
            activeClassName="establishment-item__link--active"
        >
            <div
                className="establishment-item__wrapper"
            >
                <HomePicture />
                <div className="establishment-item__content">
                    <h3
                        className="establishment-item__name"
                    >
                        {name}
                    </h3>
                    <span
                        className={`establishment-item__status ${published ? 'establishment-item__status--confirmed' : 'establishment-item__status--pending'}`}
                    >{published ? 'Опубликован' : 'В ожидании'}</span>
                </div>

            </div>
        </NavLink>
    )
}

export default EstablishmentItemList;