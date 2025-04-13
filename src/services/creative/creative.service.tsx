import { FetchResult } from '@apollo/client';
import {
  CreateCreativeDocument,
  CreateCreativeMutation,
  CreateCreativeMutationVariables,
  CreativeByIdDocument,
  CreativeByIdQuery,
  CreativeByIdQueryVariables,
  CreativeResponse,
  CreativesDocument,
  CreativesQueryVariables,
  UpdateCreativeDocument,
  UpdateCreativeMutation,
  UpdateCreativeMutationVariables,
  UpdateCreativeStatusDocument,
  UpdateCreativeStatusMutation,
  UpdateCreativeStatusMutationVariables,
  CopyCreativesDocument,
  CopyCreativesMutationVariables,
  CopyCreativesMutation,
  CreativesByIdsQuery,
  CreativesByIdsDocument,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class CreativeService {
  async getCreatives(variables: CreativesQueryVariables, context?: AdvanceApolloContext): Promise<CreativeResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: CreativesDocument,
        variables,
        context,
      });
      return response.data.creatives;
    } catch (err) {
      logger.error('Error while fetching creatives');
      logger.error(err);
      throw err;
    }
  }

  async getCreativeById(
    variables: CreativeByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<CreativeByIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: CreativeByIdDocument,
        variables,
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching creative by ID');
      logger.error(err);
      throw err;
    }
  }

  async getCreativeByIds(ids: string[]): Promise<FetchResult<CreativesByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: CreativesByIdsDocument,
        variables: {
          ids,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching creative by ID');
      logger.error(error);
      throw error;
    }
  }

  async createCreative(variables: CreateCreativeMutationVariables): Promise<FetchResult<CreateCreativeMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateCreativeDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while creating creative');
      logger.error(error);
      throw error;
    }
  }

  async updateCreative(variables: UpdateCreativeMutationVariables): Promise<FetchResult<UpdateCreativeMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateCreativeDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while updating creative');
      logger.error(error);
      throw error;
    }
  }

  async updateCreativeStatus(
    variables: UpdateCreativeStatusMutationVariables,
  ): Promise<FetchResult<UpdateCreativeStatusMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateCreativeStatusDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while suspending Creative');
      logger.error(error);
      throw error;
    }
  }

  async duplicateCreatives(variables: CopyCreativesMutationVariables): Promise<FetchResult<CopyCreativesMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CopyCreativesDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while duplicating Creative');
      logger.error(error);
      throw error;
    }
  }

  async updateMultipleCreativeStatus(
    campaigns: UpdateCreativeStatusMutationVariables[],
  ): Promise<FetchResult<UpdateCreativeStatusMutation>[]> {
    try {
      const APIcalls = campaigns.map(variables => this.updateCreativeStatus(variables));
      const response = await Promise.all(APIcalls);
      return response;
    } catch (error) {
      logger.error('Error while suspending Creative');
      logger.error(error);
      throw error;
    }
  }
}
