import React, {useEffect} from "react"
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom"



import "./index.scss"





const Navbar = ({location}: RouteComponentProps) => {

    useEffect(() => {
        console.log('props: ', location)
    })

    return (
        <header className="guest-navbar__container" >
            <div className="guest-navbar__wrapper" >
                <div
                    className="guest-navbar__left"
                >
                    <div className="guest-navbar__logoWrap" >
                        <NavLink
                            to="/"
                            style={{textDecoration: "none"}}
                        >
                            <span className="logo">ALFAFOOD</span>
                        </NavLink>

                    </div>
                </div>

                <div className="guest-navbar__controls" >
                    <NavLink
                        rel="noopener"
                        target="_blank"
                        className="guest-navbar__auth-link"
                        activeClassName="guest-navbar__auth-link--active"
                        to="login"
                        style={{textDecoration: "none"}}
                    >
                        <span>ВОЙТИ</span>
                    </NavLink>
                    <NavLink
                        rel="noopener"
                        target="_blank"
                        className="guest-navbar__auth-link"
                        activeClassName="guest-navbar__auth-link--active"
                        to="register"
                        style={{textDecoration: "none"}}
                    >
                        <span>РЕГИСТРАЦИЯ</span>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}


export default  withRouter(Navbar)