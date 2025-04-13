import { FetchResult } from '@apollo/client';
import {
  CreatePlacementDocument,
  CreatePlacementMutation,
  GetAllPlacementsDocument,
  GetPlacementByIdDocument,
  GetPlacementByIdQuery,
  GetPlacementsByIdsDocument,
  GetPlacementsByIdsQuery,
  PlacementFilters,
  PlacementResponse,
  UpdatePlacementDocument,
  UpdatePlacementMutation,
} from 'types';
import logger from '@/common/logger';
import GRAPHQL_CLIENT from '@/services/network/graphql.service';
import { PlacementFormProps } from '@/modules/inventory/interface/inventory';
import { AdvanceApolloContext } from '@/index';

interface GetAllPlacements {
  page?: number;
  pageSize?: number;
  filters?: PlacementFilters;
}

export default class PlacementService {
  async getPlacements(options?: GetAllPlacements, context?: AdvanceApolloContext): Promise<PlacementResponse> {
    try {
      const { page = 1, pageSize = 500, filters }: any = options || {};
      const response = await GRAPHQL_CLIENT.query({
        query: GetAllPlacementsDocument,
        variables: {
          page,
          pageSize,
          filters,
        },
        context,
      });
      return response.data.placements;
    } catch (err) {
      logger.error('Error while fetching all placements');
      logger.error(err);
      throw err;
    }
  }

  async getPlacementById(id: string): Promise<GetPlacementByIdQuery> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetPlacementByIdDocument,
        variables: {
          id,
        },
      });
      return response.data;
    } catch (err) {
      logger.error('Error while fetching placement', err);
      throw err;
    }
  }

  async getPlacementsByIds(ids: string[]): Promise<FetchResult<GetPlacementsByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetPlacementsByIdsDocument,
        variables: {
          ids,
        },
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching placements by ids', err);
      throw err;
    }
  }

  async createPlacement(
    accountId: string,
    values: PlacementFormProps,
    adSlotIds?: string[],
  ): Promise<FetchResult<CreatePlacementMutation>> {
    try {
      const { name, platformId, slotType } = values;
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreatePlacementDocument,
        variables: {
          placement: {
            name: name.trim(),
            accountId,
            platformId,
            adSlotIds,
            slotType,
          },
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while creating placement');
      logger.error(error);
      throw error;
    }
  }

  async updatePlacement(
    id: string,
    accountId: string,
    adSlotIds: string[],
    options: PlacementFormProps,
  ): Promise<FetchResult<UpdatePlacementMutation>> {
    try {
      const { name, platformId, slotType } = options;
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdatePlacementDocument,
        variables: {
          id,
          placement: {
            name: name.trim(),
            accountId,
            platformId,
            adSlotIds,
            slotType,
          },
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while updating placement', error);
      throw error;
    }
  }
}
