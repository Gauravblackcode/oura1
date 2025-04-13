import Axios, { AxiosInstance } from 'axios';
import environments from '@/common/environments';

const axios: AxiosInstance = Axios.create({
  baseURL: environments.DATA_WEAVER_BASE_URL,
  headers: {
    'x-api-key': environments.DATA_WEAVER_API_KEY,
  },
});

//In future if need to pass token, use below code

// axios.interceptors.request.use(config => {
//   config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
//   return config;
// });

export default axios;
