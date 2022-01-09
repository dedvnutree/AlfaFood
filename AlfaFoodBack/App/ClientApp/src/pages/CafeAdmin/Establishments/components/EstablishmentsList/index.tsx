import React from "react"
import EstablishmentItemList from "../EstablishmentListItem";
import {NavLink} from "react-router-dom";


const AddEstablishmentBtn = () => {
    return (
        <NavLink
            style={{textDecoration: "none"}}
            to={"/addestablishment"}
        >
            <div
                className="add-establishment__wrapper"
            >
                <span>Добавить заведение</span>
            </div>
        </NavLink>
    )
}


const EstablishmentsList: React.FC<any> = ({establishments, link}) => {
    return (
        <div className="establishments__list establishments-list">
            <h1
                className="establishments-list__title"
            >Заведения</h1>
            {
                Array.isArray(establishments) && establishments.length && establishments.map((est: any) => (
                    <EstablishmentItemList link={link} id={est.id} name={est.name} published={est.published}/>
                ))
            }
            <div className="establishments-list__btn">
                <AddEstablishmentBtn />
            </div>

        </div>
    )
}


export default EstablishmentsList