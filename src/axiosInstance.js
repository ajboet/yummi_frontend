import axios from 'axios'
import Cookies from 'js-cookie'

let token = localStorage.getItem('token')
let authentication = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

if(token != null){
  authentication['Authorization'] = `Bearer ${token}`
}

let cookie = Cookies.get('yummi_cart')
if (cookie) {
  authentication['Cookie'] = `yummi_cart=${cookie}`
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: authentication
});