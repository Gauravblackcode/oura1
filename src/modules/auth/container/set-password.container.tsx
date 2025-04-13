import { useRouter } from 'next/router';
import { deleteCookie, setCookie } from 'cookies-next';
import { useMemo } from 'react';
import { ACCESS_TOKEN_COOKIE } from '@/common/constants';
import useAlert from '@/contexts/alert/alert.hook';
import { NextPageWithLayout } from '@/types/common';
import AuthLayout from '@/layouts/auth-layout/auth-layout';
import AuthService from '@/services/auth/auth-service';
import { AlertVariant } from '@/contexts/alert/alert.provider';
import useIsTokenExpired from '@/contexts/isTokenExpired/token-expired.hook';
import { cookiesOptions } from '@/common/helpers';
import SetPasswordForm from '../components/set-password-form.component';

const SetPassword: NextPageWithLayout = () => {
  const { replace, pathname, query } = useRouter();
  const { showAlert } = useAlert();
  const authService = useMemo(() => new AuthService(), []);

  const accessToken = query?.token;

  useIsTokenExpired(accessToken as string, pathname, replace);

  const handleFormSubmit = async (password: string) => {
    try {
      setCookie(ACCESS_TOKEN_COOKIE, accessToken, cookiesOptions);
      await authService.resetPassword({ authRequest: { username: null, password } });
      deleteCookie(ACCESS_TOKEN_COOKIE);
      showAlert('Your password has been set successfully!', AlertVariant.SUCCESS);
      replace({ pathname, query: { completed: 'true' } });
    } catch (error) {
      //
    }
  };
  return <SetPasswordForm onFormSubmit={handleFormSubmit} />;
};

SetPassword.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default SetPassword;
