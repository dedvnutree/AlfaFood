import {BaseThunkType, InferActionsType} from "../store";
// import { Action } from "redux";
import { authAPI } from "../../api/auth-api";
import { SubmissionError } from 'redux-form'

type LoggedInUserType = {
    role?: string,
}

let initialState = {
    login: null as (string | null),
    email: null as (string | null),
    loggedInUser: { role: "none"} as LoggedInUserType
}


export const actions = {
    setAuthUserData: (loggedInUser: {} | null)  => ({
      type: "Auth/SET_USER_DATA",
      payload: { loggedInUser }
    } as const),
    logOut: () => ({
        type: "LOG_OUT"
    } as const)
}


export const getCurrentUser = (): ThunkType => async (dispatch) => {
    try {
        let loggedInUser = await authAPI.currentUser()
        dispatch(actions.setAuthUserData(loggedInUser))
    } catch {
        console.log('error')
    }
}

export const login = (email: string, password: string): ThunkType => async (dispatch) => {

    let data = await authAPI.login(email,password)
    console.log('LOGIN DATA: ', data)
    if (data) {
        dispatch(actions.setAuthUserData(data))
    }
        // history.go('/')
}

export const logout = (): ThunkType => async (dispatch) => {
    let resp = await authAPI.logout()
    console.log('logout resp ::: ', resp)
    if (resp.status == 200) {
        dispatch(actions.logOut())
    }
}



export const register = (email: string, password: string, phone: string, username: string): ThunkType => async (dispatch) => {
    try {
        let loggedInUser = await authAPI.register(email,password,phone,username)
        if (loggedInUser) {
            dispatch(actions.setAuthUserData(loggedInUser))
        }
    } catch {
        console.log('error in register')
    }
}




const authReducer = ( state = initialState, action: ActionsType) :any => {
    switch (action.type) {
        case 'Auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'LOG_OUT':
            return {
                ...state,
                ...initialState
            }
        default:
            return state
    }
}





export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>