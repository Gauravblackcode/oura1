import capitalize from 'lodash/capitalize';
import {
  StatusType,
  PacingWeight,
  BidType,
  GoalType,
  TemplateSize,
  BudgetType,
  SlotType,
  ActivityType,
  ReportScheduleFreq,
  ReportType,
  ReportScheduleTime,
  WalletChannel,
  WalletPaymentMethod,
  Currency,
  AudienceTargetIncludeKeywordType,
  AudienceTargetExcludeKeywordType,
  WalletType,
  SspDealType,
  AuctionType,
  SspBiddingType,
  YieldGroupBidType,
} from 'types';
import { WalletPaymentOption } from '@/modules/wallet/common/wallet.common';
import { AudienceType } from '@/models';
import { AD_ITEM_TYPE, ADD_ITEM_PRIORITY, BOOLEAN_ENUM } from './constants';
import { toTitleCase } from './helpers';
import { Languages } from './language.list';

const AdTypeIds = ['nativeFixed', 'nativeDynamic', 'productAd', 'displayAd', 'videoAd'];

export const ADUNIT_SELECT_OPTIONS = [{ label: 'Disable Unit', value: 'disable' }];

export const AD_TYPE_OPTIONS = Object.entries(AD_ITEM_TYPE).map(([key, value], index) => ({
  label: value,
  value: key,
  id: AdTypeIds[index],
}));

export const AD_PRIORITY = [
  ADD_ITEM_PRIORITY.PUBLISHER_AD,
  ADD_ITEM_PRIORITY.SPONSORED_AD,
  ADD_ITEM_PRIORITY.STANDARD_AD,
  ADD_ITEM_PRIORITY.EXCHANGE_AD,
  ADD_ITEM_PRIORITY.IN_HOUSE_AD,
];

export const AD_PRIORITY_FILTER_OPTIONS = AD_PRIORITY.map((item, index) => ({ label: item, value: `${index + 1}` }));

export const AD_PRIORITY_OPTIONS = AD_PRIORITY.map((item, index) => ({
  label: `${index + 1}. ${item}`,
  value: index + 1,
}));

export const BOOLEAN_OPTIONS = Object.values(BOOLEAN_ENUM).map(item => ({ label: item, value: item }));

export const STATUS_OPTIONS = [
  { label: 'All Status', value: 'all' },
  ...Object.values(StatusType).map(item => ({ label: capitalize(item), value: item })),
];

export enum ACTIVE_STATUS_TYPE {
  Online = 'ACTIVE_online',
  Offline = 'ACTIVE_offline',
}

export const STATUS_OPTIONS_WITH_LIVE = [
  { label: 'All Status', value: 'all' },
  { label: 'Active + Online', value: ACTIVE_STATUS_TYPE.Online },
  { label: 'Active + Offline', value: ACTIVE_STATUS_TYPE.Offline },
  ...Object.values(StatusType).map(item => ({ label: capitalize(item), value: item })),
];
export const AD_PACING_OPTIONS = [
  {
    label: 'Uniform',
    value: PacingWeight.Uniform,
  },
  {
    label: 'As soon as possible',
    value: PacingWeight.Asap,
  },
];

export const BID_TYPE_OPTIONS = [
  {
    label: 'Fixed Bid',
    value: BidType.Fixed,
  },
  {
    label: 'Dynamic',
    value: BidType.Dynamic,
  },
];

export const GOAL_OPTIONS = {
  [GoalType.Cpm]: {
    label: 'Cost Per Mille(CPM)',
    value: GoalType.Cpm,
  },
  [GoalType.Cpc]: {
    label: 'Cost Per Click(CPC)',
    value: GoalType.Cpc,
  },
  [GoalType.FlatRate]: {
    label: 'Flat Rate',
    value: GoalType.FlatRate,
  },
};

export const KEYWORD_OPTIONS = {
  [AudienceTargetIncludeKeywordType.BroadMatch]: {
    label: 'Broad match',
    value: AudienceTargetIncludeKeywordType.BroadMatch,
    infoText: 'Shows ads for searches contextually related to your keyword',
  },
  [AudienceTargetIncludeKeywordType.ExactMatch]: {
    label: 'Exact match',
    value: AudienceTargetIncludeKeywordType.ExactMatch,
    infoText: 'Shows ads only for searches that closely match your exact keyword',
  },
  [AudienceTargetIncludeKeywordType.PhraseMatch]: {
    label: 'Phrase match',
    value: AudienceTargetIncludeKeywordType.PhraseMatch,
    infoText: 'Shows ads for searches containing your keyword in any order',
  },
};

export const EXCLUDE_KEYWORD_OPTIONS = {
  [AudienceTargetExcludeKeywordType.PhraseMatch]: {
    label: 'Phrase match',
    value: AudienceTargetExcludeKeywordType.PhraseMatch,
    infoText: 'Excludes ads if the search query contains the phrase of the negative keyword',
  },
  [AudienceTargetExcludeKeywordType.ExactMatch]: {
    label: 'Exact match',
    value: AudienceTargetExcludeKeywordType.ExactMatch,
    infoText: 'Excludes ads only if the search query matches the negative keyword exactly',
  },
};

export const TEMPLATE_SIZE = [
  {
    label: 'Native Dynamic',
    value: TemplateSize.NativeDynamic,
  },
  {
    label: 'Native Fixed',
    value: TemplateSize.NativeFixed,
  },
];
export const ADVERTISER_TYPES = [
  {
    label: 'Food',
    value: 'FOOD',
  },
  {
    label: 'Supplies and Accessories',
    value: 'SUPPLIES AND ACCESSORIES',
  },
  {
    label: 'Health and Wellness',
    value: 'HEALTH AND WELLNESS',
  },
  {
    label: 'Services',
    value: 'SERVICES',
  },
  {
    label: 'Equipments',
    value: 'EQUIPMENTS',
  },
  {
    label: 'Default',
    value: 'DEFAULT',
  },
].map(item => ({ ...item, id: item.value }));

export const TIME_PICKER_START_DATE = new Array(24).fill('').map((_, index) => ({
  label: `${index.toString().padStart(2, '0')}: 00`,
  value: `${index.toString().padStart(2, '0')}:00`,
}));

export const TIME_PICKER_END_DATE = new Array(24).fill('').map((_, index) => {
  const currentHour = index.toString().padStart(2, '0');
  const previousHour = index === 0 ? '23' : (index - 1).toString().padStart(2, '0');

  return {
    label: `${currentHour}: 00`,
    value: index === 0 ? '23:59' : `${previousHour}:59`,
  };
});

export const BUDGET_OPTIONS = [
  {
    label: toTitleCase(BudgetType.Lifetime),
    value: BudgetType.Lifetime,
  },
  {
    label: toTitleCase(BudgetType.Daily),
    value: BudgetType.Daily,
  },
];

export const PLACEMENT_DATA_FILTER_OPTIONS = [
  { label: 'All Data', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Advertiser Specific', value: 'advertiser' },
];

export const STATUS_FILTER_MENU = [
  { label: 'All Status', value: 'all' },
  { label: 'Inactive', value: 'false' },
  { label: 'Active', value: 'true' },
];

export const ADTYPE_FILTER_OPTIONS = [
  { label: 'All Ad Types', value: 'all' },
  { label: 'Display Ad', value: SlotType.Display },
  { label: 'Native Fixed', value: SlotType.NativeFixed },
  { label: 'Native Dynamic', value: SlotType.NativeDynamic },
  { label: 'Product Ad', value: SlotType.Product },
  { label: 'Video Ad', value: SlotType.Video },
];

export const REQUEST_TYPE = [
  { label: 'All', value: 'all' },
  { label: 'New Campaign', value: 'newCampaign' },
  { label: 'Add Ad Item', value: 'addAdItem' },
  { label: 'Add Creative', value: 'addCreative' },
  { label: 'Edit Ad Item', value: 'editAdItem' },
  { label: 'Edit Creative', value: 'editCreative' },
];

export const SLOT_TYPE_OPTIONS = [
  { label: 'Display Ad', value: SlotType.Display },
  { label: 'Native Fixed', value: SlotType.NativeFixed },
  { label: 'Native Dynamic', value: SlotType.NativeDynamic },
  { label: 'Product Ad', value: SlotType.Product },
  { label: 'Video Ad', value: SlotType.Video },
];

export const REPORT_TYPE_OPTIONS = [
  { label: 'All Report Types', value: 'all' },
  { label: 'Campaign', value: ReportType.Campaign },
  { label: 'Inventory', value: ReportType.Inventory },
  { label: 'Inventory - Keyword and Category', value: ReportType.InventoryKeywordCategory },
  { label: 'Wallet', value: ReportType.Wallet },
  { label: 'Share of Voice', value: ReportType.ShareOfVoice },
  { label: 'Ad Item', value: ReportType.AdItem },
  { label: 'Creative', value: ReportType.Creative },
];

export const CAMPAIGN_LEVEL_REPORT_OPTIONS = [
  { label: 'All Report Types', value: 'all' },
  { label: 'Campaign', value: ReportType.Campaign },
  { label: 'Ad Item', value: ReportType.AdItem },
  { label: 'Creative', value: ReportType.Creative },
];

export const COMPREHENSIVE_LEVEL_REPORT_OPTIONS = [
  { label: 'All Report Types', value: 'all' },
  { label: 'Campaign', value: ReportType.Campaign },
  { label: 'Financial', value: ReportType.Financial },
  { label: 'Credit Card - Transaction', value: ReportType.CreditCardTransaction },
  { label: 'Credit Card - Wallet', value: ReportType.CreditCardWallet },
  { label: 'Inventory', value: ReportType.Inventory },
  { label: 'Inventory - Keyword and Category', value: ReportType.InventoryKeywordCategory },
  { label: 'Wallet', value: ReportType.Wallet },
  { label: 'Share of Voice', value: ReportType.ShareOfVoice },
  { label: 'Ad Item', value: ReportType.AdItem },
  { label: 'Creative', value: ReportType.Creative },
];

export const SCHEDULE_TYPE_OPTIONS = [
  { label: 'All Schedule', value: 'all' },
  { label: 'Daily', value: ReportScheduleFreq.Daily },
  { label: 'Weekly', value: ReportScheduleFreq.Weekly },
  { label: 'Monthly', value: ReportScheduleFreq.Monthly },
];

export const ACTIVITY_TYPE_OPTIONS = [
  { label: 'All Activity', value: 'all' },
  ...Object.values(ActivityType).map(item => ({ label: toTitleCase(item), value: item })),
];

export const REPORTING_FREQUENCIES = [
  { label: 'Daily', value: ReportScheduleFreq.Daily },
  { label: 'Weekly', value: ReportScheduleFreq.Weekly },
  { label: 'Monthly', value: ReportScheduleFreq.Monthly },
];

export const getTimeFrequencyLabel = (type: ReportScheduleFreq, item: string) => {
  let label = item.split(`${type}_`)[1] ?? '';
  if (label) {
    if (type === ReportScheduleFreq.Daily) {
      label = `${label.slice(0, 2)}:${label.slice(2)}`;
    } else if (type === ReportScheduleFreq.Weekly) {
      label = toTitleCase(label);
    } else {
      label = label
        .split('_')
        .map(labelItem => toTitleCase(labelItem))
        .join(' ');
    }
  }
  return label;
};

export const getTimeFrequencies = (type: ReportScheduleFreq) => {
  const sorter: any = {
    [ReportScheduleTime.WeeklyMonday]: 1,
    [ReportScheduleTime.WeeklyTuesday]: 2,
    [ReportScheduleTime.WeeklyWednesday]: 3,
    [ReportScheduleTime.WeeklyThursday]: 4,
    [ReportScheduleTime.WeeklyFriday]: 5,
    [ReportScheduleTime.WeeklySaturday]: 6,
    [ReportScheduleTime.WeeklySunday]: 7,
  };

  let options = Object.values(ReportScheduleTime)
    .filter(item => item.startsWith(`${type}_`))
    .map(item => {
      return { label: getTimeFrequencyLabel(type, item), value: item };
    });

  if (type === ReportScheduleFreq.Weekly) {
    options = options.sort((a, b) => {
      return sorter[a.value] > sorter[b.value] ? 1 : -1;
    });
  }
  return options;
};

export const PARTIAL_STATUS_OPTIONS = [
  {
    label: 'Active',
    value: StatusType.Active,
  },
  {
    label: 'Inactive',
    value: StatusType.Inactive,
  },
];

export const AUDIENCE_TYPE_OPTIONS = [
  {
    label: 'All Types',
    value: 'all',
  },
  {
    label: 'Static',
    value: AudienceType.CSV,
  },
  {
    label: 'Dynamic',
    value: AudienceType.DYNAMIC,
  },
  {
    label: 'Combination',
    value: AudienceType.COMBINATION,
  },
];

export const WALLET_CHANNELS = [
  {
    label: 'On-Site',
    value: WalletChannel.OnSite,
  },
  {
    label: 'Off-Site',
    value: WalletChannel.OffSite,
  },
  {
    label: 'Social-Media',
    value: WalletChannel.SocialMedia,
  },
];

export const WALLET_TYPE_OPTIONS = [
  {
    label: 'All Wallet Types',
    value: 'all',
  },
  {
    label: 'Advertiser Specific',
    value: WalletType.AdvertiserSpecific,
  },
  {
    label: 'Open',
    value: WalletType.Open,
  },
];

export const WALLET_PAYMENT_OPTIONS: WalletPaymentOption[] = [
  {
    label: 'Legal Contract',
    value: WalletPaymentMethod.Contract,
  },
];

export const WALLET_PAYMENT_CREDIT_CARD_OPTION: WalletPaymentOption = {
  label: 'Credit Card',
  value: WalletPaymentMethod.CreditCard,
};

export const CURRENCY_OPTIONS = Object.values(Currency).map(item => ({ label: item, value: item }));

export const SSP_DEAL_OPTIONS = Object.entries(SspDealType).map(([_key, value]) => ({
  label: value,
  value: value,
}));

export const SSP_AUCTION_OPTIONS = Object.values(AuctionType).map(value => ({
  label: toTitleCase(value),
  value: value,
}));

export const SSP_BIDDING_OPTIONS = Object.values(SspBiddingType).map(value => ({
  label: toTitleCase(value),
  value: value,
}));

export const SSP_LANGUAGE_OPTIONS = Object.entries(Languages).map(([value, label]) => ({
  label,
  value,
}));

export const YIELD_BID_OPTIONS = Object.values(YieldGroupBidType).map(item => ({
  label: item.toUpperCase(),
  value: item,
}));
