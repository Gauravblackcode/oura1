import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { deleteCookie, setCookie } from 'cookies-next';
import AuthService from '@/services/auth/auth-service';
import { NextPageWithLayout } from '@/types/common';
import AuthLayout from '@/layouts/auth-layout/auth-layout';
import { ACCESS_TOKEN_COOKIE } from '@/common/constants';
import useAlert from '@/contexts/alert/alert.hook';
import { AlertVariant } from '@/contexts/alert/alert.provider';
import useIsTokenExpired from '@/contexts/isTokenExpired/token-expired.hook';
import { cookiesOptions } from '@/common/helpers';
import SetPasswordForm from '../components/set-password-form.component';

const ResetPassword: NextPageWithLayout = () => {
  const { replace, pathname, query } = useRouter();
  const { showAlert } = useAlert();
  const authService = useMemo(() => new AuthService(), []);
  const accessToken = query.token as string;

  useIsTokenExpired(accessToken, pathname, replace);

  const handleFormSubmit = async (password: string) => {
    try {
      setCookie(ACCESS_TOKEN_COOKIE, accessToken, cookiesOptions);
      await authService.resetPassword({ authRequest: { username: null, password } });
      deleteCookie(ACCESS_TOKEN_COOKIE);
      showAlert('Your password has been reset successfully!', AlertVariant.SUCCESS);
      replace({ pathname, query: { completed: 'true' } });
    } catch (error) {
      //
    }
  };
  return <SetPasswordForm isResetPassword onFormSubmit={handleFormSubmit} />;
};

ResetPassword.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default ResetPassword;
