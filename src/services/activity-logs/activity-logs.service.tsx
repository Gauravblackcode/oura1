import { ActivityLogsDocument, ActivityLogsQuery, ActivityLogsQueryVariables } from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class ActivityLogService {
  async getAllActivities(
    variables: ActivityLogsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ActivityLogsQuery> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ActivityLogsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (err) {
      logger.error('Error while fetching activity logs');
      logger.error(err);
      throw err;
    }
  }
}
