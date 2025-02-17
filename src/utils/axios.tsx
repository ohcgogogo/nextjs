import axios from 'axios'
import {CookieValueTypes} from "cookies-next";

// Create axios instance.
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
})

export const setAxiosHeaderAccessToken = (accessToken: string | undefined | CookieValueTypes | null) => {
    if (accessToken === "") {
        delete axiosInstance.defaults.headers.common["Authorization"];
    } else {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
}

export default axiosInstance