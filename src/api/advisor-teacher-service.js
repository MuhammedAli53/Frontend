
import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;


 export const getAllAdvisorTeachers = async () => { 
    const resp = await axios.get(`${baseURL}/advisorTeacher/getAll`,  
    {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
 }
 