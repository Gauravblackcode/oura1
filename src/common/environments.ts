export type ENVIRONMENT = {
  API_BASE_URL: string;
  APP_BASE_URL: string;
  BASE_PATH: string;
};

/* Client Side Variables */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.oura1.com/api';
const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || '';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const environments: ENVIRONMENT = {
  API_BASE_URL,
  APP_BASE_URL,
  BASE_PATH,
};

export default environments;
