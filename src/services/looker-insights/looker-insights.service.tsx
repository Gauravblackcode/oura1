import {
  GetInsightDashboardSignedUrlDocument,
  GetInsightDashboardSignedUrlQuery,
  GetInsightDashboardSignedUrlQueryVariables,
  InsightDashboardsDocument,
  InsightDashboardsQuery,
  InsightDashboardsQueryVariables,
} from 'types';
import { FetchResult } from '@apollo/client';
import GRAPHQL_CLIENT from '@/services/network/graphql.service';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';

export default class LookerInsightService {
  async getInsightDashboards(
    variables: InsightDashboardsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<InsightDashboardsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: InsightDashboardsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getInsightDashboardSignedUrl(
    variables: GetInsightDashboardSignedUrlQueryVariables,
  ): Promise<FetchResult<GetInsightDashboardSignedUrlQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetInsightDashboardSignedUrlDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
