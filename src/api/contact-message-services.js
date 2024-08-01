import axios from "axios"


export const createMessage = async (payload) => {
    const resp = await axios.post("https://mycampusmates.com/app/contactMessages/save", payload)
    const data = await resp.data;
    return data;
}