"use client";

import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { CarterInput, Typography, ouraColors, CarterCheckbox } from '@/lib/dsl/dsl';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon, Calendar } from 'lucide-react';
import { signupSchema } from '@/common/schemas.yup';
import Button from '@/components/button/button.component';
import AuthService from '@/services/auth/auth-service';
import ROUTES from '@/common/routes';
import styles from '../styles/signup-form.module.scss';
import moment, { Moment } from 'moment';
import DatePicker from '@/components/date-picker/date-picker/date-picker.component';
import { CarterDateRangePicker } from 'shyftlabs-dsl';

const COUNTRY_CODES = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+55', country: 'Brazil' },
  { code: '+7', country: 'Russia' },
];

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  phone: string;
  countryCode: string;
  heardAboutUs: string;
  subscribeToNewsletters: boolean;
  usageInterest: string;
  additionalMessage: string;
  invitationToken?: string;
}

const SignupForm = () => {
  const router = useRouter();
  const authService = useMemo(() => new AuthService(), []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRY_CODES[0].code);

  const { touched, values, errors, handleChange, handleSubmit, setFieldValue } = useFormik<SignupFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      phone: '',
      countryCode: COUNTRY_CODES[0].code,
      heardAboutUs: '',
      subscribeToNewsletters: false,
      usageInterest: '',
      additionalMessage: '',
      invitationToken: router.query.token as string,
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        await authService.singUp({
          payload: {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            phone: `${selectedCountryCode}${values.phone}`,
            dateOfBirth: `${moment(values.dateOfBirth).format('YYYY-MM-DD')}T00:00:00.000Z`,
            countryCode: values.countryCode,
            heardAboutUs: values.heardAboutUs,
            subscribeToNewsletters: values.subscribeToNewsletters,
            usageInterest: values.usageInterest,
            additionalMessage: values.additionalMessage,
            invitationToken: values.invitationToken,
            password: values.password,
            device: {
              locale: navigator.language,
              userAgent: navigator.userAgent,
              platform: (navigator as any)?.userAgentData?.platform || navigator.platform || 'unknown',
              screenResolution: `${window.screen.width}x${window.screen.height}`,
              model: navigator.appName,
              osVersion: navigator.appVersion,
            },
          },
        });
        router.push(ROUTES.AUTH.LOGIN);
      } catch (error) {
        // Handle error
      }
    },
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split('T')[0];
    setFieldValue('dateOfBirth', formattedDate);
  };

  const handleCountryCodeSelect = (code: string) => {
    setSelectedCountryCode(code);
    setFieldValue('countryCode', code);
    setShowCountryCodes(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.row}>
        <div className={styles.formField}>
          <Typography variant="body-regular">First Name</Typography>
          <CarterInput
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            onChange={handleChange}
            error={touched.firstName && !!errors.firstName}
            errorMessage={errors.firstName as string}
          />
        </div>

        <div className={styles.formField}>
          <Typography variant="body-regular">Last Name</Typography>
          <CarterInput
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            onChange={handleChange}
            error={touched.lastName && !!errors.lastName}
            errorMessage={errors.lastName as string}
          />
        </div>
      </div>

      <div className={styles.formField}>
        <Typography variant="body-regular">Email</Typography>
        <CarterInput
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
          error={touched.email && !!errors.email}
          errorMessage={errors.email as string}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formField}>
          <Typography variant="body-regular">Password</Typography>
          <div className={styles.passwordInput}>
            <CarterInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              error={touched.password && !!errors.password}
              errorMessage={errors.password as string}
            />
            <button
              type="button"
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
        </div>

        <div className={styles.formField}>
          <Typography variant="body-regular">Confirm Password</Typography>
          <div className={styles.passwordInput}>
            <CarterInput
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              name="confirmPassword"
              onChange={handleChange}
              error={touched.confirmPassword && !!errors.confirmPassword}
              errorMessage={errors.confirmPassword as string}
            />
            <button
              type="button"
              className={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.formField}>
        <Typography variant="body-regular">Date of Birth</Typography>
        <div className={styles.dateInput}>

          <CarterDateRangePicker
            value={{
              date: moment(values.dateOfBirth)
            }}

            mode='single'
            withTimezone={false}
            timeZone="UTC"

            calendarProps={{
              datePicker: {
                views: ['year', 'month', 'day'],
                shouldDisableTime: () => true,
                format: 'YYYY-MM-DD',
              },
            }}
            onChange={(value) => {
              handleChange({
                target: {
                  name: 'dateOfBirth',
                  value: value.date.format('YYYY-MM-DD')
                }
              });
            }}
          />

        </div>
      </div>

      <div className={styles.formField}>
        <Typography variant="body-regular">Phone Number</Typography>
        <div className={styles.phoneInput}>
          <div className={styles.countryCode}>
            <button
              type="button"
              className={styles.countryCodeButton}
              onClick={() => setShowCountryCodes(!showCountryCodes)}
            >
              {selectedCountryCode}
            </button>
            {showCountryCodes && (
              <div className={styles.countryCodeDropdown}>
                {COUNTRY_CODES.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    className={styles.countryCodeOption}
                    onClick={() => handleCountryCodeSelect(country.code)}
                  >
                    {country.code} {country.country}
                  </button>
                ))}
              </div>
            )}
          </div>
          <CarterInput
            type="text"
            placeholder="Enter your phone number"
            name="phone"
            onChange={handleChange}
            error={touched.phone && !!errors.phone}
            errorMessage={errors.phone as string}
          />
        </div>
      </div>

      {/* <div className={styles.formField}>
        <Typography variant="body-regular">Country Code</Typography>
        <CarterInput
          type="text"
          placeholder="Enter your country code"
          name="countryCode"
          onChange={handleChange}
          error={touched.countryCode && !!errors.countryCode}
          errorMessage={errors.countryCode as string}
        />
      </div> */}

      <div className={styles.formField}>
        <Typography variant="body-regular">How did you hear about us?</Typography>
        <CarterInput
          type="text"
          placeholder="Tell us how you found us"
          name="heardAboutUs"
          onChange={handleChange}
          error={touched.heardAboutUs && !!errors.heardAboutUs}
          errorMessage={errors.heardAboutUs as string}
        />
      </div>

      <div className={styles.formField}>
        <Typography variant="body-regular">What are you interested in using our platform for?</Typography>
        <CarterInput
          type="text"
          placeholder="Tell us about your interests"
          name="usageInterest"
          onChange={handleChange}
          error={touched.usageInterest && !!errors.usageInterest}
          errorMessage={errors.usageInterest as string}
        />
      </div>

      <div className={styles.formField}>
        <Typography variant="body-regular">Additional Message</Typography>
        <CarterInput
          type="text"
          placeholder="Any additional information you'd like to share"
          name="additionalMessage"
          onChange={handleChange}
          error={touched.additionalMessage && !!errors.additionalMessage}
          errorMessage={errors.additionalMessage as string}
        />
      </div>

      <div className={styles.formField}>
        <CarterCheckbox
          label="Subscribe to newsletters"
          id="newsletter"
          variant="DEFAULT"
          onChange={() => handleChange({ target: { name: 'subscribeToNewsletters', value: !values.subscribeToNewsletters } })}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Button
          type="submit"
          variant="primary"
          title="Sign Up"
          className={styles.signupButton}
        />
      </div>


    </form>
  );
};

export default SignupForm; 