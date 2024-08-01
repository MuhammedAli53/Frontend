import axios from "axios"
import { getAuthHeader } from "./auth-header";
import { config } from "../helpers/config";

const baseURL = config.api.baseUrl;

export const login = async (payload) => {
    const resp = await axios.post(`${baseURL}/auth/login`, payload)
    const data = await resp.data;
    return data;
}

export const getUser = async () => {
    const resp = await axios.get(`${baseURL}/user/me`,
    {headers: getAuthHeader(),})
    const data = await resp.data;
    return data;
}