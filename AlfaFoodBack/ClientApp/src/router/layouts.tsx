import React from "react"
import { Route, Switch, Redirect } from "react-router-dom";

import { authRoutes, adminRoutes, cafeAdminRoutes } from "./routes"

import CafeAdminNavbar from "../pages/CafeAdmin/Navbar"
import AdminNavbar from "../pages/Admin/Navbar"
import GuestNavbar from "../pages/Guest/sections/Navbar"



export const AuthLayout = () => {


   return (
       <>
            <Switch>
                {authRoutes.map((route, index) => (
                    <Route key={index} {...route}/>
                ))}
                <Redirect to="/guest" />
            </Switch>
        </>
   )
}



export const AdminLayout = () => {
    return(
    <>
        <AdminNavbar />
        <Switch>
            <Redirect
                exact
                from="/"
                to="/applications"
            />
            <Redirect
                exact
                from="/home"
                to="/applications"
            />
            {adminRoutes.map((route, index) => (
                //@ts-ignore
                <Route key={index} {...route}/>
            ))}
            <Redirect to="/404" />
        </Switch>
    </>
    )
            }

export const CafeAdminLayout = () => (
    <>
        <CafeAdminNavbar />
        <Switch>
            <Redirect
                exact
                from="/"
                to="/establishments"
            />
            <Redirect
                exact
                from="/establishment/:id"
                to="/establishment/:id/common"
            />
            {cafeAdminRoutes.map((route, index) => (
                //@ts-ignore
                <Route key={index} {...route}/>
            ))}
            <Redirect to="/404" />
        </Switch>
    </>
)
