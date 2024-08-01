
import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getTeachersByPage = async (page=0, size=10, sort="name", type="ASC") =>{
    
        const resp = await axios.get(`${baseURL}/teachers/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {
            headers: getAuthHeader(),
        });
        const data = await resp.data;
        return data;   
};

export const createTeacher = async (payload) => { 
    const resp = await axios.post(`${baseURL}/teachers/save`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const deleteTeacher = async (id) => { 
    const resp = await axios.delete(`${baseURL}/teachers/delete/${id}`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const updateTeacher = async (id, payload) => { 
    const resp = await axios.put(`${baseURL}/teachers/update/${id}`, payload, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const getAllTeachers = async () => { 
    const resp = await axios.get(`${baseURL}/teachers/getAll`,  
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const chooseLesson = async (payload) => { 
    const resp = await axios.post(`${baseURL}/teachers/chooseLesson`,payload,  
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const getTeacherById = async (id) => { 
    const resp = await axios.get(`${baseURL}/teachers/getSavedTeacherById/${id}`,  
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }