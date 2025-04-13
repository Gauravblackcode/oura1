import {
  PlatformSearchResultByTextDocument,
  PlatformSearchResultByTextQuery,
  PlatformSearchResultByTextQueryVariables,
} from 'types';
import GRAPHQL_CLIENT from '@/services/network/graphql.service';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';

export default class SearchService {
  async getSearchResults(
    variables: PlatformSearchResultByTextQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<PlatformSearchResultByTextQuery | undefined> {
    try {
      const res = await GRAPHQL_CLIENT.query({
        query: PlatformSearchResultByTextDocument,
        variables,
        context,
      });
      return res.data;
    } catch (err) {
      logger.error('Error while fetching search results');
      logger.error(err);
      return undefined;
    }
  }
}
