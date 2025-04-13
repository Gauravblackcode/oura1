export enum SNOWPLOW_EVENTS {
  BUTTON_CLICK = 'button_click',
  CAMPAIGNS_CAMPAIGN_CONFIGURE = 'campaigns_new_campaign_create',
  CAMPAIGNS_AD_ITEM_CONFIGURE = 'campaigns_ad_item_configure',
  CAMPAIGNS_CREATIVE_CONFIGURE = 'campaigns_creative_configure',
  CHANGE_ACTIVE_REQUESTS_VIEW = 'change_requests_active_requests_view',
  CHANGE_ACTIVE_REQUESTS_APPROVAL = 'change_requests_active_requests_approve',
}

export enum FormTrackingEvent {
  /** Form field changed event */
  CHANGE_FORM = 'change_form',
  /** Form field focused event */
  FOCUS_FORM = 'focus_form',
  /** Form submitted event */
  SUBMIT_FORM = 'submit_form',
}
