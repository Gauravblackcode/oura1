export const DEFAULT_PASSWORD = 'admin@1234';

export enum ENVIRONMENTS {
  LOCAL = 'local',
  DEV = 'development',
  QA = 'qa',
  STAGE = 'stage',
  PRODUCTION = 'production',
}

export enum AGENT {
  WEB = 'web',
  MOBILE = 'mobile',
}

export enum USER_ROLE {
  ADMIN = 'SUPER_USER',
  CUSTOM_USER = 'CUSTOM_USER',
  SUPER_USER = 'SUPER_USER',
  BASIC_USER = 'BASIC_USER',
}

export const READABLE_USER_ROLE: Record<string, string> = {
  [USER_ROLE.SUPER_USER]: 'Admin',
  [USER_ROLE.BASIC_USER]: 'Standard User',
  [USER_ROLE.CUSTOM_USER]: 'Custom User',
};

export const CHARACTER_LIMIT = {
  inputMax: 'can not exceed 256 characters',
  textAreaMax: 'can not exceed 1000 characters',
};

export const EMAIL_PATTERN = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_PATTERN = {
  hasNumber: /\d/,
  hasLowercase: /[a-z]/,
  hasCapital: /[A-Z]/,
  hasLength: /.{10,}/,
  hasSpecial: /[~`!@#$%^&*()_\-+={}[\]|\\:;"'<,>.?]/,
};

export const FLOAT_PATTERN = /[+-]?([0-9]*[.])?[0-9]+/;

export const ROUTE_REFS = {
  loginPage: '/login',
  login: '/api/auth/login',
  logout: 'api/auth/logout',
  callback: 'api/auth/callback',
  refresh: 'api/auth/refresh',
  me: 'api/auth/me',
};

export const DEFAULT_PAGE_SIZE = 10;
/**
 * 15 min * 60 sec * 1000 ms
 */
export const REFRESH_INTERVAL = 15 * 60 * 1000;

export const ACCESS_TOKEN_COOKIE = 'rmn_token';
export const USER_ACL = 'user_acl';
export const REDIRECT_URI_COOKIE = 'redirect_uri_cookie';

export interface ISessionState {
  access_token: string | null;
}

export interface UserRolePermission {
  showPublisher: boolean;
  showAdvertiser: boolean;
}

export interface IAppConfigs {
}

