import { ApolloQueryResult, FetchResult } from '@apollo/client';
import {
  CreateAdSlotDocument,
  GetAdSlotByIdDocument,
  GetAdSlotsDocument,
  UpdateAdSlotByIdDocument,
  SlotType,
  User,
  CreateAdSlotMutation,
  AdSlotsWithDistinctAdSizesQuery,
  AdSlotsWithDistinctAdSizesQueryVariables,
  AdSlotsWithDistinctAdSizesDocument,
  UpdateAdSlotByIdMutation,
  UpdateAdSlotStatusDocument,
  GetAdSlotsByIdsQuery,
  GetAdSlotsByIdsDocument,
  GetAdSlotsQueryVariables,
  GetAdSlotsQuery,
  AdSlot,
} from 'types';
import logger from '@/common/logger';
import GRAPHQL_CLIENT from '@/services/network/graphql.service';
import { AdUnitFormProps, AdSlotObjProp } from '@/modules/inventory/interface/inventory';
import { AdvanceApolloContext } from '@/index';

export default class AdSlotService {
  async getAllAdSlots(
    variables?: GetAdSlotsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ApolloQueryResult<GetAdSlotsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetAdSlotsDocument,
        variables,
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching ad slots');
      logger.error(err);
      throw err;
    }
  }

  async getSingleAdSlot(options: string): Promise<Record<string, any>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetAdSlotByIdDocument,
        variables: {
          id: options,
        },
      });
      return response.data;
    } catch (err) {
      logger.error('Error while fetching ad slots by id');
      logger.error(err);
      throw err;
    }
  }

  async getAdSlotsById(options: string[]): Promise<AdSlotObjProp[]> {
    try {
      const adSlotItems: any = [];
      await Promise.all(
        options.map((adslot: string) => {
          return this.getSingleAdSlot(adslot);
        }),
      ).then(res => {
        for (let i = 0; i < res.length; i += 1) {
          const { adSlotById = {} } = res[i];
          adSlotItems.push(adSlotById);
        }
      });
      return adSlotItems;
    } catch (err) {
      logger.error('Error while fetching ad slots by id');
      logger.error(err);
      throw err;
    }
  }

  async getAdSlotById(adSlotId: string, context?: AdvanceApolloContext): Promise<AdSlotObjProp> {
    try {
      const response: any = await GRAPHQL_CLIENT.query({
        query: GetAdSlotByIdDocument,
        variables: {
          id: adSlotId,
        },
        context,
      });
      return response.data.adSlotById;
    } catch (err) {
      logger.error('Error while fetching ad slots by id');
      logger.error(err);
      throw err;
    }
  }

  async adSlotsByIds(ids: string[], context?: AdvanceApolloContext): Promise<FetchResult<GetAdSlotsByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetAdSlotsByIdsDocument,
        variables: {
          ids,
        },
        context,
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching ad slots by id');
      logger.error(error);
      throw error;
    }
  }

  async createAdSlot(options: AdUnitFormProps, user: User): Promise<FetchResult<CreateAdSlotMutation>> {
    try {
      const { adHeight, adWidth, advertiserIds, tileNumber, placementIds, ...parameters }: any = options;
      delete parameters.placements;
      delete parameters.advertisers;

      const adSlotPayload = {
        ...parameters,
        name: parameters.name.trim(),
        accountId: user.accountId,
        adSize: parameters.slotType !== SlotType.Display ? parameters.slotType : `${adWidth}x${adHeight}`,
        roadblockEligible: JSON.parse(options.roadblockEligible),
        preview: options.preview === 'true',
        placementIds,
        advertiserIds,
      };

      if (options.slotType === SlotType.Product && tileNumber?.length > 0) {
        adSlotPayload.tileNumber = tileNumber.split(',').map(Number);
      }

      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateAdSlotDocument,
        variables: {
          adSlot: adSlotPayload,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while creating ad slot', error);
      throw error;
    }
  }

  async updateAdSlot(options: AdUnitFormProps, id: string, user: User): Promise<FetchResult<UpdateAdSlotByIdMutation>> {
    try {
      const parameters: any = { ...options };
      delete parameters.adHeight;
      delete parameters.adWidth;
      delete parameters.placements;
      delete parameters.advertisers;
      delete parameters.tileNumber;
      const adSlotPayload = {
        ...parameters,
        name: parameters.name.trim(),
        accountId: user.accountId,
        adSize:
          parameters.slotType !== SlotType.Display ? parameters.slotType : `${options?.adWidth}x${options?.adHeight}`,
        roadblockEligible: JSON.parse(options.roadblockEligible),
        preview: options.preview === 'true',
      };

      if (options.slotType === SlotType.Product && options.tileNumber) {
        adSlotPayload.tileNumber = options.tileNumber?.length ? options.tileNumber.split(',').map(Number) : undefined;
      }

      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAdSlotByIdDocument,
        variables: {
          id,
          adSlot: adSlotPayload,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while updating ad slot');
      logger.error(error);
      throw error;
    }
  }

  async multiStatusChangeAdSlotById(slots: AdSlot[], option: boolean): Promise<Record<string, any>> {
    try {
      await Promise.all(
        slots.map((slot: AdSlot) => {
          GRAPHQL_CLIENT.mutate({
            mutation: UpdateAdSlotStatusDocument,
            variables: {
              id: slot.id,
              status: option,
            },
          });
          return slot;
        }),
      );
      return { msg: 'Status Updated Successfully' };
    } catch (error) {
      logger.error('Error Occured Disabling Units', error);
      throw error;
    }
  }

  async statusChangeAdSlotById(id: string, option: boolean): Promise<Record<string, any>> {
    try {
      const updateSlotStatus = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAdSlotStatusDocument,
        variables: {
          id,
          status: option,
        },
      });
      return updateSlotStatus;
    } catch (error) {
      logger.error('Error Occured Disabling Units', error);
      throw error;
    }
  }

  async getAdSlotSize(
    variables: AdSlotsWithDistinctAdSizesQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<AdSlotsWithDistinctAdSizesQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AdSlotsWithDistinctAdSizesDocument,
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
