import {
  AccountByIdDocument,
  AccountByIdQuery,
  AccountByIdQueryVariables,
  UpdateAccountDocument,
  UpdateAccountMutation,
  UpdateAccountMutationVariables,
} from 'types';
import logger from '@/common/logger';
import GRAPHQL_CLIENT from '@/services/network/graphql.service';

export default class AccountService {
  async getAccountById(variables: AccountByIdQueryVariables): Promise<AccountByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AccountByIdDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async updateAccountById(
    variables: UpdateAccountMutationVariables,
  ): Promise<UpdateAccountMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAccountDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}
