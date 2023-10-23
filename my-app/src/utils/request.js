import axios from 'axios'

const http =axios.create({
    baseURL:'/api',
    timeout:10000,

});

//请求拦截器
http.interceptors.request.use(function (config){
    return config;
},function (error){
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(function (response){
    return response;
},function (error){
    return Promise.reject(error);
});

export default http;