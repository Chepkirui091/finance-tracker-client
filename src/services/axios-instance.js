import axios from "axios";
import {toast} from "react-toastify";
import {AUTH_REFRESH_TOKEN_KEY, AUTH_TOKEN_KEY} from "@/utils/constants";



export const axiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});


axiosInstance.interceptors.request.use(async (request) => {
    let token = globalThis?.localStorage.getItem(AUTH_TOKEN_KEY) ?? null;
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});
axiosInstance.interceptors.response.use(async (response) => {
    return response;
},  (error) => {
    if (error.response.status === 401){
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
        window.location.href = '/';
    }
    if (error.response?.data?.message){
        toast.error(error.response?.data?.message);
    }
    return Promise.reject(error)
});


export const backendAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

backendAxiosInstance.interceptors.request.use(async (request) => {
    //console.log(request);
    return request;
});
backendAxiosInstance.interceptors.response.use(async (response) => {
    return response;
},  (error) => {
    //console.log(error)
    // if (error.response?.data?.message){
    //     toast.error(error.response?.data?.message);
    // }
    return Promise.reject(error)
});
