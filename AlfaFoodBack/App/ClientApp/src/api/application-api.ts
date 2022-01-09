import {instance} from "./api";

export const applicationAPI = {
    getApplication(id: string) {
      return instance.get(`/application/${id}`).then(res => res.data)
    },
    confirmApplication(data: any, tables: any[], id: string) {
        return instance.post(`/application/confirm/${id}?${tables.map(({name, id}, index) => `${name}=${id}`).join('&')}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => res.data)
    },
}