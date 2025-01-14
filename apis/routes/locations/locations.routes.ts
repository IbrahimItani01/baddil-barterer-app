import { APIS_BASE_URL } from "@/apis/main"
import axios from "axios"

export const getAllLocations = async ()=>{
    const response = await axios.get(`${APIS_BASE_URL}/locations`)
    if (response.data.success){
        return response.data.data
    }
    else{
        return false;
    }
} 