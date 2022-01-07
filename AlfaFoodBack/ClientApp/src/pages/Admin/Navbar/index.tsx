import React, {useEffect} from "react"
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom"
// import { withRouter } from "react-router";
import ControlLoginBtn from "../../../components/ControlLoginBtn";



import "./index.scss"


type Link = {
    title: string,
    to: string,
    active: string
}

const adminLinks: Link[] = [
    {
        title: "Заявки",
        to: "/applications",
        active: "application",
    },
    {
        title: "Чат",
        to: "/chat",
        active: "chat"
    },
    {
        title: "Статистика",
        to: "/statistics",
        active: "statistic"
    }
]



//@ts-ignore
const onPath = (path, location) => {
    return (location.pathname).includes(path)
}





const Navbar = ({location}: RouteComponentProps) => {

    useEffect(() => {
        console.log('props: ', location)
    })

    return (
        <header className="navbar__container" >
            <div className="navbar__wrapper" >
                <div
                    className="navbar__left"
                >
                    <div className="navbar__logoWrap" >
                        <NavLink
                            to="/"
                            style={{textDecoration: "none"}}
                        >
                            <span className="logo-black">ALFAFOOD</span>
                        </NavLink>

                    </div>
                    <div
                        className="navbar__links-wrapper"
                    >
                        <ul className="navbar__links">
                            {adminLinks.map((link, index) => (
                                <li
                                    key={index}
                                    className="navbar__link"
                                >
                                    <NavLink
                                        style={{ textDecoration: 'none' }}
                                        to={link.to}
                                        className="navbar__link-item"
                                        activeClassName="navbar__link-item--active"
                                        //@ts-ignore
                                        isActive={() => onPath(link.active, location)}
                                    >
                                        {link.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="navbar__control" >
                    <div >
                        <NavLink
                            to="/accountsettings"
                            style={{textDecoration: "none"}}
                            className="navbar__userName"
                            activeClassName="navbar__userName--active"
                        >
                            <span>
                                Админ
                            </span>
                        </NavLink>
                    </div>
                    <ControlLoginBtn />
                </div>
            </div>
        </header>
    )
}


export default  withRouter(Navbar)