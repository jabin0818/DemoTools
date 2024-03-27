import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from "@/utils/localstorage"
NProgress.configure({ showSpinner: false });

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const instance = axios.create({
  // 默认的配置
  baseURL: BASE_URL, // -> http://localhost:3000
  timeout: TIMEOUT, // -> 18000
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  withCredentials: true
})

instance.interceptors.request.use(
  // 请求拦截
  (config) => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
    NProgress.start(); // 启动滚动条
    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
    let token = getToken()
    if (token) {
      config.headers.token = token;
    }
    // 3.params/data序列化的操作
    return config
  },
  (err) => { }
)
instance.interceptors.response.use(
  // 响应拦截
  (res) => {
    NProgress.done()// 关闭滚动条
    return res.data
  },
  (err) => {
    NProgress.done()// 关闭滚动条
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log('请求错误')
          break
        case 401:
          console.log('未授权访问')
          break
        default:
          console.log('其他错误信息')
      }
    }
    return err
  }
)

export default instance
