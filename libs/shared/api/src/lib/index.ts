import axios from 'axios'
// import { getSession } from 'next-auth/react';
import qs from 'qs'

const api = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_URL'],
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  paramsSerializer: {
    indexes: null // by default: false
  }
  // paramsSerializer: (params) => qs.stringify(params, { encode: false })
  // paramsSerializer: (params) => qs.stringify(params, {  encode: false, arrayFormat: 'repeat' })
})

// api.interceptors.request.use(async config => {
//   const session = await getSession();

//   if (config.headers && session) {
//     config.headers['Authorization'] = `Bearer ${session['accessToken']}`;
//   }
//   return config;
// });

export const fetcher = (url: string) => api.get(url).then((res) => res.data)

export default api
