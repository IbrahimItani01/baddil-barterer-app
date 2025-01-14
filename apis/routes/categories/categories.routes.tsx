import { APIS_BASE_URL } from "@/apis/main"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

export const fetchCategories = async ()=>{
   const token = await AsyncStorage.getItem('jwtToken')
   const response = await axios.get(`${APIS_BASE_URL}/management/category`,{
      headers:{
         Authorization: `Bearer ${token}`
      }
   });
   if (response.data.success){
    return response.data.data;
   }
   else{
    return false;
   }
}