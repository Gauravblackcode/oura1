import { TimezonesDocument, TimezonesQuery, TimezonesQueryVariables } from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class TimezoneService {
  async getTimezones(
    variables: TimezonesQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<TimezonesQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: TimezonesDocument,
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
