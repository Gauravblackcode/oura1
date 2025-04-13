import {
  CreateYieldGroupDocument,
  CreateYieldGroupMutation,
  SupplySidePlatformByIdQueryVariables,
  SupplySidePlatformResponse,
  SupplySidePlatformsDocument,
  SupplySidePlatformsQueryVariables,
  UpdateYieldGroupDocument,
  UpdateYieldGroupMutation,
  UpdateYieldGroupMutationVariables,
  YieldGroupByIdDocument,
  YieldGroupByIdQuery,
  YieldGroupByIdQueryVariables,
  YieldGroupInput,
  YieldGroupResponse,
  YieldGroupsDocument,
  YieldGroupsQueryVariables,
  SupplySidePlatformByIdDocument,
  SupplySidePlatformByIdQuery,
  UpdateSupplySidePlatformMutationVariables,
  UpdateSupplySidePlatformMutation,
  UpdateSupplySidePlatformDocument,
  SspBidRequestSettingsDocument,
  SspBidRequestSettings,
  CreateSspBidRequestSettingsMutationVariables,
  CreateSspBidRequestSettingsMutation,
  CreateSspBidRequestSettingsDocument,
  UpdateSspBidRequestSettingsMutationVariables,
  UpdateSspBidRequestSettingsMutation,
  UpdateSspBidRequestSettingsDocument,
  UpdateSupplySidePlatformStatusMutation,
  UpdateSupplySidePlatformStatusMutationVariables,
  UpdateSupplySidePlatformStatusDocument,
  DashboardYieldGroupInventoryCategoryPerformanceDocument,
  DashboardYieldGroupInventoryCategoryPerformanceQueryVariables,
  DashboardYieldGroupInventoryCategoryPerformanceQuery,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';
import { HttpService } from '../network/http.service';
import {
  UpdateYieldGroupStatusDocument,
  UpdateYieldGroupStatusMutation,
  UpdateYieldGroupStatusMutationVariables,
} from './../../../types';
import YieldPerformance from './mock/yield-performance.json';
import YieldInventory from './mock/yield-inventory.json';
import YieldTopAdvertisers from './mock/yield-top-advertisers.json';
import YieldPerformingSSP from './mock/yield-ssp-performance.json';

export type YieldPerformanceType = typeof YieldPerformance | undefined;
export type YieldTopAdvertiserType = typeof YieldTopAdvertisers | undefined;
export type YieldInventoryType = typeof YieldInventory | undefined;
export type YieldPerformingSSPType = typeof YieldPerformingSSP | undefined;

export default class YieldService extends HttpService {
  async getYieldPerformance(): Promise<YieldPerformanceType> {
    try {
      return YieldPerformance;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getYieldInventory(): Promise<YieldInventoryType> {
    try {
      return YieldInventory;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getYieldTopAdvertisers(): Promise<YieldTopAdvertiserType> {
    try {
      return YieldTopAdvertisers;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getYieldPerformingSSP(): Promise<YieldPerformingSSPType> {
    try {
      return YieldPerformingSSP;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async createYieldGroup(input: YieldGroupInput): Promise<CreateYieldGroupMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateYieldGroupDocument,
        variables: {
          input,
        },
      });
      return response.data;
    } catch (error) {
      logger.error('Error while creating Yield Group');
      logger.error(error);
      throw error;
    }
  }

  /**
   * update Yield Group
   * @param UpdateYieldGroupMutationVariables
   * @returns updated Yield Group
   */
  async updateYieldGroup(
    variables: UpdateYieldGroupMutationVariables,
  ): Promise<UpdateYieldGroupMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateYieldGroupDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while updating Yield Group');
      logger.error(error);
      throw error;
    }
  }
  /**
   * update SSP Group
   * @param UpdateSupplySidePlatformMutationVariables
   * @returns updated SSP Group
   *
   */
  async updateSSPGroup(
    variables: UpdateSupplySidePlatformMutationVariables,
  ): Promise<UpdateSupplySidePlatformMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateSupplySidePlatformDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while updating SSP Group');
      logger.error(error);
      throw error;
    }
  }

  /**
   * @returns get Yield by Id
   */
  async getYieldGroupById(
    variables: YieldGroupByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<YieldGroupByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: YieldGroupByIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  /**
   * Get Supply Side Platform by Id
   * @returns get SSP by Id
   */
  async getSSPGroupById(
    variables: SupplySidePlatformByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<SupplySidePlatformByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: SupplySidePlatformByIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  /**
   * Get all Supply Side Platforms
   * @returns List of SSPs
   */
  async getAllSSPs(
    variables: SupplySidePlatformsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<SupplySidePlatformResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: SupplySidePlatformsDocument,
        variables,
        context,
      });
      return response.data.supplySidePlatforms as SupplySidePlatformResponse;
    } catch (error) {
      logger.error('Error while fetching all SSPs');
      logger.error(error);
      throw error;
    }
  }

  async getAllYields(
    variables: YieldGroupsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<YieldGroupResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: YieldGroupsDocument,
        variables,
        context,
      });
      return response.data.yieldGroups as YieldGroupResponse;
    } catch (error) {
      logger.error('Error while fetching all Yields');
      logger.error(error);
      throw error;
    }
  }

  async getYieldById(input: YieldGroupByIdQueryVariables): Promise<YieldGroupResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: YieldGroupByIdDocument,
        variables: input,
      });
      return response.data.yieldGroupById as any;
    } catch (error) {
      logger.error('Error while fetching Yield by Id');
      logger.error(error);
      throw error;
    }
  }

  async getSSPBidSettings(): Promise<Partial<SspBidRequestSettings> | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: SspBidRequestSettingsDocument,
      });
      return response.data?.sspBidRequestSettings;
    } catch (error) {
      logger.error('Error while fetching Yield by Id');
      logger.error(error);
      throw error;
    }
  }

  async createSSPBidSettings(
    variables: CreateSspBidRequestSettingsMutationVariables,
  ): Promise<CreateSspBidRequestSettingsMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateSspBidRequestSettingsDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while fetching Yield by Id');
      logger.error(error);
      throw error;
    }
  }

  async updateSSPBidSettings(
    variables: UpdateSspBidRequestSettingsMutationVariables,
  ): Promise<UpdateSspBidRequestSettingsMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateSspBidRequestSettingsDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while fetching Yield by Id');
      logger.error(error);
      throw error;
    }
  }

  /**
   * @returns get Yield by Id
   */
  async updateYieldStatus(
    variables: UpdateYieldGroupStatusMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<UpdateYieldGroupStatusMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UpdateYieldGroupStatusDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  /**
   * @returns get SSP by Id
   */
  async updateSSPStatus(
    variables: UpdateSupplySidePlatformStatusMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<UpdateSupplySidePlatformStatusMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UpdateSupplySidePlatformStatusDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  /**
   * @returns Yield Dashboard performance data
   */
  async getYieldDashboard(
    variables: DashboardYieldGroupInventoryCategoryPerformanceQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<DashboardYieldGroupInventoryCategoryPerformanceQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DashboardYieldGroupInventoryCategoryPerformanceDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}
