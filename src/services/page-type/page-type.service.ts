import { FetchResult } from '@apollo/client';
import {
  UpdatePageTypeDocument,
  UpdatePageTypeMutation,
  PageTypeMappingInput,
  PageTypeMappingsDocument,
  PageTypeMappingsQuery,
  PageTypeMappingsQueryVariables,
  PageTypeMappingsWithIdQueryVariables,
  PageTypeMappingsWithIdQuery,
  PageTypeMappingsWithIdDocument,
  PageTypeMappingsByIdDocument,
  PageTypeMappingsByIdQuery,
  PageTypeMappingsByIdQueryVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class PageTypeService {
  async getPageTypeList(
    variables: PageTypeMappingsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<PageTypeMappingsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: PageTypeMappingsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getPageTypeListWithId(
    variables: PageTypeMappingsWithIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<PageTypeMappingsWithIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: PageTypeMappingsWithIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getPageTypeListById(
    variables: PageTypeMappingsByIdQueryVariables,
  ): Promise<PageTypeMappingsByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: PageTypeMappingsByIdDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async updatePageType(id: any, pageTypeMapping: PageTypeMappingInput): Promise<FetchResult<UpdatePageTypeMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdatePageTypeDocument,
        variables: {
          id,
          input: { ...pageTypeMapping },
        },
      });
      return response;
    } catch (err) {
      logger.error('Error while updating campaign');
      logger.error(err);
      throw err;
    }
  }
}
