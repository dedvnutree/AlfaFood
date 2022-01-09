import React from "react"
import { NavLink } from "react-router-dom";


import "./index.scss"

const agreementSheet = [
    {title: "Пользовательское соглашение", link: "/"},
    {title: "Политика конфиденциальности", link: "/"},
    {title: "Согласие на обработку персональных данных", link: "/"},
]

const socials = [
    {title: "Vkontakte", link: "/"},
    {title: "Twitter", link: "/"},
    {title: "Facebook", link: "/"},
    {title: "TickTok", link: "/"},
]


const Footer = () => {
    return (
        <section
            className="footerSection__section"
        >
            <div className="content">
                <div className="footerSection">
                    <div className="footerSection__column">
                        <ul className="footerSection__column-list">
                            {agreementSheet.map((agr,index) => (
                                <li key={index} className="footerSection__column-item">
                                    <NavLink
                                        to={agr.link}
                                        style={{textDecoration: "none"}}
                                        className={"footerSection__column-link"}
                                    >
                                        {agr.title}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className="footerSection__column"
                    >
                        <ul className="footerSection__column-list">
                            {socials.map((agr,index) => (
                                <li key={index} className="footerSection__column-item">
                                    <NavLink
                                        to={agr.link}
                                        style={{textDecoration: "none"}}
                                        className={"footerSection__column-link"}
                                    >
                                        {agr.title}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className="footerSection__column"
                    >
                        <div
                            className="footerSection__apps-wrap"
                        >
                            <div
                                className="footerSection__apps-link"
                            >
                                <img src="https://static.tildacdn.com/tild6265-3562-4532-b532-333638303934/playmarket.svg" alt="google-playmarket"/>
                            </div>
                            <div
                                className="footerSection__apps-link"
                            >
                                <img src="https://static.tildacdn.com/tild6430-6330-4037-b763-383661623363/appstore.svg" alt="apple-playmarket" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}




export default Footer