import { ApolloQueryResult, FetchResult } from '@apollo/client';
import {
  AdvertisersDocument,
  CreateAdvertiserDocument,
  UpdateAdvertiserDocument,
  AdvertiserByIdDocument,
  AdvertisersQuery,
  AdvertiserByIdQuery,
  CreateAdvertiserMutation,
  UpdateAdvertiserMutation,
  AdvertisersQueryVariables,
  UpdateAdvertiserStatusMutation,
  UpdateAdvertiserStatusDocument,
  Advertiser,
  AdvertiserByIdsQuery,
  AdvertiserByIdsDocument,
  AdvertiserNameQueryVariables,
  AdvertiserNameQuery,
  AdvertiserListQueryVariables,
  AdvertiserListQuery,
  AdvertiserListDocument,
  AdvertiserNameDocument,
  CreateAdvertiserMutationVariables,
  UpdateAdvertiserMutationVariables,
} from 'types';
import logger from '@/common/logger';
import GRAPHQL_CLIENT from '@/services/network/graphql.service';
import { AdvanceApolloContext } from '@/index';

export default class AdvertiserService {
  async getAllAdvertisers(
    variables: AdvertisersQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ApolloQueryResult<AdvertisersQuery>> {
    const { pageSize, page, filters, sort } = variables;
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdvertisersDocument,
        variables: {
          page: page || 1,
          pageSize: pageSize || 10,
          filters,
          sort,
        },
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching advertisers', err);
      throw err;
    }
  }

  async getAdvertisersList(
    variables: AdvertiserNameQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<AdvertiserNameQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdvertiserNameDocument,
        variables,
        context,
      });
      return response.data;
    } catch (err) {
      logger.error('Error while fetching advertisers', err);
      return undefined;
    }
  }

  async getRestrictedAdvertisersList(
    variables: AdvertiserListQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<AdvertiserListQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdvertiserListDocument,
        variables,
        context,
      });
      return response.data;
    } catch (err) {
      logger.error('Error while fetching advertisers', err);
      return undefined;
    }
  }

  async getAdvertiserById(id: string): Promise<AdvertiserByIdQuery> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdvertiserByIdDocument,
        variables: {
          id,
        },
      });
      return response.data;
    } catch (err) {
      logger.error('Error while fetching single advertiser', err);
      throw err;
    }
  }

  async getAdvertisersByIds(ids: string[]): Promise<FetchResult<AdvertiserByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdvertiserByIdsDocument,
        variables: {
          ids,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching advertisers', error);
      throw error;
    }
  }

  async createAdvertiser(variables: CreateAdvertiserMutationVariables): Promise<FetchResult<CreateAdvertiserMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateAdvertiserDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while creating a new advertiser', error);
      throw error;
    }
  }

  async updateAdvertiser(variables: UpdateAdvertiserMutationVariables): Promise<FetchResult<UpdateAdvertiserMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAdvertiserDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error: Failed to update advertiser', error);
      throw error;
    }
  }

  async updateAdvertiserStatus(id: string, status: string): Promise<FetchResult<UpdateAdvertiserStatusMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAdvertiserStatusDocument,
        variables: {
          id,
          status,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error: Failed to update advertiser status', error);
      throw error;
    }
  }

  async multiStatusChangeAdvertiserById(advertisers: Advertiser[], status: string): Promise<Record<string, any>> {
    try {
      const requests = advertisers.map((el: any) =>
        GRAPHQL_CLIENT.mutate({
          mutation: UpdateAdvertiserStatusDocument,
          variables: {
            id: el.id,
            status,
          },
        }),
      );
      await Promise.all(requests);
      return { msg: 'Status Updated Successfully' };
    } catch (error) {
      logger.error('Error: Failed to update advertiser status', error);
      throw error;
    }
  }
}
