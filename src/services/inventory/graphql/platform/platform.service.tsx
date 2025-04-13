import { FetchResult } from '@apollo/client';
import { GetPlatformsDocument, PlatformResponse, PlatformsByIdsDocument, PlatformsByIdsQuery } from 'types';
import logger from '@/common/logger';
import GRAPHQL_CLIENT from '@/services/network/graphql.service';
import { AdvanceApolloContext } from '@/index';

export default class PlatformService {
  async getPlatforms(context?: AdvanceApolloContext): Promise<PlatformResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetPlatformsDocument,
        context,
      });
      return response.data.platforms;
    } catch (error) {
      logger.error('Error fetching platforms', error);
      throw error;
    }
  }

  async getPlatformsByIds(ids: string[]): Promise<FetchResult<PlatformsByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: PlatformsByIdsDocument,
        variables: {
          ids,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error fetching platforms', error);
      throw error;
    }
  }
}
