import axios, { AxiosError, AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';
import { ACCESS_TOKEN_COOKIE } from '@/common/constants';
import environments from '../../common/environments';
import logger from '../../common/logger';
import { showLoader } from '../../redux/actions';

type Configs = {
  ssrServer?: boolean;
};

export class ClientSideHttpClient {
  private axios: AxiosInstance;

  constructor(configs: Configs = { ssrServer: false }) {
    const { ssrServer } = configs;
    this.axios = axios.create({
      baseURL: !ssrServer ? environments.API_BASE_URL : environments.APP_BASE_URL || '/',
    });

    this.axios.interceptors.request.use(
      config => {
        if (!config.silent) {
          showLoader(true);
        }
        const token = getCookie(ACCESS_TOKEN_COOKIE);
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          } as any;
        }
        return config;
      },
      (error: AxiosError) => {
        showLoader(false);
        logger.error(error);
        return Promise.reject(error.toJSON());
      },
    );

    this.axios.interceptors.response.use(
      response => {
        showLoader(false);
        return response;
      },
      (error: AxiosError) => {
        showLoader(false);
        // const path = Router.asPath;
        // if (error.response?.status === 401 && !path.includes('/auth/refresh') && !path.includes('/i/')) {
        //   Router.push(`/auth/refresh?redirectTo=${encodeURIComponent(path)}`);
        // }
        return Promise.reject(error.toJSON());
      },
    );
  }

  get httpClient() {
    return this.axios;
  }
}
