import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ClientSideHttpClient } from './client-side-http.service';
import { ServerSideHttpClient } from './server-side-http-client';

export type HttpServiceConfig = {
  accessToken?: string;
  xApiKey?: string;
  ssrServer?: boolean;
};

export class HttpService {
  protected httpClient: AxiosInstance;

  constructor(config: HttpServiceConfig = { ssrServer: false }) {
    const { accessToken = '', ssrServer, xApiKey = '' } = config;
    if (accessToken || xApiKey) {
      this.httpClient = new ServerSideHttpClient({ accessToken, xApiKey }).httpClient;
    } else {
      this.httpClient = new ClientSideHttpClient({ ssrServer }).httpClient;
    }
  }

  protected request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.httpClient.request(config).then(response => response.data);
  }

  protected get<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.httpClient.get<T>(url, config).then(response => response.data);
  }

  protected post<T = any>(url: string, data = {}, config: AxiosRequestConfig = {}) {
    return this.httpClient.post<T>(url, data, config).then(response => response.data);
  }

  protected put(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return this.httpClient.put(url, data, config).then(response => response.data);
  }

  protected patch<T = any>(url: string, data = {}, config: AxiosRequestConfig = {}) {
    return this.httpClient.patch<T>(url, data, config).then(response => response.data);
  }

  protected delete(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return this.httpClient.delete(url, { data, ...config }).then(response => response.data);
  }
}
