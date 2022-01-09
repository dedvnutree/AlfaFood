import {BaseThunkType, InferActionsType} from "../store";
import {Dispatch} from "redux";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

import {applicationAPI} from "../../api/application-api";


type ApplicationItemType = {
    Item1: string,
    Item2: string,
}

type CurrentApplicationType = {
    name: string,
    address: string,
    businessId: string,
    city: string,
    description: string,
    email: string,
    id: string,
    ownerId?: number,
    imageMap: any,
    workingTime: string,
    published: boolean,
}

let initialState = {
    applicationsList: [],
    currentApplication: {} as CurrentApplicationType,
    hubConnection: null
}


export const actions = {
    setApplicationsList: (applications: ApplicationItemType[] | null) => ({
        type: "Applications/SET_APPLICATION_LIST",
        payload: applications as ApplicationItemType[]
    } as const),

    setCurrentApplication: (application: any) => ({
        type: "Applications/SET_CURRENT_APPLICATION",
        payload: application
    } as const),

    setCurrentHub: (hub: any) => ({
        type: "Applications/SET_CONNECTION",
        payload: hub
    } as const),
}



export const getApplication = (id: string): ThunkType => async (dispatch: Dispatch) => {
    let application = await applicationAPI.getApplication(id)
    console.log('current application::: ', application)
    dispatch(actions.setCurrentApplication(application))
}


export const confirmApplication = (data: any, tables: any[]): ThunkType => async (dispatch : Dispatch, getState) => {
    const id = getState().applications.currentApplication.id
    let res = await applicationAPI.confirmApplication(data, tables, id);
    // some redirect :]
}

export const connectToHub = (): ThunkType => async (dispatch: Dispatch, getState) => {
    let state = getState();

    console.log(state);

    if (state.applications.hubConnection != null) {
        console.log('Connection exists...');
        return;
    }

    const hubConnection = new HubConnectionBuilder()
        .withUrl('/applications', { transport: HttpTransportType.WebSockets})
        .configureLogging(LogLevel.Information)
        .build();

    dispatch(actions.setCurrentHub(hubConnection));

    hubConnection
        .start()
        .then(() => {
            console.log('Connection started!');
            hubConnection.invoke("ReceiveApplications");
        })
        .catch(err => console.log('Error while establishing connection :('));

    hubConnection.on("ReceiveApplications", (applications) => {
        // const text = `suprime ${message}`;
        dispatch(actions.setApplicationsList(JSON.parse(applications)))
    });

    //hubConnection.
}

export const disconnectHub = (): ThunkType => async (dispatch: Dispatch, getState) => {
    // const state = getState()
    // let hubConnection = state.applications.hubConnection
    // if (hubConnection) {
    //     // @ts-ignore
    //     // hubConnection.stop()
    // }
    dispatch(actions.setCurrentHub(null));
};


const applicationReducer = ( state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Applications/SET_APPLICATION_LIST":
            return {
                ...state,
                //@ts-ignore
                applicationsList: action.payload
            }
        case "Applications/SET_CONNECTION":
            return {
                ...state,
                hubConnection: action.payload
            }
        case "Applications/SET_CURRENT_APPLICATION":
            return {
                ...state,
                currentApplication: action.payload
            }
        default:
            return state
    }
}





export default applicationReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>