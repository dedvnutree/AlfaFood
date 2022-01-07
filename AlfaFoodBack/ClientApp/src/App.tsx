import * as React from 'react';
import { Switch, withRouter} from 'react-router';
import {connect, Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import store, {AppStateType} from "./redux/store"

import { AuthLayout } from "./router/layouts";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import {compose} from "redux";

import history from "./redux/reducers/history"


type MapPropsType = ReturnType<typeof mapStateToProps>

const AppContainer: React.FC<MapPropsType> = ({loggedInUser}) => {

    return (
        <div className="wrapper1488">
            <div className='page-layout22'>
                <Switch>
                    <PublicRoute
                        loggedInUser={loggedInUser}
                        component={AuthLayout}
                    />
                   <PrivateRoute
                        loggedInUser={loggedInUser}
                    />
                </Switch>
            </div>
        </div>
    )
}



const mapStateToProps = (state: AppStateType) => ({
    loggedInUser: state.auth.loggedInUser
})


const ConnectedAppContainer = compose<React.FC>(withRouter,connect(mapStateToProps))(AppContainer)

const App = () => (
    <Provider store={store}>
        {/*@ts-ignore*/}
        <BrowserRouter>
           <ConnectedAppContainer />
        </BrowserRouter>
    </Provider>

);

export default App;
