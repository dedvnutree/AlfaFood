import { instance } from "./api";

import { EstablishmentType } from "../redux/reducers/restaurantReducer";

export const restaurantAPI = {

    addRestaurant(data : any) {
        return instance.post(`/restaurant/add`, {...data}).then(res => res.data)
    },

    addRestaurantImage(id: any, data: any) {
        return instance.post(`/restaurant/add/image/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => res.data)
    },

    getRestaurant(establishmentId: string) {
        return instance.get(`/restaurant/${establishmentId}`).then(res => res.data)
    },

    getOwnerRestaurants(ownerId: string) {
        return instance.get(`/restaurant/owner/${ownerId}`).then(res => res.data)
    },

    getRestaurantBookingsData(establishmentId: string) {
        return instance.get(`/booking/${establishmentId}`).then(res => res.data)
    },

    deleteRestaurant(restaurantId: string) {
        return instance.delete(`/restaurant/${restaurantId}`)
    }
}


