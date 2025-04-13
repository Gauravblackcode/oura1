import * as yup from 'yup';
import {
  AdItemType,
  AdServeType,
  BidType,
  BudgetType,
  GoalType,
  PacingWeight,
  SlotType,
  WalletPaymentMethod,
  WalletType,
} from 'types';
import { ManageFundTypes } from '@/services/wallet/interfaces/wallet.interfaces';
import { AudienceType } from '@/models';
import DateTimeParser from '@/lib/date-time-parser';
import { EMAIL_PATTERN, PASSWORD_PATTERN, CHARACTER_LIMIT } from './constants';

const CONTRACT_NO_REGEX = /^[a-zA-Z0-9]+[a-zA-Z0-9._-]*[a-zA-Z0-9]+$/;

export const loginSchema = yup.object().shape({
  username: yup.string().matches(EMAIL_PATTERN, 'Please enter valid email').required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
  rememberMe: yup.boolean(),
});

export const forgotPasswordSchema = yup.object().shape({
  username: yup.string().matches(EMAIL_PATTERN, 'Please enter valid email').required('Please enter your email'),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Please enter password')
    .min(10, 'Password should have at least 10 characters')
    .matches(PASSWORD_PATTERN.hasCapital, 'Please enter at least one uppercase letter')
    .matches(PASSWORD_PATTERN.hasLowercase, 'Please enter at least one lowercase letter')
    .matches(PASSWORD_PATTERN.hasSpecial, 'Please enter at least one special character')
    .matches(PASSWORD_PATTERN.hasNumber, 'Please enter at least one number'),
  confirmPassword: yup
    .string()
    .required('Please re-enter password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});

export const addNewUserSchema = yup.object().shape({
  firstName: yup.string().max(256, `First name ${CHARACTER_LIMIT.inputMax}`).required('First Name is required'),
  lastName: yup.string().max(256, `Last name ${CHARACTER_LIMIT.inputMax}`).required('Last Name is required'),
  email: yup
    .string()
    .max(256, `Email ${CHARACTER_LIMIT.inputMax}`)
    .matches(EMAIL_PATTERN, 'Please enter valid email')
    .required('Email is required'),
  userType: yup.string().required(),
  brandsAndDepartments: yup.array().when('allowAllAdvertisers', {
    is: false,
    then: yup.array().min(1, 'At least one option must be selected').required(),
  }),
  timeZoneName: yup.string().required('Timezone is required'),
  allowAllAdvertisers: yup.boolean().required(),
  roleType: yup.string().required(),
  permissions: yup.object().required(),
});

export const addWalletSchema = yup.object().shape({
  name: yup.string().max(256, `Wallet name ${CHARACTER_LIMIT.inputMax}`).required('Wallet name is required'),
  channel: yup.string().required('Wallet Channel is required'),
  advertiserId: yup
    .array()
    .nullable()
    .when('type', {
      is: WalletType.AdvertiserSpecific,
      then: schema => schema.min(1, 'Advertiser is required'),
    }),
  amount: yup.number().when('isAddFundToWallet', {
    is: true,
    then: schema =>
      schema.lessThan(10000000, 'You cannot exceed $9,999,999').when('paymentMethod', {
        is: WalletPaymentMethod.CreditCard,
        then: schema => schema.required('Total fund is required'),
      }),
  }),
  paymentMethod: yup.string().when('isAddFundToWallet', {
    is: true,
    then: schema => schema.required('Please select payment method'),
  }),
  fileUrl: yup.string().when('paymentMethod', {
    is: WalletPaymentMethod.Contract,
    then: schema => schema.required('Please upload legal contract file'),
  }),
  ioContractNumber: yup
    .string()
    .max(30, 'Contract Number must be at most 30 characters')
    .when('paymentMethod', {
      is: WalletPaymentMethod.Contract,
      then: schema =>
        schema
          .required('Please enter contract number')
          .matches(CONTRACT_NO_REGEX, 'Please enter a valid contract number'),
    }),
  userGroupIdList: yup.array().when('allowAllUserGroups', {
    is: false,
    then: schema => schema.required().min(1, 'Team/user is required').required(),
  }),
  parentCompanyId: yup
    .array()
    .nullable()
    .when('type', {
      is: WalletType.ParentLevel,
      then: schema => schema.required().min(1, 'Select Parent company to get advertiser list'),
    }),
  parentLevelAdvertiserIds: yup
    .array()
    .nullable()
    .when('type', {
      is: WalletType.ParentLevel,
      then: schema => schema.min(1, 'Please select advertisers').required(),
    }),
});
export const addTeamSchema = yup.object().shape({
  name: yup.string().max(256, `Team name ${CHARACTER_LIMIT.inputMax}`).required('Team  name is required'),
  userIdList: yup.array().min(1, 'At least one user must be selected').required(),
});

export const addAudienceKeyValuesSchema = yup.object().shape({
  keyName: yup.string().required('Key name is required'),
  targetKey: yup.string().required('Targeting key is required'),
  valueType: yup.string().required('Value type is required'),
  valueDetails: yup.string().required('Value details are required'),
});

export const campaignSchema = yup.object().shape({
  name: yup.string().max(256, `Campaign name ${CHARACTER_LIMIT.inputMax}`).required('Campaign name is required'),
  advertiserId: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string().required('Advertiser is required'),
    })
    .typeError('Advertiser is required')
    .required('Advertiser is required'),
});

export const adItemConfigurationSchema = yup.object().shape({
  type: yup.string().oneOf(Object.values(AdItemType)).required('Please select Ad-item type'),
  name: yup.string().max(256, `Ad Item name ${CHARACTER_LIMIT.inputMax}`).required('Please enter Ad-item name'),
  startDate: yup
    .string()
    .test('start-date-past', 'Start Date can not be in the past', function (value) {
      const { id } = this.parent;
      if (id) {
        return true;
      }
      return DateTimeParser().subtract(1, 'minutes').isBefore(DateTimeParser(value));
    })
    .required('Start date is required'),
  endDate: yup
    .string()
    .test('future-end-date', 'End date time need to be greater than current date time', value => {
      return DateTimeParser(value).isAfter(DateTimeParser());
    })
    .test('end-date-check', 'End date time must be after start date', function (endDate) {
      const { startDate } = this.parent;
      return DateTimeParser(startDate).isBefore(endDate);
    })
    .test('hour-diff-check', 'Ad Item duration must be at least 1 hour', function (endDate) {
      const { startDate } = this.parent;
      return DateTimeParser(endDate).diff(startDate, 'hour') >= 1;
    })
    .required('End date is required and should be greater than start date'),
  priority: yup.string().required('Please select Ad-item priority'),
  platformIds: yup.array().min(1, 'Please select at least (1) platform.').required('Please select platform'),
  pageType: yup.array().min(1, 'Please select at least (1) page type.').required('Please select Page Type'),
  pacingWeight: yup.string().oneOf(Object.values(PacingWeight)).required('Please select pacing weight'),
  freqCapPerUser: yup
    .number()
    .integer('Frequency should be a valid number')
    .min(0, 'Frequency per user should be more than 0')
    .required('Please enter frequency per user'),
  adSize: yup.array().min(1, 'You must have at least (1) ad size selected').required('Please select Creative Size'),
  adSlotIds: yup
    .array()
    .ensure()
    .when('placementIds', {
      is: (placementIds: any) => {
        // Check if adSlotIds and placementIds are both empty arrays
        return !placementIds || (Array.isArray(placementIds) && placementIds.length === 0);
      },
      then: yup.array().min(1, 'At least one option must be selected').required(),
      otherwise: yup.array(),
    }),
  placementIds: yup.array(),
  customId: yup.string().max(30, 'Custom Id can not exceed 30 characters'),
});

export const adItemBudgetSchema = yup.object().shape({
  walletId: yup.string().required('Please select Wallet'),
  budgetType: yup.string().oneOf(Object.values(BudgetType)).required('Please select budget type'),
  totalBudget: yup.string().max(30, 'Total budget can not exceed 30 characters').required('Please enter total budget'),
  goalType: yup.string().oneOf(Object.values(GoalType)).required('Please select Goal Type'),
  bidType: yup.string().oneOf(Object.values(BidType)).required('Please select Bid Type'),
  maxBidAmount: yup.string().max(30, 'Bid can not exceed 30 characters'),
  dailyUpperLimitAmount: yup
    .string()
    .nullable()
    .when('dailyUpperLimitFlag', {
      is: true,
      then: schema => schema.required('Please enter Daily Upper Limit Amount'),
    }),
  goalTarget: yup.string().max(30, 'Goal can not exceed 30 characters').required('Please enter Goal Target'),
});

export const adItemTargetAudienceSchema = yup.object().shape({
  keywordType: yup.string().nullable(),
  keywords: yup.array().nullable(),
  excludeKeywordType: yup.string().nullable(),
  excludedKeywords: yup.array().nullable(),
});

export const nativeAdSchema = yup.object().shape({
  name: yup.string().max(256, `Creative name ${CHARACTER_LIMIT.inputMax}`).required('Please enter name for creative'),
  templateId: yup.string().required('Please select template for creative'),
  alternateText: yup.string().max(256, 'Alternate text cannot exceed 256 characters'),
  clickThroughUrl: yup.string().max(256, 'Click through url can not exceed 256 characters.'),
});

export const productAdSchema = yup.object().shape({
  name: yup.string().max(256, `Creative name ${CHARACTER_LIMIT.inputMax}`).required('Please enter name for creative'),
  productIdList: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
        item: yup.object(),
      }),
    )
    .required('Please add Link Up Products to continue'),
  alternateText: yup.string().max(256, 'Alternate text cannot exceed 256 characters'),
  contentUrl: yup.string().required('Media is missing for Creative'),
});

export const displayAdSchema = yup.object().shape({
  name: yup.string().max(256, `Creative name ${CHARACTER_LIMIT.inputMax}`).required('Please enter name for creative'),
  advertiserName: yup.string().required('Advertiser is missing for creative'),
  adSize: yup.string().required('Size is missing for creative'),
  contentUrl: yup.string().required('Media is missing for Creative'),
  alternateText: yup.string().max(256, 'Alternate text cannot exceed 256 characters'),
  clickThroughUrl: yup.string().max(256, 'Click through url can not exceed 256 characters.'),
});

export const videoAdSchema = yup.object().shape({
  name: yup.string().max(256, `Creative name ${CHARACTER_LIMIT.inputMax}`).required('Please enter name for creative'),
  contentUrl: yup.string().required('Media is missing for Creative'),
  skipTime: yup.string().when('skipAllowed', {
    is: true,
    then: schema => schema.matches(/[0-5][0-9]:[0-5][0-9]/, 'Please enter time in mm:ss format'),
  }),
  duration: yup.string().matches(/\d+$/, 'Please enter duration in seconds only').required('Please enter duration'),
  productIdList: yup.array().min(1, 'Please select at least 1 product item').required('Product selection is required'),
  alternateText: yup.string().max(256, 'Alternate text cannot exceed 256 characters'),
  clickThroughUrl: yup.string().max(256, 'Click through url can not exceed 256 characters.'),
});

export const manageFundSchema = yup.object().shape({
  actionType: yup.string().required('Please select action type'),
  amount: yup
    .number()
    .lessThan(10000000, 'You cannot exceed $9,999,999')
    .when('paymentMethod', {
      is: WalletPaymentMethod.CreditCard,
      then: schema => schema.required('Please enter amount'),
    }),
  walletId: yup.array().when('actionType', {
    is: ManageFundTypes.TRANSFER,
    then: yup.array().min(1, 'Target Wallet is required').required('Target Wallet is required'),
  }),
  paymentMethod: yup.string().when('actionType', {
    is: ManageFundTypes.ADD,
    then: schema => schema.required('Please select payment method'),
  }),
  fileUrl: yup.string().when('paymentMethod', {
    is: WalletPaymentMethod.Contract,
    then: schema => schema.required('Please upload legal contract file'),
  }),
  ioContractNumber: yup.string().when('paymentMethod', {
    is: WalletPaymentMethod.Contract,
    then: schema =>
      schema
        .required('Please enter contract number')
        .matches(CONTRACT_NO_REGEX, 'please enter a valid contract number')
        .max(20, 'Contract Number must be at most 20 characters'),
  }),
});

export const addPlacementSchema = yup.object().shape({
  name: yup.string().max(256, `Placement name ${CHARACTER_LIMIT.inputMax}`).required('Placement name is required'),
  platformId: yup.string().required('Platform is required'),
  slotType: yup.string().required('Slot Type is required'),
  adSlotIds: yup.array(),
  adSlotItems: yup.array(),
});

export const editPlacementSchema = yup.object().shape({
  name: yup.string().required('Placement name is required'),
  platformId: yup.string().required('Platform is required'),
  adSlotIds: yup.array(),
});

export const globalSettingSchema = yup.object().shape({
  serverName: yup.array().min(1, 'At least one option must be selected').required(),
  timezone: yup.array().min(1, 'At least one option must be selected').required('Please select timezone'),
  language: yup.array().min(1, 'At least one option must be selected').required('Please select language'),
  currency: yup.array().min(1, 'At least one option must be selected').required('Please select currency'),
  location: yup.array().min(1, 'At least one option must be selected').required('Please select location'),
});

export const ipWhitelistingSchema = yup.object().shape({
  ipWhitelisting: yup.string().required('IP whitelisting is required'),
});
const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
export const addServiceTicketSchema = yup.object().shape({
  subject: yup.string().required('Subject is required'),
  details: yup.string().min(20, 'Please enter min 20 char').required('Details is required'),
  file: yup
    .mixed()
    .required('A file is required')
    .test('fileSize', 'File too large', value => value && value.size <= FILE_SIZE)
    .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type)),
});

export const addCohortSchemaV1 = yup.object().shape({
  name: yup.string().max(256, 'Audience name can not exceed 256 characters').required('Cohort name is required'),
  uploadedFileUrl: yup.string().required('Cohort file is required'),
  description: yup.string().max(1000, `Description ${CHARACTER_LIMIT.textAreaMax}`),
  advertiserList: yup
    .array()
    .ensure()
    .when('isOpenToAll', {
      is: false,
      then: schema => schema.min(1, 'Please select at least one advertiser').required('Please select advertiser.'),
    }),
});

export const addCohortSchemaV2 = yup.object().shape({
  cohortName: yup
    .string()
    .max(256, 'Audience name can not exceed 256 characters')
    .required('Audience name is required'),
  description: yup.string().max(1000, `Description ${CHARACTER_LIMIT.textAreaMax}`),
  sourceType: yup.string().required('Source type is required'),

  //Access control validations
  advertiserList: yup
    .array()
    .ensure()
    .when('isOpenToAll', {
      is: false,
      then: schema => schema.min(1, 'Please select at least one advertiser').required('Please select advertiser.'),
    }),

  //CSV source validations
  uploadedFileUrl: yup.string().when('sourceType', {
    is: AudienceType.CSV,
    then: schema => schema.required('Audience file is required'),
  }),

  //Dynamic source validations
  reactflowJson: yup.mixed().when('sourceType', {
    is: AudienceType.DYNAMIC,
    then: schema => schema.required('Conditions are required'),
  }),

  //Combination source type validations
  segment1: yup.string().when('sourceType', {
    is: AudienceType.COMBINATION,
    then: schema => schema.required('Audience 1 is required'),
  }),
  operation: yup.string().when('sourceType', {
    is: AudienceType.COMBINATION,
    then: schema => schema.required('Operation is required'),
  }),
  segment2: yup.string().when('sourceType', {
    is: AudienceType.COMBINATION,
    then: schema => schema.required('Audience 2 is required'),
  }),

  //Schedule validations
  scheduleHours: yup.string().when('sourceType', {
    is: !AudienceType.CSV,
    then: schema => schema.required('Schedule hour is required'),
  }),
  timezone: yup.string().when('sourceType', {
    is: !AudienceType.CSV,
    then: schema => schema.required('Timezone is required'),
  }),
});
export const sourceNodeSchema = yup.object().shape({
  source: yup.mixed().required('source is required'),
  sourceTable: yup.mixed().required('source table is required'),
});
export const filterNodeSchema = yup.object().shape({
  columnName: yup.mixed().required('column name is required'),
  condition: yup.mixed().required('condition name is required'),
  inputValue: yup.mixed().required('Input value for filter is required'),
});

export const addAdUnitSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, 'Must have at least one character')
    .max(256, `Ad unit name ${CHARACTER_LIMIT.inputMax}`)
    .required('Ad unit name is required'),
  platformId: yup.string().required('Platform type is required'),
  slotType: yup.string().oneOf(Object.values(SlotType)).nullable().required('Ad unit type is required.'),
  adWidth: yup.number().when('slotType', {
    is: SlotType.Display,
    then: schema => schema.required('Must input ad size width'),
  }),
  adHeight: yup.number().when('slotType', {
    is: SlotType.Display,
    then: schema => schema.required('Must input ad size height'),
  }),
  pageType: yup.string().nullable().required('Page type is required.'),
  placementIds: yup.array().of(yup.string()),
  placements: yup.array(),
  roadblockEligible: yup.string(),
  advertiserIds: yup.array().of(yup.string()),
  advertisers: yup.array(),
  targetWindow: yup.string().oneOf(['default', 'blank_'], 'Must select one value for target window.'),
  adServeType: yup.string().oneOf(Object.values(AdServeType)),
  floorPrice: yup
    .mixed()
    .test(
      'is-valid-number',
      'Floor price must be a valid number and cannot be less than 0',
      value => value === null || !isNaN(parseFloat(value)),
    )
    .test('greater-than-limit', 'Floor price must be $999 or less', value => parseFloat(value) <= 999),
  preview: yup.string(),
  tileNumber: yup
    .string()
    .when('slotType', {
      is: SlotType.Product,
      then: schema =>
        schema.test(
          'Input Tile validation',
          'Invalid format. Please provide comma-separated values with unique individual numbers',
          val => {
            if (!val) {
              return true;
            }
            const isValid = val.split(',').every((item, index, arr) => {
              if (Number.isNaN(item)) {
                return false;
              }
              const isDecimal = Number(item) - Math.floor(Number(item)) === 0;
              if (!isDecimal) {
                return false;
              }
              if (arr.indexOf(item) !== index) {
                return false;
              }
              return !!item;
            });
            return isValid;
          },
        ),
    })
    .test('tile-num-greater-than-max', 'Invalid tile number input. Cannot be greater than 99.', val => {
      if (!val) {
        return true;
      }
      const isValid = val.split(',').every(item => {
        if (Number.isNaN(item)) {
          return false;
        }
        if (item.length > 2) {
          return false;
        }
        return !!item;
      });
      return isValid;
    }),
});

export const createSharedWalletSchema = yup.object().shape({
  name: yup.string().required('Please enter shared wallet name'),
});
