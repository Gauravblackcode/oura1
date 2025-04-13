import {
  DashboardInventoryPerformanceDocument,
  DashboardInventoryPerformanceQuery,
  DashboardInventoryPerformanceQueryVariables,
  DashboardNetworkPerformanceDocument,
  DashboardNetworkPerformanceQuery,
  DashboardNetworkPerformanceQueryVariables,
  DashboardTopAdvertisersDocument,
  DashboardTopAdvertisersQuery,
  DashboardTopAdvertisersQueryVariables,
  DashboardTopCampaignsDocument,
  DashboardTopCampaignsQuery,
  DashboardTopCampaignsQueryVariables,
  DashboardTopProductsDocument,
  DashboardTopProductsQuery,
  DashboardTopProductsQueryVariables,
} from 'types';
import logger from '@/common/logger';
import DateTimeParser from '@/lib/date-time-parser';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class DashboardService {
  transformVariables(
    variables:
      | DashboardInventoryPerformanceQueryVariables
      | DashboardTopAdvertisersQueryVariables
      | DashboardTopProductsQueryVariables,
  ) {
    const { dashboardFromDate, dashboardToDate } = variables.filters;
    return {
      filters: {
        ...variables.filters,
        dashboardFromDate: `${DateTimeParser(dashboardFromDate)?.format('YYYY-MM-DD')}T00:00:00`,
        dashboardToDate: `${DateTimeParser(dashboardToDate)?.format('YYYY-MM-DD')}T23:59:59`,
      },
    };
  }

  async getNetworkPerformance(
    variables: DashboardNetworkPerformanceQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<DashboardNetworkPerformanceQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DashboardNetworkPerformanceDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getTopAdvertisers(
    variables: DashboardTopAdvertisersQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<DashboardTopAdvertisersQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DashboardTopAdvertisersDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getTopProducts(
    variables: DashboardTopProductsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<DashboardTopProductsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DashboardTopProductsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getTopInventory(
    variables: DashboardInventoryPerformanceQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<DashboardInventoryPerformanceQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DashboardInventoryPerformanceDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getTopCampaigns(
    variables?: DashboardTopCampaignsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<DashboardTopCampaignsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DashboardTopCampaignsDocument,
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
