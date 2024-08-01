
import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getMeetByPage = async (page=0, size=10, sort="date", type="ASC") =>{
    
        const resp = await axios.get(`${baseURL}/meet/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {
            headers: getAuthHeader(),
        });
        const data = await resp.data;
        return data;   
};
export const getMeetsBByStudent = async () =>{
    
    const resp = await axios.get(`${baseURL}/meet/getAllMeetByStudent`,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;   
};
export const deleteMeet = async (id) => { 
    const resp = await axios.delete(`${baseURL}/meet/delete/${id}`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const createMeet = async (payload) => { 
    const resp = await axios.post(`${baseURL}/meet/save`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const updateMeet = async ( payload) => { 
    const resp = await axios.put(`${baseURL}/meet/update/${payload.id}`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }