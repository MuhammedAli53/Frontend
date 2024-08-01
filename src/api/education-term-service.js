
import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getEducationTermsByPage = async (page=0, size=10, sort="startDate", type="ASC") =>{
    
        const resp = await axios.get(`${baseURL}/educationTerms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {
            headers: getAuthHeader(),
        });
        const data = await resp.data;
        return data;   
};

export const createEducationTerms = async (payload) => { 
    const resp = await axios.post(`${baseURL}/educationTerms`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const deleteEducationTerms = async (id) => { 
    const resp = await axios.delete(`${baseURL}/educationTerms/${id}`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }

 export const getAllEducationTerms = async () => { 
    const resp = await axios.get(`${baseURL}/educationTerms/getAll`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
