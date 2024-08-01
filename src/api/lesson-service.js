import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getLessonsByPage = async (page=0, size=10, sort="lessonName", type="ASC") =>{
    
        const resp = await axios.get(`${baseURL}/lessons/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {
            headers: getAuthHeader(),
        });
        const data = await resp.data;
        return data;   
};

export const createLesson = async (payload) => { 
    const resp = await axios.post(`${baseURL}/lessons/save`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const deleteLesson = async (id) => { 
    const resp = await axios.delete(`${baseURL}/lessons/delete/${id}`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }

 export const getAllLessons = async () => { 
    const resp = await axios.get(`${baseURL}/lessons/getAll`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }