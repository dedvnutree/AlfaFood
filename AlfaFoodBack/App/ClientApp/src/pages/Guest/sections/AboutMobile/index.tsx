import React from "react"


import alfaMobileGif from "../../../../assets/gifs/alfa-mobile.gif"
import iphoneTemplate from  "../../../../assets/images/iphonee.png"
//@ts-ignore
// import { ReactComponent as IphoneTemplate } from "../../../../assets/svg/iphone_template.svg"

import "./index.scss"

const features = [
    "Профиль с настройками аккаунта",
    "Поиск по ресторанам и кафе",
    "Рекомендации",
    "Возсожность добавлять рестораны в избранное",
    "Бронирование столика и предзаказ",
    "Раздельная оплата"
]

const AboutMobile = () => {
    return (
        <section className="aboutMobileSection__section">
            <div className="content">
                <h3 className="aboutMobileSection__title">Мобильное приложение для физ.лиц</h3>
                <div className="aboutMobileSection__content">
                    <ul className="aboutMobileSection__features">
                        {
                            features.map((feauture,index) => (
                                <li key={index}>
                                    <div
                                        key={feauture}
                                        className="aboutMobileSection__feature"
                                    >
                                        {feauture}
                                    </div>
                                </li>

                            ))
                        }
                    </ul>
                    <div className="aboutMobileSection__img-wrap" >
                        <img
                            src={alfaMobileGif}
                            alt="alfa-mobile-gif"
                            height={"525px"}
                            width={"250px"}
                        />


                    </div>
                </div>

            </div>
        </section>
    )
}


export default AboutMobile