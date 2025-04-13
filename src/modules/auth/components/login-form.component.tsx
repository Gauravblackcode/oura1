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
  rememberMe: boolean;
}

const LoginForm = () => {
  const { replace } = useRouter();
  const authService = useMemo(() => new AuthService(), []);
  const [isVisible, setIsVisible] = useState(false);
  const { touched, values, errors, handleChange, setFieldValue, handleSubmit } = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (authRequest: LoginFormValues) => {
      try {
        await authService.manualLogin({ authRequest });
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
          <CarterCheckbox
            label="Remember Me"
            id="remember-me"
            variant="DEFAULT"
            onChange={() => setFieldValue('rememberMe', !values.rememberMe)}
          />
          <Link href={ROUTES.AUTH.FORGOT_PASSWORD} color={ouraColors['links-blue']}>
            <Typography color={ouraColors['links-blue']} variant="subtitle-medium">
              Forgot Password?
            </Typography>
          </Link>
        </div>
      </div>
      <div className={styles.formField}></div>
      <Button title="Log in" variant="primary" type="submit" className={styles.submit_button} />
    </form>
  );
};

export default LoginForm;
