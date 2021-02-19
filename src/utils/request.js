import axios from "axios"
import { message } from 'antd'
import { getUsername,getToken } from "./cookies";


const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  config.headers["Token"] = getToken();
  config.headers["Username"] = getUsername();
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  if(response.data.resCode !== 0){
    message.error(response.data.message)
    return Promise.reject(response)
  }else{
    return  response
  }
  // 对响应数据做点什么
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service;