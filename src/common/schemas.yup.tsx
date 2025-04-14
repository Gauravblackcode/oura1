import * as yup from 'yup';
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

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .max(128, `First name ${CHARACTER_LIMIT.inputMax}`),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(128, `Last name ${CHARACTER_LIMIT.inputMax}`),
  email: yup
    .string()
    .required('Email is required')
    .max(256, `Email ${CHARACTER_LIMIT.inputMax}`)
    .matches(EMAIL_PATTERN, 'Please enter valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(10, 'Password should have at least 10 characters')
    .matches(PASSWORD_PATTERN.hasCapital, 'Please enter at least one uppercase letter')
    .matches(PASSWORD_PATTERN.hasLowercase, 'Please enter at least one lowercase letter')
    .matches(PASSWORD_PATTERN.hasSpecial, 'Please enter at least one special character')
    .matches(PASSWORD_PATTERN.hasNumber, 'Please enter at least one number'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .test('is-valid-date', 'Please enter a valid date', value => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
    .required('Phone number is required'),
  countryCode: yup
    .string()
    .max(5, 'Country code should be at most 5 characters')
    .required('Country code is required'),
  heardAboutUs: yup
    .string()
    .max(256, `How you heard about us ${CHARACTER_LIMIT.inputMax}`),
  usageInterest: yup
    .string()
    .max(256, `Usage interest ${CHARACTER_LIMIT.inputMax}`),
  additionalMessage: yup
    .string()
    .max(1000, `Additional message ${CHARACTER_LIMIT.inputMax}`),
  subscribeToNewsletters: yup
    .boolean()
    .default(false),
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
