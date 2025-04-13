const ADVERTISER_ROUTES = {
  BASE: '/advertisers',
  ADD_ADVERTISER: '/advertisers/add',
  ADD_PARENT_ADVERTISER: '/advertisers/add/parent-company',
};

const API_ROUTES = {
  ENCRYPTED_DOWNLOAD: '/api/resource/download',
};

const AUTH_ROUTES = {
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  SET_PASSWORD: '/auth/set-password',
  LOGIN: '/login',
  LOGOUT: '/api/auth/logout',
};

const APPROVAL_REQUEST_ROUTES = {
  BASE: '/change-requests',
  DETAILS: '/change-requests/details',
};

const CAMPAIGN_ROUTES = {
  BASE: '/campaigns',
  ADD: '/campaigns/add-campaign',
  EDIT: '/campaigns/edit-campaign',
};

const AD_ITEM_ROUTES = {
  BASE: '/campaigns/ad-item',
  ADD: '/campaigns/add-ad-item',
  EDIT: '/campaigns/edit-ad-item',
  VIEW: '/campaigns/view-ad-item',
};

const CREATIVE_ROUTES = {
  BASE: '/creatives',
  ADD_CREATIVE: '/campaigns/add-creative',
  EDIT_CREATIVE: '/campaigns/edit-creative',
  VIEW_CREATIVE: '/campaigns/view-creative',
  ADD_TEMPLATE: '/creatives/add-template',
  EDIT_TEMPLATE: '/creatives/edit-template',
};

const INVENTORY_ROUTES = {
  BASE: '/inventory',
  ADD_AD_UNIT: '/inventory/add/ad-unit',
  ADD_PLACEMENT: '/inventory/add/placement',
  EDIT_AD_UNIT: '/inventory/edit/ad-unit',
  EDIT_PLACEMENT: '/inventory/edit/placement',
};

const REPORT_ROUTES = {
  BASE: '/reporting',
  ADD: '/reporting/add',
  EDIT: '/reporting/edit',
};

const USERS_ROUTES = {
  BASE: '/users',
  ADD: '/users/user/add',
  EDIT: '/users/user',
};

const WALLET_ROUTES = {
  BASE: '/wallet',
  TEAM: '/wallet?tab=teams',
  ADD_WALLET: '/wallet/add-wallet',
  ADD_TEAM: '/wallet/add-team',
  PAYMENT: '/wallet/credit-card',
  PAYMENT_COMPLETE: '/wallet/credit-card/payment-details',
};

const AUDIENCE_ROUTES = {
  BASE: '/audience',
  AUDIENCE_ADD: '/audience/segment/add',
  EDIT: '/audience/segment/edit',
  CANVAS: '/audience/audience-canvas',
  AUDIENCE_CANVAS: '/audience/audience-canvas/[id]',
  KEY_VALUES: '/audience?tab=key%2Fvalues',
  KEY_VALUES_ADD: '/audience/key-values/add',
};

const ACCOUNT_ROUTES = {
  BASE: '/account',
  GLOBAL_SETTING: '/account?tab=global_settings',
  BRANDING: '/account?tab=branding',
  PAGE: '/account?tab=page_category',
};

const YIELD = {
  BASE: '/yield',
  CREATE: '/yield/group/create',
  EDIT: '/yield/group/edit',
  GROUP: '/yield/group',
  PARTNER: '/yield/partner',
  SSP: '/yield/ssp',
  SSP_CONFIGURE: '/yield/ssp/configure',
};

const ROUTES = {
  ACCOUNT: ACCOUNT_ROUTES,
  APPROVAL_REQUEST: APPROVAL_REQUEST_ROUTES,
  API: API_ROUTES,
  AUTH: AUTH_ROUTES,
  AD_ITEM: AD_ITEM_ROUTES,
  AUDIENCE: AUDIENCE_ROUTES,
  ADVERTISERS: ADVERTISER_ROUTES,
  CAMPAIGN: CAMPAIGN_ROUTES,
  CREATIVE: CREATIVE_ROUTES,
  UNAUTHORIZED: '/401',
  FORBIDDEN: '/403',
  DASHBOARD: '/dashboard',
  ENCRYPTED_DOWNLOAD: '/encrypted-download',
  INSIGHTS: '/insights',
  INVENTORY: INVENTORY_ROUTES,
  REPORT: REPORT_ROUTES,
  USERS: USERS_ROUTES,
  WALLET: WALLET_ROUTES,
  YIELD,
  AI: '/carter-ai'
};

export default ROUTES;
