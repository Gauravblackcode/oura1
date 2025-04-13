import { AdItem, Campaign, Creative, Maybe } from 'types';
import { SNOWPLOW_EVENTS } from '@/lib/snowplow/events';
import SnowAnalyticsService from '@/services/analytics/snow-analytics.service';
import { CampaignFormInput } from '@/modules/campaign-forms/helpers/campaign-form.type';
import { AdItemFormInput } from '@/modules/campaign-forms/ad-item/helper/ad-item-form-types';
import { CreativeFormInput } from '@/modules/campaign-forms/creative/context/creative-form.provider';

const createCampaignEvent = (campaign: Campaign, extraInfo: Record<string, Maybe<string> | undefined> = {}) => {
  const eventTrackerPayload = {
    ...extraInfo,
    campaign_name: campaign?.name,
    owner: campaign?.owner,
    advertiser: campaign?.advertiserName,
    is_discard: 'false',
    campaign_id: campaign?.id,
  };
  SnowAnalyticsService.handleSelfDescribedEvents(
    SNOWPLOW_EVENTS.CAMPAIGNS_CAMPAIGN_CONFIGURE,
    eventTrackerPayload,
    '3-0-0',
  );
};

const resetCampaignEvent = (campaign: CampaignFormInput, extraInfo: Record<string, Maybe<string> | undefined> = {}) => {
  const eventTrackerPayload = {
    ...extraInfo,
    campaign_name: campaign.name || '',
    owner: campaign.ownerName,
    advertiser: campaign.advertiserId,
    is_discard: 'true',
    campaign_id: '',
  };
  SnowAnalyticsService.handleSelfDescribedEvents(
    SNOWPLOW_EVENTS.CAMPAIGNS_CAMPAIGN_CONFIGURE,
    eventTrackerPayload,
    '3-0-0',
  );
};

const createAdItemEvent = (adItemData: AdItem, extraInfo: Record<string, Maybe<string> | undefined> = {}) => {
  const eventTrackerPayload = {
    ...extraInfo,
    ad_item_id: adItemData?.id,
    ad_item_type: adItemData?.type,
    ad_item_name: adItemData?.name,
    start_date: adItemData?.startDate || null,
    end_date: adItemData?.endDate || null,
    ad_item_priority: String(adItemData?.priority),
    page_type: [adItemData?.pageType],
    placementIds: adItemData?.placementIds,
    ad_pacing: adItemData?.pacingWeight,
    frequency_capping: adItemData?.isFreqCapEnabled,
    creative_size: adItemData?.adSize,
    frequency_per_user: adItemData?.freqCapPerUser,
    select_ad_unit: adItemData?.adSlotIds,
    select_wallet: adItemData?.walletId,
    ad_item_budget_type: adItemData?.budgetType,
    ad_item_budget: adItemData?.totalBudget,
    biding_strategy: adItemData?.goalType,
    bid_type: adItemData?.bidType,
    max_bid: Number(adItemData?.maxBidAmount) || 0,
    goal: adItemData?.goalType,
    demographic: adItemData?.demographics || null,
    page_category: adItemData?.pageCategories || null,
    keyboard_match_type: adItemData?.keywords || null,
    key_value_targeting: adItemData?.keyValues || null,
    audience_cohort: adItemData?.cohortList || null,
    is_discard: 'false',
    campaign_id: adItemData?.campaignId,
    custom_id: adItemData?.customId || null,
  };

  SnowAnalyticsService.handleSelfDescribedEvents(
    SNOWPLOW_EVENTS.CAMPAIGNS_AD_ITEM_CONFIGURE,
    eventTrackerPayload,
    '5-0-0',
  );
};

const resetAdItemEvent = (adItemData: AdItemFormInput, extraInfo: Record<string, Maybe<string> | undefined> = {}) => {
  const eventTrackerPayload = {
    ...extraInfo,
    ad_item_type: adItemData?.type,
    ad_item_name: adItemData?.name,
    start_date: adItemData?.startDate || null,
    end_date: adItemData?.endDate || null,
    ad_item_priority: String(adItemData?.priority),
    page_type: adItemData?.pageType,
    platform: adItemData?.platformIds,
    ad_pacing: adItemData?.pacingWeight,
    frequency_capping: adItemData?.isFreqCapEnabled,
    creative_size: adItemData?.adSize,
    frequency_per_user: adItemData?.freqCapPerUser,
    select_ad_unit:
      Number(adItemData?.adSlotIds?.length) > 0
        ? adItemData?.adSlotIds?.map((el: any) => el?.label).reduce((a, b) => `${a}, ${b}`)
        : null,
    select_wallet: adItemData?.wallet?.id,
    ad_item_budget_type: adItemData?.budgetType,
    ad_item_budget: adItemData?.totalBudget,
    biding_strategy: adItemData?.goalType,
    bid_type: adItemData?.bidType,
    max_bid: Number(adItemData?.maxBidAmount) || 0,
    goal: adItemData?.goalType,
    demographic: adItemData?.demographics || null,
    page_category: adItemData?.pageCategories || null,
    keyboard_match_type: adItemData?.keywords || null,
    key_value_targeting: adItemData?.keyValues || null,
    audience_cohort: adItemData?.cohortList || null,
    is_discard: 'true',
    ad_item_id: '',
  };
  SnowAnalyticsService.handleSelfDescribedEvents(
    SNOWPLOW_EVENTS.CAMPAIGNS_AD_ITEM_CONFIGURE,
    eventTrackerPayload,
    '5-0-0',
  );
};

const createCreativeEvent = (creativeData: Creative, extraInfo: Record<string, Maybe<string> | undefined> = {}) => {
  const eventTrackerPayload = {
    ...extraInfo,
    creative_type: creativeData?.sizeType,
    creative_name: creativeData?.name,
    brand: creativeData?.advertiserName,
    template_id: creativeData?.templateId,
    alt_text: creativeData?.alternateText || null,
    click_through_link: creativeData?.clickThroughUrl || null,
    link_up_product: creativeData?.productIdList ? creativeData?.productIdList.join(', ') : '',
    is_discard: 'false',
    ad_item_id: creativeData?.adItemId,
    creative_id: creativeData?.id,
    ad_size: creativeData?.adSize,
    clicks_tracker: creativeData?.clickUrl,
    conversion_tracker: creativeData?.conversionUrl,
    impression_tracker: creativeData?.impressionUrl,
  };
  SnowAnalyticsService.handleSelfDescribedEvents(
    SNOWPLOW_EVENTS.CAMPAIGNS_CREATIVE_CONFIGURE,
    eventTrackerPayload,
    '6-0-0',
  );
};

const resetCreativeEvent = (
  creativeData: CreativeFormInput,
  extraInfo: Record<string, Maybe<string> | undefined> = {},
) => {
  const eventTrackerPayload = {
    ...extraInfo,
    creative_type: creativeData?.sizeType,
    creative_name: creativeData?.name,
    brand: creativeData?.advertiserName,
    template_id: creativeData?.templateId,
    alt_text: creativeData?.alternateText || null,
    click_through_link: creativeData?.clickThroughUrl || null,
    link_up_product: creativeData?.productIdList ? creativeData?.productIdList.join(', ') : '',
    is_discard: 'true',
    ad_item_id: creativeData?.adItemId,
    ad_size: creativeData?.adSize,
    creative_id: '',
    clicks_tracker: creativeData?.clickUrl,
    conversion_tracker: creativeData?.conversionUrl,
    impression_tracker: creativeData?.impressionUrl,
  };
  SnowAnalyticsService.handleSelfDescribedEvents(
    SNOWPLOW_EVENTS.CAMPAIGNS_CREATIVE_CONFIGURE,
    eventTrackerPayload,
    '6-0-0',
  );
};

export const AnalyticsHelper = {
  createCampaignEvent,
  resetCampaignEvent,
  createAdItemEvent,
  resetAdItemEvent,
  createCreativeEvent,
  resetCreativeEvent,
};
