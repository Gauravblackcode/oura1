import { DemographicsDocument, DemographicsQuery, DemographicsQueryVariables } from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class DemographicService {
  async getDemographics(
    variables: DemographicsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<DemographicsQuery> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DemographicsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
