import { FetchResult } from '@apollo/client';
import {
  ArchiveCampaignDocument,
  ArchiveCampaignMutation,
  ArchiveCampaignMutationVariables,
  CampaignByIdDocument,
  CampaignByIdQuery,
  CampaignResponse,
  CampaignsByIdsDocument,
  CampaignsByIdsQuery,
  CampaignsDocument,
  CampaignsPerformanceDocument,
  CampaignsPerformanceQuery,
  CampaignsPerformanceQueryVariables,
  CampaignsQueryVariables,
  CopyCampaignDocument,
  CopyCampaignMutation,
  CopyCampaignMutationVariables,
  CreateCampaignDocument,
  CreateCampaignMutation,
  CreateCampaignMutationVariables,
  Maybe,
  UpdateCampaignDocument,
  UpdateCampaignMutation,
  UpdateCampaignMutationVariables,
  UpdateCampaignStatusDocument,
  UpdateCampaignStatusMutation,
  UpdateCampaignStatusMutationVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class CampaignService {
  async getAllCampaign(variables: CampaignsQueryVariables, context?: AdvanceApolloContext): Promise<CampaignResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: CampaignsDocument,
        variables,
        context,
      });
      return response.data.campaigns;
    } catch (err) {
      logger.error('Error while fetching campaigns');
      logger.error(err);
      throw err;
    }
  }

  async createCampaign(variables: CreateCampaignMutationVariables): Promise<FetchResult<CreateCampaignMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateCampaignDocument,
        variables,
      });
      return response;
    } catch (err) {
      logger.error('Error while creating campaign');
      logger.error(err);
      throw err;
    }
  }

  async copyCampaign(
    variables: CopyCampaignMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<Maybe<CopyCampaignMutation> | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CopyCampaignDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async updateCampaign(variables: UpdateCampaignMutationVariables): Promise<FetchResult<UpdateCampaignMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateCampaignDocument,
        variables,
      });
      return response;
    } catch (err) {
      logger.error('Error while updating campaign');
      logger.error(err);
      throw err;
    }
  }

  async getCampaignById(id: string, context?: AdvanceApolloContext): Promise<FetchResult<CampaignByIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: CampaignByIdDocument,
        variables: { id },
        context
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching campaign details');
      logger.error(err);
      throw err;
    }
  }

  async getCampaignsByIds(ids: string[]): Promise<FetchResult<CampaignsByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: CampaignsByIdsDocument,
        variables: { ids },
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching campaign details');
      logger.error(error);
      throw error;
    }
  }

  async updateCampaignStatus(
    variables: UpdateCampaignStatusMutationVariables,
  ): Promise<FetchResult<UpdateCampaignStatusMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateCampaignStatusDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while suspending campaign');
      logger.error(error);
      throw error;
    }
  }

  async updateMultipleCampaignStatus(
    campaigns: UpdateCampaignStatusMutationVariables[],
  ): Promise<FetchResult<UpdateCampaignStatusMutation>[]> {
    try {
      const APIcalls = campaigns.map(variables => this.updateCampaignStatus(variables));
      const response = await Promise.all(APIcalls);
      return response;
    } catch (error) {
      logger.error('Error while suspending campaign');
      logger.error(error);
      throw error;
    }
  }

  async getCampaignPerformance(
    variables: CampaignsPerformanceQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<CampaignsPerformanceQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: CampaignsPerformanceDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async archiveCampaign(
    variables: ArchiveCampaignMutationVariables,
  ): Promise<Maybe<ArchiveCampaignMutation | undefined>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: ArchiveCampaignDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}
