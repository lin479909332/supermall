import axios from 'axios'

//方法4 利用内置的promise
export function request(config) {
  //1、创建实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000/api/hy',
    //baseURL:'http://106.54.54.237:8000/api/hy',
    timeout:5000
  })
  //2、拦截器
  //2.1、请求拦截
  instance.interceptors.request.use(config=>{
    return config
  },error => {
    console.log(err);
  })
  //2.2、响应拦截
  instance.interceptors.response.use(res=>{
    //console.log(res);
    //作用：取出结果的data并且返回
    return res.data
  },error => {
    console.log(err);
  })
  //3、发送请求，把配置传入到请求后针对成功和失败的函数进行返回
  return instance(config)
}
