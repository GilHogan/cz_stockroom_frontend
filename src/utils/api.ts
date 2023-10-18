
import axios, { Method } from 'axios';
import Constants from '@/constant/constants';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 60
});

service.interceptors.request.use(
  config => config,
  error => {
    console.log('request error', error);
    return { code: Constants.Code.REQUEST_ERROR }
  }
);

service.interceptors.response.use(
  response => response,
);

export type ResponseType<T> = {
  code: number;
  msg: string;
  data: T | null;
}

export const request = async function <T> (method: Method, params: any | null, url: string, header = {}, timeout?: number): Promise<ResponseType<T>> {

  let data: any = null;
  if (params && method !== 'GET' && method !== 'get') {
    data = { ...params };
    params = null;
  }

  const headers = {
    ...header,
    'Content-type': 'application/json'
  };

  return new Promise<ResponseType<T>>(resolve => {

    service.request({ url, method, params, data, headers, timeout })
      .then(response => {
        const res = response.data;
        resolve({
          code: res.code,
          msg: res.msg,
          data: res.data
        });
      })
      .catch(err => {
        console.log('request error:', err);
        // 请求超时
        if (err && err.code === 'ECONNABORTED') {
          resolve({
            code: Constants.Code.TIMEOUT, msg: "请求超时", data: null
          })
        } else {
          resolve({
            code: Constants.Code.RESPONSE_ERROR, msg: "请求失败", data: null
          })
        }
      })
  });
}