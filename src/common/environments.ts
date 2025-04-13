export type ENVIRONMENT = {
  API_BASE_URL: string;
  APP_BASE_URL: string;
  BASE_PATH: string;
  DATA_WEAVER_BASE_URL: string;
  DATA_WEAVER_API_KEY: string;
  APP_ENV?: string;
  BUILD_TAG?: string;
  GA_TRACKING?: string;
  SNOWPLOW_COLLECTOR_URL?: string;
  SNOWPLOW_BASE_URL?: string;
  TRACKINGS_ENABLED?: boolean;
  SNOWPLOW_URL?: string;
  SNOWPLOW_NAME_TRACKER?: string;
  SNOWPLOW_APP_ID?: string;
  PAYMENT_GATEWAY_URL_JS?: string;
  PAYMENT_GATEWAY_URL_CSS?: string;
  BRAND_LOGO?: string;
  CREDIT_CARD_ENABLED?: string;
  CLIENT_NAME?: string;
  CLIENT_WEBSITE?: string;
  SUPPORT_EMAIL?: string;
  IS_LOOKER_ENABLED?: boolean;
  WEAVER_ENABLED?: boolean;
  FAVICON_URL?: string;
  ALLOW_INSECURE?: boolean;
  BUCKET_URL?: string;
  CARTER_AI_API_KEY?: string;
};

/* Client Side Variables */
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || '';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || '';
const DATA_WEAVER_BASE_URL = process.env.NEXT_PUBLIC_DATA_WEAVER_BASE_URL || '';
const DATA_WEAVER_API_KEY = process.env.NEXT_PUBLIC_DATA_WEAVER_API_KEY || '';
const CARTER_AI_API_KEY = process.env.NEXT_PUBLIC_CARTER_AI_API_KEY || '';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
const BUILD_TAG = process.env.NEXT_PUBLIC_BUILD_TAG || '';
const GA_TRACKING = process.env.NEXT_PUBLIC_GA_TRACKING || '';
const SNOWPLOW_BASE_URL = process.env.NEXT_PUBLIC_SNOWPLOW_BASE_URL;
const SNOWPLOW_COLLECTOR_URL = process.env.NEXT_PUBLIC_SNOWPLOW_COLLECTOR_URL;
const TRACKINGS_ENABLED = process.env.NEXT_PUBLIC_TRACKINGS_ENABLED === 'true';
const SNOWPLOW_URL = process.env.NEXT_PUBLIC_SNOWPLOW_URL;
const SNOWPLOW_NAME_TRACKER = process.env.NEXT_PUBLIC_SNOWPLOW_NAME_TRACKER || '';
const SNOWPLOW_APP_ID = process.env.NEXT_PUBLIC_SNOWPLOW_APP_ID;
const FAVICON_URL = process.env.NEXT_PUBLIC_FAVICON_URL;
const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL || '';

/* Server Side Variables */
const PAYMENT_GATEWAY_URL_JS =
  process.env.PAYMENT_GATEWAY_JS || 'https://int1-www.petco.com/assets-new/aci-payment/petco-aci-payment.umd.cjs';
const PAYMENT_GATEWAY_URL_CSS =
  process.env.PAYMENT_GATEWAY_CSS || 'https://int1-www.petco.com/assets-new/aci-payment/style.css';

const BRAND_LOGO = process.env.BRAND_LOGO || '';
const CREDIT_CARD_ENABLED = process.env.CREDIT_CARD_ENABLED || '';
const CLIENT_NAME = process.env.CLIENT_NAME || 'Petco';
const CLIENT_WEBSITE = process.env.CLIENT_WEBSITE || 'https://advertising.petco.com/';
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || '';
const ALLOW_INSECURE = process.env.NEXT_PUBLIC_ALLOW_INSECURE === 'true';

const environments: ENVIRONMENT = {
  API_BASE_URL,
  APP_BASE_URL,
  DATA_WEAVER_BASE_URL,
  DATA_WEAVER_API_KEY,
  BASE_PATH,
  BUILD_TAG,
  GA_TRACKING,
  APP_ENV,
  SNOWPLOW_COLLECTOR_URL,
  SNOWPLOW_BASE_URL,
  TRACKINGS_ENABLED,
  SNOWPLOW_URL,
  SNOWPLOW_NAME_TRACKER,
  SNOWPLOW_APP_ID,
  PAYMENT_GATEWAY_URL_JS,
  PAYMENT_GATEWAY_URL_CSS,
  BRAND_LOGO,
  CREDIT_CARD_ENABLED,
  CLIENT_NAME,
  CLIENT_WEBSITE,
  SUPPORT_EMAIL,
  FAVICON_URL,
  ALLOW_INSECURE,
  BUCKET_URL,
  CARTER_AI_API_KEY
};

export default environments;
