import { instance } from "./api";


type CurrentUserDataType = {

}

type LoginResponseDataType = {

}

export const authAPI = {
    login(email: string, password: string, rememberMe?: boolean) {
        return instance.post(`/auth/jur`, {email, password}).then(res => res.data)
    },

    logout() {
        return instance.delete(`auth/jur`)
    },

    currentUser() {
        return instance.get(`auth/phys/me`).then(res => res.data)
    },

    register(email: string, password: string, phone: string, username: string) {
        return instance.post(`/Register/jur`, {email, password, phone, username}).then(res => res.data)
    }
}