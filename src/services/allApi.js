import base_url from "./base_url";
import commonApi from "./commonApi";

export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/reg`,'POST',"",data)
}
export const loginApi=async(data)=>{
    return await commonApi(`${base_url}/log`,'POST',"",data)
}
export const addStudentApi=async(data,header)=>{
    return await commonApi(`${base_url}/addstudents`,'POST',header,data)
}
export const getStudentApi=async(header,search)=>{
    return await commonApi(`${base_url}/getstudents?search=${search}`,'GET',header,"")
}
export const deleteStudentApi=async(id,header)=>{
    return await commonApi(`${base_url}/deletestudents/${id}`,"DELETE",header,{})
}
export const updateStudentApi=async(id,data,header)=>{
    return await commonApi(`${base_url}/updatestudents/${id}`,"PUT",header,data)
}