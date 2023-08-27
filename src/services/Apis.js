import {commonrequest} from "./ApiCall";
import {BASE_URL} from "./helper";

// frontend se backend ke liye request send karrhe hai
 export const registerfunc = async(data,header) =>{
   return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);
}

//user get
export const usergetfunc = async() =>{
  return await commonrequest("GET",`${BASE_URL}/user/details`);
}

//single user get
export const singleUsergetfunc = async(id) =>{
  return await commonrequest("GET",`${BASE_URL}/user/${id}`);
}

//update user
export const editfunc = async(id,data,header) =>{
  return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}

//delete user
export const deleteuser = async(id)=>{
  return await commonrequest("DELETE",`${BASE_URL}/user/${id}`);
}