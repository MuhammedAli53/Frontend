import React from 'react'
import { getFromLocalStorage } from '../helpers/functions/encrypted-storage'

export const getAuthHeader = () => {
 const token = getFromLocalStorage("token");

 let header ={};
 if(token){
    header = {
        Authorization: token
    }
 }
 return header;
}

