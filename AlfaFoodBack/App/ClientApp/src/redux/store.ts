import { Action, applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from "redux-form"


import { AuthReducer, RestaurantReducer, ApplicationReducer } from "./reducers";



let rootReducer = combineReducers({
    //@ts-ignore
    auth: AuthReducer,
    applications: ApplicationReducer,
    restaurants: RestaurantReducer,
    form: formReducer
})


type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsType<T> = T extends { [keys : string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


const persistedState = localStorage.getItem('reduxState')
    //@ts-ignore
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}


const store = createStore(rootReducer,
    persistedState,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
)

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})


export default store