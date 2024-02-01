import axios, { AxiosError } from 'axios';
import { message } from 'ant-design-vue';
import { router } from '@/router/index';

/**
 * 处理异常状态码
 * @param {Number} status 请求失败的状态码 包含http status状态码+ http code业务码
 */
const handleErrorCode = (status: number | string | undefined, msg: string) => {
  // 状态码不存在情况
  if (!status) {
    message.error(msg || '用户名或密码错误!');
    return;
  }

  // 状态码判断
  switch (status) {
    case 202:
      message.error(msg || '用户名或密码错误!');
      break;
    case 100:
      localStorage.removeItem('token');
      sessionStorage.removeItem('loginUserInfo');
      message.error(msg || '登录信息过期');
      // 跳转登录页
      router.replace({
        path: '/',
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      });
      break;
    case '100':
      localStorage.removeItem('token');
      sessionStorage.removeItem('loginUserInfo');
      message.error(msg || '登录信息过期');
      // 跳转登录页
      router.replace({
        path: '/',
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      });
      break;
    case 401:
      message.error(msg || '登录信息过期');
      // 跳转登录页
      router.replace({
        path: '/',
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      });
      break;
    default:
      console.error(msg || '后台维护中，请稍后再试!');
  }
};

// 创建实例
const axiosInstance = axios.create({
  timeout: 10000, // 超时时间，单位毫秒
  baseURL: import.meta.env.VITE_BASE_URI, // api请求baseUrl
});

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 响应拦截器
 * 每次请求后，判断请求状态码是否正确，及数据做处理
 */
axiosInstance.interceptors.response.use(
  // 请求成功
  (res) => {
    // HTTP 状态码
    if (res.status !== 200) {
      return Promise.reject(res);
    }

    // 业务状态码
    const { code } = res.data;
    if (!code || code === 200 || code === '200') {
      // 无code，则请求的是html页面；有code，则返回请求的数据
      return Promise.resolve(res);
    }

    handleErrorCode(code, res.data.message || res.data.msg);

    return Promise.reject(res);
  },
  // 请求失败
  (error: AxiosError) => {
    // 状态码非2xx
    handleErrorCode(error.response?.status, (error.response?.data as any)?.message || '');

    return Promise.reject(error);
  },
);

const http = {
  get: (url: string, params?: any, config?: any) => {
    return axiosInstance.get(url, {
      params,
      ...config,
    });
  },
  post: (url: string, data?: any) => {
    return axiosInstance.post(url, data);
  },
  delete: (url: string) => {
    return axiosInstance.delete(url);
  },
  put: (url: string, data: any) => {
    return axiosInstance.put(url, data);
  },
};

export default http;
