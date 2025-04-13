import {
  AutoFillFeedbackDocument,
  AutoFillFeedbackMutation,
  AutoFillFeedbackMutationVariables,
  Maybe,
  ProductAutoFillByIdsDocument,
  ProductAutoFillByIdsQuery,
  ProductAutoFillByIdsQueryVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class TargetingAutoFillService {
  async getAutofillFields(
    variables: ProductAutoFillByIdsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ProductAutoFillByIdsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ProductAutoFillByIdsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async submitFeedback(
    variables: AutoFillFeedbackMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<Maybe<AutoFillFeedbackMutation> | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: AutoFillFeedbackDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}
