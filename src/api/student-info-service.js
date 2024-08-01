
import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getStudentInfoByPageForTeacher = async (page=0, size=10, sort="lessonName", type="ASC") =>{
    
        const resp = await axios.get(`${baseURL}/studentInfo/getAllForTeacher?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {
            headers: getAuthHeader(),
        });
        const data = await resp.data;
        return data;   
};

export const getStudentInfoByPageForStudent = async (page=0, size=10, sort="lessonName", type="ASC") =>{
    
    const resp = await axios.get(`${baseURL}/studentInfo/getAllByStudent?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;   
};

export const deleteStudentInfo = async (id) => { 
    const resp = await axios.delete(`${baseURL}/studentInfo/delete/${id}`, 
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const createStudentInfo = async (payload) => { 
    const resp = await axios.post(`${baseURL}/studentInfo/save`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 export const updateStudentInfo = async ( payload) => { 
    const resp = await axios.put(`${baseURL}/studentInfo/update/${payload.id}`, payload,
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }