import axios from 'axios'

// 引入进度条和进度条的样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";

//1.利用axios对象的方法create,去创建一个axios实例
// 配置一些request
const requests = axios.create({
    // 配置对象
    // 基础路径,发请求时默认路径当中会出现api
    // baseURL: "/api",
    //代表请求超时的时间
    timeout: 5000
})
//请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    nprogress.start();
    return config
}, (err) => {

})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，做一些事情
    // 进度条结束
    nprogress.done();
    return res.data
}, (err) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
})
//对外暴露
export default requests;