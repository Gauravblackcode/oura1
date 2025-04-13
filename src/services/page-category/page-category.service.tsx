import { FetchResult } from '@apollo/client';
import { PageCategoriesDocument, PageCategoriesQuery, PageCategoriesQueryVariables } from 'types';
import { AdvanceApolloContext } from '@/index';
import logger from '@/common/logger';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class PageCategoryService {
  async getPageCategories(
    variables: PageCategoriesQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<PageCategoriesQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: PageCategoriesDocument,
        variables,
        context,
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
