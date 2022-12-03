import axios from 'axios'
// import { getSession } from 'next-auth/react';
import qs from 'qs'

const api = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_URL'],

  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  },
  paramsSerializer: {
    serialize: (params) =>
      qs.stringify(
        params,
        // find keys ge and le and convert to one string with a .. two dots separator.
        {
          filter: (_prefix, value) => {
            if (Object.keys(value).some((k) => ['ge', 'le'].includes(k))) {
              return `${value.ge}..${value.le}`
            }
            // serialize the usual way
            return value
          },
          arrayFormat: 'comma'
        }
      )
  }
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
