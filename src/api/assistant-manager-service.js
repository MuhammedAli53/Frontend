
import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getAssistantManagersByPage = async (page=0, size=10, sort="name", type="ASC") =>{
    
        const resp = await axios.get(`${baseURL}/vicedean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {
            headers: getAuthHeader(),
        });
        const data = await resp.data;
        return data;   
};

export const createAssistantManager = async (payload) => { 
    const resp = await axios.post(`${baseURL}/vicedean/save`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const deleteAssistantManager = async (id) => { 
    const resp = await axios.delete(`${baseURL}/vicedean/delete/${id}`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const updateAssistantManager = async (id, payload) => { 
    const resp = await axios.put(`${baseURL}/vicedean/update/${id}`, payload, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }