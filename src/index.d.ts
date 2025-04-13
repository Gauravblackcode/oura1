import { DefaultContext } from '@apollo/client';
import * as Axios from 'axios';

export type ThemeMode = 'dark' | 'light';

declare module 'axios' {
  export interface AxiosRequestConfig<_D = any> extends Axios.AxiosRequestConfig {
    silent?: boolean;
  }
}

declare global {
  type GTagEvent = {
    action: string;
    [key: string]: any;
  };
  interface Window {
    gtag: (context: 'config' | 'event' | 'set', ...params: any) => void;
  }
}

declare type TFormChangeEvents = {
  dirty: boolean;
  isValid: boolean;
  values: { [key: string]: any };
};

declare type TMediaType = {
  fileName: string;
  fileSize: any;
  contentType: any;
  rowCount: any;
  downloadUrl: string;
  signedUrl: string;
};

declare type AdvanceApolloContext = DefaultContext & { silent: boolean };
