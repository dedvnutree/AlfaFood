import axios from 'axios'
import { Cookies } from "react-cookie";


let access_token = (new Cookies).get('token')

let headers = {} as any

if (access_token) {
    headers['Authorization'] = `token ${access_token}`
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.99.1:80',
    headers: headers
})

