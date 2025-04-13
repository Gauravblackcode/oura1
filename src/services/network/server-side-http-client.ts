import axios, { AxiosError, AxiosInstance } from 'axios';
import environments from '../../common/environments';
import logger from '../../common/logger';

type Configs = {
  accessToken: string;
  xApiKey?: string;
};

export class ServerSideHttpClient {
  private axios: AxiosInstance;

  constructor(configs: Configs) {
    const { accessToken, xApiKey } = configs;
    const headers = {} as { [key: string]: string };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    if (xApiKey) {
      headers['x-api-key'] = xApiKey;
    }
    this.axios = axios.create({
      baseURL: process.env.API_BASE_URL_INTERNAL || environments.API_BASE_URL,
      headers,
    });

    this.axios.interceptors.request.use(
      config => config,
      (error: AxiosError) => {
        const { headers: _headers, baseURL, params, method, url }: any = error.config;
        logger.error({ baseURL, method, url, params, headers: _headers });
        return Promise.reject(error.toJSON());
      },
    );

    this.axios.interceptors.response.use(
      response => {
        const { headers: _headers, baseURL, params, method, url } = response.config;
        const { status, statusText } = response;
        logger.info({ baseURL, method, url, params, headers: _headers, status, statusText });
        return response;
      },
      (error: AxiosError) => {
        const { headers: _headers, baseURL, params, method, url }: any = error.config;
        logger.error({ baseURL, method, url, params, headers: _headers });
        return Promise.reject((error as any)?.data || error?.response?.data);
      },
    );
  }

  get httpClient() {
    return this.axios;
  }
}
