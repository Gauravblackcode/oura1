import { NextRouter } from 'next/router';
import { ValidationError } from 'yup';
import { OptionsType } from 'cookies-next';
import { Moment } from 'moment';
import DateTimeParser, { DateTimeType } from '@/lib/date-time-parser';
import environments from './environments';
import { PaginationDto, SortDto, SortOrder   } from 'types';

/**
 * Default cookie options for the application
 */
export const cookiesOptions: OptionsType = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

export const pxToCh = (valueRef: HTMLDivElement | null) => {
  if (valueRef) {
    const computedWidth = valueRef?.offsetWidth;
    const computedStyle = window.getComputedStyle(valueRef);
    const textSize = computedStyle.fontSize;
    const chWidth = parseFloat(textSize) * 0.5;
    return computedWidth / chWidth;
  }
};

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const getLastActiveInfo = (timestamp: string, format: string = 'YYYY-MM-DDTHH:mm:ss') => {
  if (!timestamp) {
    return '-';
  }
  const currentTimestamp = DateTimeParser();
  const inputTimestamp = DateTimeParser(timestamp, format);
  const diffMins = Math.abs(currentTimestamp.diff(inputTimestamp, 'minutes'));
  const diffHrs = Math.abs(currentTimestamp.diff(inputTimestamp, 'hours'));
  const diffDays = Math.abs(currentTimestamp.diff(inputTimestamp, 'days'));
  const diffMonths = Math.abs(currentTimestamp.diff(inputTimestamp, 'months'));
  if (diffHrs < 1) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  }
  if (diffDays < 1) {
    return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  }
  if (diffMonths < 1) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
};

type TNumericConfig = {
  append?: '$' | string;
  defaultValue?: string;
  shorten?: boolean;
  trimTo?: number;
  includeZero?: boolean;
  forceTrim?: boolean;
  appendPosition?: 'start' | 'end';
};

const defaultNumericConfig: TNumericConfig = {
  appendPosition: 'start',
  defaultValue: '--',
  includeZero: false,
};

const formatWithDecimals = (num: number, decimals: number) => {
  const fixed = num.toFixed(decimals);
  return fixed.replace(/(\.\d*?)00+$/, '$1').replace(/\.$/, '');
};

export const formatNumberWithSuffix = (value: string | number, trimTo: number = 2) => {
  const numValue = Number(value);

  if (isNaN(numValue)) return '';

  let formattedString;
  if (numValue > 1e9) {
    formattedString = `${formatWithDecimals(
      Math.floor((numValue / 1e9) * Math.pow(10, trimTo)) / Math.pow(10, trimTo),
      trimTo,
    )}B`;
  } else if (numValue > 1e6) {
    formattedString = `${formatWithDecimals(
      Math.floor((numValue / 1e6) * Math.pow(10, trimTo)) / Math.pow(10, trimTo),
      trimTo,
    )}M`;
  } else if (numValue > 1e3) {
    formattedString = `${formatWithDecimals(
      Math.floor((numValue / 1e3) * Math.pow(10, trimTo)) / Math.pow(10, trimTo),
      trimTo,
    )}K`;
  } else {
    formattedString = `${formatWithDecimals(numValue, trimTo)}`;
  }
  return formattedString;
};

export const numericHelper = (value: number | string = '', config: TNumericConfig = defaultNumericConfig) => {
  if (isNaN(Number(value))) {
    return '--';
  }
  const allConfigs = { ...defaultNumericConfig, ...config };
  const { append, appendPosition, defaultValue, shorten, trimTo, includeZero, forceTrim } = allConfigs;
  if (!value && !includeZero) {
    return defaultValue ?? '--';
  }
  let formattedString = `${Intl.NumberFormat().format(Number(value))}`;
  if (shorten && Number(value) > 1e3) {
    formattedString = formatNumberWithSuffix(value, trimTo);
  }
  if (trimTo) {
    if (!shorten) {
      formattedString = `${parseFloat(
        Number(value)
          .toFixed(trimTo)
          .replace(/\.?0+$/, ''),
      )}`;
    } else if (shorten && Number(value) > 1e3 && forceTrim) {
      const shortenType = formattedString[formattedString.length - 1];
      formattedString = `${parseFloat(
        Number(formattedString.slice(0, -1))
          .toFixed(trimTo)
          .replace(/\.?0+$/, ''),
      )}${shortenType}`;
    }
  }
  if (append) {
    formattedString = appendPosition === 'start' ? `${append}${formattedString}` : `${formattedString}${append}`;
  }
  return formattedString;
};

export const getFiltersFromQuery = (
  paramKeys: {
    key: string;
    defaultValue?: string | number | boolean | Date;
    isMultiple?: boolean;
  }[],
  router: any,
) => {
  const output: any = {};
  if (!router.query) return {} as any;

  paramKeys.forEach(({ key, defaultValue, isMultiple }) => {
    if (typeof router.query?.[key] === 'string' && router.query?.[key].trim()) {
      output[key] = router.query?.[key];
      if (isMultiple) {
        output[key] = JSON.parse(decodeURIComponent(output[key]));
      }
    } else if (defaultValue) {
      output[key] = defaultValue;
    }
  });

  return output;
};

export const updateMultiQueryParam = (queries: { [key: string]: string | undefined }, router: NextRouter) => {
  if (!router) return;
  Object.entries(queries).forEach(([key, value]) => {
    if (!value) {
      delete router.query[key];
    } else {
      router.query[key] = value;
    }
  });
  router.push({ pathname: router.pathname, query: router.query });
};

export const onPaginationChange = (
  router: any,
  data: {
    pageNo?: number | string;
    pageSize?: number | string;
    by?: number | string;
    type?: number | string;
  },
) => {
  if (!router) return;
  const { pageNo, pageSize, by, type } = data;
  if (pageNo) router.query.pageNo = pageNo;
  if (pageSize) router.query.pageSize = pageSize;
  if (by) router.query.sortBy = by;
  if (type) router.query.sortType = type;
  router.push({ pathname: router.pathname, query: router.query });
};

export const updateQueryParamMultiple = (
  router: any,
  data: {
    [key: string]: string | number | boolean | null | undefined;
  },
) => {
  Object.entries(data).forEach(([key, value]) => {
    if (!value) {
      delete router.query[key];
    } else {
      router.query[key] = value;
    }
  });
  router.push({ pathname: router.pathname, query: router.query });
};

export const convertToTitleCase = (inputString: string) => {
  if (inputString && inputString !== null && inputString !== undefined) {
    const words = inputString.toString()?.split('_');
    const titleCaseWords: string[] = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const titleCaseString: string = titleCaseWords.join(' ');
    return titleCaseString;
  } else {
    return `${inputString}`;
  }
};

export const cleanObject = (obj: Record<string, any> | any): Record<string, any> => JSON.parse(JSON.stringify(obj));

export const convertArrayToObject = (arr: []) => {
  const result: any = {};
  if (Array.isArray(arr) && arr.length)
    arr.forEach((element: any) => {
      result[element.permissionType] = element.accessLevel;
    });
  return result;
};

export const truncateString = (inputString: any, truncateTo: number = 30) => {
  if (inputString === undefined || inputString === null) return inputString;
  if (inputString?.length <= truncateTo) {
    return inputString;
  } else {
    return `${inputString?.slice(0, truncateTo)}...`;
  }
};

export const adSizeDisplay = (inputString: string) => {
  if (inputString === undefined || inputString === null) return '--';
  return inputString.split('x').join(' x ');
};

export const toTitleCase = (str: string) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const fundType = {
  debit: 'DEBIT',
  credit: 'CREDIT',
};

export const parseFileName = (fileURLString: string = '') => {
  if (!fileURLString) return '';
  const url = new URL(fileURLString);
  const pathname = url.pathname;
  const filename = pathname.split('/').pop();
  return filename || '';
};

export const isValidAssetURL = (url: string = '') => url.startsWith('https://') || url.startsWith('http://');

export const getFirstWordAfterSlash = (path: string) => {
  const parts = path.split('/');
  return parts[1] || '';
};

export const base64ToBytes = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const bytesToBase64 = (bytes: Uint8Array): string => {
  return btoa(String.fromCharCode(...Array.from(bytes)));
};

export const getFileExtension = (fileName: string): string | undefined => {
  return fileName.split('.').pop();
};

export const getMediaFileValidations = (
  selectedFile: File,
  validations: { maxFileSize?: number; acceptedExtensions?: string[] },
) => {
  const { maxFileSize, acceptedExtensions } = validations;
  const fileExtension = getFileExtension(selectedFile.name);
  const errors: string[] = [];

  if (maxFileSize && selectedFile.size > maxFileSize) {
    errors.push(`File size should be less than ${mediaSizeFromBytes(maxFileSize)}`);
  }

  if (acceptedExtensions && fileExtension && !acceptedExtensions.includes(fileExtension.toLowerCase())) {
    errors.push(`File type should be one of: ${acceptedExtensions.join(', ')}`);
  }

  return errors;
};

export const mediaSizeFromBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getCompletedRemainingDays = (input: { startDate: any; endDate: any }) => {
  if (input.startDate && input.endDate) {
    const today = DateTimeParser();
    const startDate = DateTimeParser(input.startDate);
    const endDate = DateTimeParser(input.endDate);
    const difference = Math.max(Math.ceil(endDate.diff(startDate, 'hours') / 24), 1);

    const daysCompleted = today.isBefore(endDate) ? today.diff(startDate, 'days') : difference;
    return {
      difference,
      completed: daysCompleted,
      diffType: 'days',
    };
  }
  return {
    difference: 0,
    completed: 0,
    diffType: 'days',
  };
};

export const triggerDownloadByURL = (url: string, fileName?: string) => {
  const link = document.createElement('a');
  link.href = url;
  if (fileName) link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const transformYupErrorsIntoObject = (errors: ValidationError): Record<string, string> => {
  const errorObject: Record<string, string> = {};
  errors.inner.forEach(error => {
    if (error.path) {
      errorObject[error.path] = error.message;
    }
  });
  return errorObject;
};

export const isDeepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isDeepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
};

export const windowRedirection = (redirectUrl?: string) => {
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
};

type TIsDateRangeAllowedOptions = {
  startDate: DateTimeType;
  endDate: DateTimeType;
  maxAllowedRange?: number;
};

export const isDateRangeAllowed = (options: TIsDateRangeAllowedOptions): boolean => {
  const { startDate, endDate, maxAllowedRange = 365 } = options;
  const diffInDays = Math.abs(DateTimeParser(endDate).diff(DateTimeParser(startDate), 'days'));
  return diffInDays <= maxAllowedRange;
};

type UnitConfig = {
  get: keyof Pick<Moment, 'seconds' | 'minutes' | 'hours'>;
  round: number;
  reset: string[];
};

type Units = {
  [key in 'minute' | 'hour' | 'day']: UnitConfig;
};

export const roundToUnit = (
  date: Moment | string,
  timezone: string,
  format: string,
  unit: 'minute' | 'hour' | 'day',
): string => {
  const units: Units = {
    minute: {
      get: 'seconds',
      round: 60,
      reset: ['milliseconds'],
    },
    hour: {
      get: 'minutes',
      round: 60,
      reset: ['milliseconds', 'seconds'],
    },
    day: {
      get: 'hours',
      round: 24,
      reset: ['milliseconds', 'seconds', 'minutes'],
    },
  };

  const currentUnit = units[unit];
  const dateObj = typeof date === 'string' ? DateTimeParser(date, format) : date;
  
  currentUnit.reset.forEach(resetUnit => {
    dateObj.set(resetUnit as any, 0);
  });

  const value = dateObj.get(currentUnit.get);
  const roundedValue = Math.floor(value / currentUnit.round) * currentUnit.round;
  dateObj.set(currentUnit.get, roundedValue);

  return dateObj.format(format);
};

export const isLastSecond = (timestamp: string | DateTimeType): boolean => {
  if (!timestamp) return false;
  const date = DateTimeParser(timestamp);
  return date.seconds() === 59;
};

export const formatNumber = (value: any) => {
  if (isNaN(value)) return '--';
  return Intl.NumberFormat().format(Number(value));
};

export const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null) return '--';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};


export const DefaultPagination: PaginationDto = {
  pageNo: 1,
  pageSize: 10,
};

export const DefaultSort: SortDto = {
  field: 'createdAt',
  order: SortOrder.Desc,
};

