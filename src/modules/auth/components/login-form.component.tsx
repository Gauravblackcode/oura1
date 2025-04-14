import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { CarterCheckbox, ouraColors, CarterInput, Typography } from '@/lib/dsl/dsl';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { loginSchema } from '@/common/schemas.yup';
import Button from '@/components/button/button.component';
import AuthService from '@/services/auth/auth-service';
import ROUTES from '@/common/routes';
import styles from '../styles/login-form.module.scss';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { replace } = useRouter();
  const authService = useMemo(() => new AuthService(), []);
  const [isVisible, setIsVisible] = useState(false);
  const { touched, values, errors, handleChange, setFieldValue, handleSubmit } = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (authRequest: LoginFormValues) => {
      try {
        await authService.manualLogin({
          payload: {
            username: authRequest.username,
            password: authRequest.password,
            device: {
              locale: navigator.language,
              userAgent: navigator.userAgent,
              platform: (navigator as any)?.userAgentData?.platform || navigator.platform || 'unknown',
              screenResolution: `${window.screen.width}x${window.screen.height}`,
              model: navigator.appName,
              osVersion: navigator.appVersion,
            },
        }});
        replace(ROUTES.DASHBOARD);
      } catch (error) {
        //
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.formField}>
        <Typography variant="body-regular">Email</Typography>
        <CarterInput
          type="text"
          placeholder="Enter your Email"
          name="username"
          onChange={handleChange}
          error={touched.username && !!errors.username}
          errorMessage={errors.username as string}
        />
      </div>
      <div className={styles.formField}>
        <div className={styles.passwordLabel}>
          <Typography variant="body-regular">Password</Typography>
        </div>
        <CarterInput
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
          data-testid="password-input"
          iconProps={{
            end: [
              {
                onAction: () => setIsVisible(!isVisible),
                icon: isVisible ? <EyeIcon /> : <EyeOffIcon />,
              },
            ],
          }}
          error={touched.password && !!errors.password}
          errorMessage={errors.password as string}
          type={isVisible ? 'text' : 'password'}
        />
        <div className={styles.passwordLabel}>
          {/* <CarterCheckbox
            label="Remember Me"
            id="remember-me"
            variant="DEFAULT"
            onChange={() => setFieldValue('rememberMe', !values.rememberMe)}
          /> */}
          <div className={styles.loginLinks}>
            {/* <Link href={""} color={ouraColors['links-blue']}>
              <Typography color={ouraColors['links-blue']} variant="subtitle-medium">
                Forgot Password?
              </Typography>
            </Link> */}
            <Link href="/auth/signup" color={ouraColors['links-blue']}>
              <Typography color={ouraColors['links-blue']} variant="subtitle-medium">
                New user? Sign up
              </Typography>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.formField}></div>
      <Button title="Log in" variant="primary" type="submit" className={styles.submit_button} />
    </form>
  );
};

export default LoginForm;
