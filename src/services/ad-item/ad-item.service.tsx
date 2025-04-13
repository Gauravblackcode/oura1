import { FetchResult } from '@apollo/client';
import {
  AdItemAdTagTargetingPerformanceByIdDocument,
  AdItemAdTagTargetingPerformanceByIdQuery,
  AdItemAdTagTargetingPerformanceByIdQueryVariables,
  AdItemByIdDocument,
  AdItemByIdQuery,
  AdItemByIdQueryVariables,
  AdItemKeywordTargetingPerformanceByIdDocument,
  AdItemKeywordTargetingPerformanceByIdQuery,
  AdItemKeywordTargetingPerformanceByIdQueryVariables,
  AdItemPageCategoryTargetingPerformanceByIdDocument,
  AdItemPageCategoryTargetingPerformanceByIdQuery,
  AdItemPageCategoryTargetingPerformanceByIdQueryVariables,
  AdItemsByIdsDocument,
  AdItemsByIdsQuery,
  AdItemsDocument,
  AdItemsQuery,
  AdItemsQueryVariables,
  ApplyAdItemBidSuggestionDocument,
  ApplyAdItemBidSuggestionMutation,
  ApplyAdItemBidSuggestionMutationVariables,
  CopyAdItemDocument,
  CopyAdItemMutation,
  CopyAdItemMutationVariables,
  CreateAdItemDocument,
  CreateAdItemMutation,
  CreateAdItemMutationVariables,
  GetAdItemInsightByIdDocument,
  GetAdItemInsightByIdQuery,
  GetAdItemInsightByIdQueryVariables,
  UpdateAdItemDocument,
  UpdateAdItemMutation,
  UpdateAdItemMutationVariables,
  UpdateAdItemStatusDocument,
  UpdateAdItemStatusMutation,
  UpdateAdItemStatusMutationVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class AdItemService {
  async getAdItems(
    variables: AdItemsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<AdItemsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdItemsDocument,
        variables,
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching ad-items');
      logger.error(err);
      throw err;
    }
  }

  async getAdItemById(
    variables: AdItemByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<AdItemByIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdItemByIdDocument,
        variables,
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching ad-item by id');
      logger.error(err);
      throw err;
    }
  }

  async getAdItemsByIds(ids: string[]): Promise<FetchResult<AdItemsByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdItemsByIdsDocument,
        variables: {
          ids,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching ad-item by id');
      logger.error(error);
      throw error;
    }
  }

  async getAdItemsInsightsByIds(
    variables: GetAdItemInsightByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<GetAdItemInsightByIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetAdItemInsightByIdDocument,
        variables,
        context,
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching ad-item insights by id');
      logger.error(error);
      throw error;
    }
  }

  async createAdItem(variables: CreateAdItemMutationVariables): Promise<FetchResult<CreateAdItemMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateAdItemDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while creating ad-item');
      logger.error(error);
      throw error;
    }
  }

  async updateAdItem(variables: UpdateAdItemMutationVariables): Promise<FetchResult<UpdateAdItemMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAdItemDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while updating ad-item');
      logger.error(error);
      throw error;
    }
  }

  async updateAdItemStatus(
    variables: UpdateAdItemStatusMutationVariables,
  ): Promise<FetchResult<UpdateAdItemStatusMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAdItemStatusDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while suspending Ad Item');
      logger.error(error);
      throw error;
    }
  }

  async updateMultipleAdItemStatus(
    campaigns: UpdateAdItemStatusMutationVariables[],
  ): Promise<FetchResult<UpdateAdItemStatusMutation>[]> {
    try {
      const APIcalls = campaigns.map(variables => this.updateAdItemStatus(variables));
      const response = await Promise.all(APIcalls);
      return response;
    } catch (error) {
      logger.error('Error while suspending Ad Item');
      logger.error(error);
      throw error;
    }
  }

  async duplicateAdItem(variables: CopyAdItemMutationVariables): Promise<FetchResult<CopyAdItemMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CopyAdItemDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while creating ad-item');
      logger.error(error);
      throw error;
    }
  }

  async getCategoryTargetingPerformanceById(
    variables: AdItemPageCategoryTargetingPerformanceByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<AdItemPageCategoryTargetingPerformanceByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdItemPageCategoryTargetingPerformanceByIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getKeywordTargetingPerformanceById(
    variables: AdItemKeywordTargetingPerformanceByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<AdItemKeywordTargetingPerformanceByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdItemKeywordTargetingPerformanceByIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getAdTagTargetingPerformanceById(
    variables: AdItemAdTagTargetingPerformanceByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<AdItemAdTagTargetingPerformanceByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdItemAdTagTargetingPerformanceByIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async applyAdItemBidSuggestion(
    variables?: ApplyAdItemBidSuggestionMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<ApplyAdItemBidSuggestionMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: ApplyAdItemBidSuggestionDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while updating insights bid suggestion');
      logger.error(error);
      throw error;
    }
  }
}
