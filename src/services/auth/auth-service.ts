import { setCookie } from 'cookies-next';
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  LogoutDocument,
  LogoutQuery,
  LogoutQueryVariables,
  ResetPasswordDocument,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from 'types';
import { ACCESS_TOKEN_COOKIE } from '@/common/constants';
import logger from '@/common/logger';
import { cookiesOptions } from '@/common/helpers';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class AuthService {
  async manualLogin(variables: LoginMutationVariables): Promise<LoginMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: LoginDocument,
        variables,
      });
      const accessToken = response.data?.login?.token;
      if (accessToken) {
        setCookie(ACCESS_TOKEN_COOKIE, accessToken, cookiesOptions);
      }
      return response.data;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async forgotPassword(variables: ForgotPasswordMutationVariables): Promise<ForgotPasswordMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: ForgotPasswordDocument,
        variables,
      });

      return response.data;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async resetPassword(variables: ResetPasswordMutationVariables): Promise<ResetPasswordMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: ResetPasswordDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async manualLogout(variables: LogoutQueryVariables): Promise<LogoutQuery | undefined> {
    try {
      // TODO: Remove All Locally stored data
      const response = await GRAPHQL_CLIENT.query({
        query: LogoutDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}
