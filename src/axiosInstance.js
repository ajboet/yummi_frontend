import axios from "axios";

let token = localStorage.getItem('token')

let authentication = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

if(token != null){
  authentication['Authorization'] = `Bearer ${token}`
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: authentication
});