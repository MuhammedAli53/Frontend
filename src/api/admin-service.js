
import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getAdminsByPage = async (page=0, size=10, sort="name", type="ASC") =>{
    
        const resp = await axios.get(`${baseURL}/admin/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {
            headers: getAuthHeader(),
        });
        const data = await resp.data;
        return data;   
};

export const createAdmin = async (payload) => { 
    const resp = await axios.post(`${baseURL}/admin/save`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const deleteAdmin = async (id) => { 
    const resp = await axios.delete(`${baseURL}/admin/delete/${id}`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }