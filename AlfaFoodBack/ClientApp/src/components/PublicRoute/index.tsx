import React, { useEffect } from "react"
import { Route} from "react-router-dom"
import PrivateRoute from "../PrivateRoute"

type PublicRouteType = {
    loggedInUser: any,
    component: React.ComponentType
}


const PublicRoute: React.FC<PublicRouteType> = ({loggedInUser, component: Component, ...rest}) => {

    useEffect(() =>
        console.log('loggedIn User geeeet   ', loggedInUser)
    )
    return(
    <Route render={() => (
        loggedInUser.role !=="none" ? <PrivateRoute loggedInUser={loggedInUser} /> : <Component {...rest} />
    )}
   />)
}



export default PublicRoute;