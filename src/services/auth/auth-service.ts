import { setCookie } from 'cookies-next';
import { ACCESS_TOKEN_COOKIE } from '@/common/constants';
import logger from '@/common/logger';
import { cookiesOptions } from '@/common/helpers';
import GRAPHQL_CLIENT from '../network/graphql.service';
import { LoginDocument, LoginMutationVariables, SignupDocument, SignupMutationVariables } from 'types';

export default class AuthService {
  async singUp(variables: SignupMutationVariables): Promise<any | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: SignupDocument,
        variables,
      });
      const accessToken = response.data?.signup;
      if (accessToken) {
        setCookie(ACCESS_TOKEN_COOKIE, accessToken, cookiesOptions);
      }
      return response.data;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
  async manualLogin(variables: LoginMutationVariables): Promise<any | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: LoginDocument,
        variables,
      });
      const accessToken = response.data?.login?.accessToken;
      if (accessToken) {
        setCookie(ACCESS_TOKEN_COOKIE, accessToken, cookiesOptions);
      }
      return response.data;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  // async forgotPassword(variables: ForgotPasswordMutationVariables): Promise<ForgotPasswordMutation | null | undefined> {
  //   try {
  //     const response = await GRAPHQL_CLIENT.mutate({
  //       mutation: ForgotPasswordDocument,
  //       variables,
  //     });

  //     return response.data;
  //   } catch (error) {
  //     logger.error(error);
  //     throw error;
  //   }
  // }

  // async resetPassword(variables: ResetPasswordMutationVariables): Promise<ResetPasswordMutation | null | undefined> {
  //   try {
  //     const response = await GRAPHQL_CLIENT.mutate({
  //       mutation: ResetPasswordDocument,
  //       variables,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     logger.error(error);
  //     throw error;
  //   }
  // }

  // async manualLogout(variables: LogoutQueryVariables): Promise<LogoutQuery | undefined> {
  //   try {
  //     // TODO: Remove All Locally stored data
  //     const response = await GRAPHQL_CLIENT.query({
  //       query: LogoutDocument,
  //       variables,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     logger.error(error);
  //     return undefined;
  //   }
  // }

}
