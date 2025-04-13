import {
  VideoPerformanceByAdItemIdDocument,
  VideoPerformanceByAdItemIdQuery,
  VideoPerformanceByAdItemIdQueryVariables,
} from 'types';
import { ApolloQueryResult } from '@apollo/client';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class VideoPerformanceService {
  async getPerformanceByAdItemId(
    variables: VideoPerformanceByAdItemIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ApolloQueryResult<VideoPerformanceByAdItemIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: VideoPerformanceByAdItemIdDocument,
        variables,
        context,
      });
      return response;
    } catch (error) {
      logger.error('Error while creating variable');
      logger.error(error);
      throw error;
    }
  }
}
