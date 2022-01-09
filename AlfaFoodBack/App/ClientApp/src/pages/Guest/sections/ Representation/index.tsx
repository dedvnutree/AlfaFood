import React from "react"
import { Link } from "react-router-dom";


import alfaMobileGif from "../../../../assets/gifs/alfa-mobile.gif"



import "./index.scss"



const RepresentationSection = () => {
    return (
        <div
            className="representationSection__wrapper"
        >
            <div
                className="representationSection__text-part"
            >
                <h3
                    className="representationSection__title"
                >
                    Сервис бронирования столов<br /> и бесплатная книга резервов
                </h3>
                <p
                    className="representationSection__descr"
                >
                    Онлайн приём броней, депозиты, статистика, база гостей, банкеты.<br /> Настраивается за 15 минут, работает в облаке.<br /> Стоит от 0 руб. в месяц
                </p>
                <Link
                    to="/register"
                    rel="noopener"
                    target="_blank"
                >
                    <button
                        className="representationSection__btn"
                    >
                        НАЧАТЬ БЕСПЛАТНО
                    </button>
                </Link>


                <div
                    className="representationSection__apps"
                >
                    <h4
                        className="representationSection__apps-title"
                    >Приложение для физ.лиц:</h4>
                    <div
                        className="representationSection__apps-wrap"
                    >
                        <div
                            className="representationSection__apps-link"
                        >
                            <img src="https://static.tildacdn.com/tild6265-3562-4532-b532-333638303934/playmarket.svg" alt="google-playmarket"/>
                        </div>
                        <div
                            className="representationSection__apps-link"
                        >
                            <img src="https://static.tildacdn.com/tild6430-6330-4037-b763-383661623363/appstore.svg" alt="apple-playmarket" />
                        </div>
                    </div>

                </div>
            </div>
            <div
                className="representationSection__imgs"
            >
                <img
                    src={alfaMobileGif}
                    alt="alfa-mobile-gif"
                    height={"602px"}
                    width={"350px"}
                />
            </div>
        </div>
    )
}

export default RepresentationSection