import { FetchResult } from '@apollo/client';
import {
  CreateAdItemTargetingReportDocument,
  CreateAdItemTargetingReportMutation,
  CreateAdItemTargetingReportMutationVariables,
  CreateReportDocument,
  CreateScheduleDocument,
  DeleteAdItemByIdMutation,
  DeleteReportByIdDocument,
  GenerateCsvFileUrlDocument,
  GenerateCsvFileUrlQuery,
  Maybe,
  ReportByIdDocument,
  ReportByIdQuery,
  ReportByIdQueryVariables,
  ReportInput,
  ReportsDocument,
  ReportsQuery,
  ReportsQueryVariables,
  ScheduleByIdDocument,
  ScheduleByIdQuery,
  ScheduleByIdQueryVariables,
  ScheduleInput,
  SchedulesDocument,
  SchedulesQuery,
  SchedulesQueryVariables,
  UpdateAllCampaignsAllAdvertisersReportDocument,
  UpdateAllCampaignsAllAdvertisersReportMutation,
  UpdateScheduleDocument,
  UpdateScheduleMutation,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class ReportService {
  /**
   *
   * @param page
   * @param pageSize
   * @param ReportFilters
   */

  async getReports(input: ReportsQueryVariables, context?: AdvanceApolloContext): Promise<FetchResult<ReportsQuery>> {
    try {
      return await GRAPHQL_CLIENT.query({
        query: ReportsDocument,
        variables: input,
        context,
      });
    } catch (error) {
      logger.error('Error while fetching Reports');
      logger.error(error);
      throw error;
    }
  }

  async getReportById(
    variables: ReportByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ReportByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ReportByIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while fetching Reports');
      logger.error(error);
      return undefined;
    }
  }

  async createReport(input: ReportInput): Promise<Record<string, any>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateReportDocument,
        variables: {
          input,
        },
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateReport(
    id: string,
    input: ReportInput,
  ): Promise<FetchResult<UpdateAllCampaignsAllAdvertisersReportMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAllCampaignsAllAdvertisersReportDocument,
        variables: {
          id,
          input,
        },
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createSchedule(input: ScheduleInput): Promise<Record<string, any>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateScheduleDocument,
        variables: {
          input,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while creating Scheduled Report');
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param page
   * @param pageSize
   * @param ScheduleFilter
   */
  async getSchedules(
    input: SchedulesQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<SchedulesQuery>> {
    try {
      return await GRAPHQL_CLIENT.query({
        query: SchedulesDocument,
        variables: input,
        context,
      });
    } catch (error) {
      logger.error('Error while fetching Schedules');
      logger.error(error);
      throw error;
    }
  }

  async getScheduleById(
    variables: ScheduleByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ScheduleByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ScheduleByIdDocument,
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
   *
   * @param ID
   */
  async downloadCsv(id: any): Promise<FetchResult<GenerateCsvFileUrlQuery>> {
    try {
      return await GRAPHQL_CLIENT.mutate({
        mutation: GenerateCsvFileUrlDocument,
        variables: { id },
      });
    } catch (error) {
      logger.error('Error while Generating CSV file');
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param ID
   */
  async deleteSchedule(id: any): Promise<FetchResult<DeleteAdItemByIdMutation>> {
    try {
      return await GRAPHQL_CLIENT.mutate({
        mutation: DeleteReportByIdDocument,
        variables: { id },
      });
    } catch (error) {
      logger.error('Error while updating Schedules');
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param ID
   * @param ScheduleInput
   */
  async updateSchedule(id: any, schedule: ScheduleInput): Promise<FetchResult<UpdateScheduleMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateScheduleDocument,
        variables: {
          id,
          schedule,
        },
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createAdItemTargetingReport(
    variables: CreateAdItemTargetingReportMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<Maybe<CreateAdItemTargetingReportMutation> | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateAdItemTargetingReportDocument,
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
