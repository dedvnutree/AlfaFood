import { restaurantAPI } from "../../api/restaurant-api";
import {BaseThunkType, InferActionsType} from "../store";
import {Dispatch} from "redux";

import history from "./history";

type EstablishmentItemType = {
    title: string,
    id: string
}


export type EstablishmentType = {
    common: {
        name: string,
        description: string,
        address: string,
        email: string,
        businessId: string,
        daysWork: [string, string][]
    }
}

let initialState = {
    establishmentsList: [],
    // currentEstablishment: null as EstablishmentType | null
    currentEstablishment: {}
}


export const actions = {

    setCurrentRestaurant: (establishment: EstablishmentType | null) => ({
        type: "Restaurant/SET_CURRENT_RESTAURANT",
        payload: establishment
    } as const),
    setEstablishmentsList: (establishments: EstablishmentItemType[] | null)  => ({
        type: "Restaurant/SET_ESTABLISHMENTS_LIST",
        payload: establishments
    } as const)
}



export const getEstablishment = (establishmentId: string): ThunkType => async (dispatch: Dispatch) => {
    // try {
    let data = await restaurantAPI.getRestaurant(establishmentId)
    dispatch(actions.setCurrentRestaurant(data))
    // } catch(e) {
    //     console.log('error is: ', e)
    // }
}

export const getBookingsRestaurantData = (): ThunkType => async (dispatch: Dispatch, getState) => {
    //@ts-ignore
    const establishmentId = getState().restaurants.currentEstablishment.id
    const data = await restaurantAPI.getRestaurantBookingsData(establishmentId)
    console.log('data from bookings::: ', data)
}


export const deleteEstablishment = (establishmentId: string): ThunkType => async (dispatch: Dispatch) => {
    await restaurantAPI.deleteRestaurant(establishmentId)
}

export const getEstablishmets = (ownerId: string): ThunkType => async (dispatch: Dispatch) => {

    let data = await restaurantAPI.getOwnerRestaurants(ownerId)
    dispatch(actions.setEstablishmentsList(data))
}

export const addEstablishment = (data : any, image: any): ThunkType => async (dispatch) => {
    try {
        let id =  await restaurantAPI.addRestaurant(data)
        let byid = restaurantAPI.addRestaurantImage(id, image)
        console.log('good add establ...')
    } catch(e) {
        console.log('error when add est is: ', e)
    }

}




const restaurantReducer = ( state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Restaurant/SET_ESTABLISHMENTS_LIST":
            return {
                ...state,
                //@ts-ignore
                establishmentsList: action.payload
            }
        case "Restaurant/SET_CURRENT_RESTAURANT":
            return {
                ...state,
                //@ts-ignore
                currentEstablishment: action.payload
            }
        default:
            return state
    }
}

export default restaurantReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>