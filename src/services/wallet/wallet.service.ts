import { FetchResult } from '@apollo/client';
import {
  CreateWalletDocument,
  QueryWalletHistoryArgs,
  UpdateWalletDocument,
  UserGroupResponse,
  UpdateWalletStatusDocument,
  UpdateWalletStatusMutation,
  UpdateWalletStatusMutationVariables,
  UserGroupsDocument,
  UserGroupsQueryVariables,
  WalletByIdDocument,
  WalletByIdQuery,
  WalletHistoryDocument,
  WalletHistoryResponse,
  WalletInput,
  WalletsDocument,
  UpdateWalletBalanceDocument,
  UpdateWalletBalanceMutationVariables,
  UpdateWalletBalanceMutation,
  ApplicableWalletsForCampaignQueryVariables,
  ApplicableWalletsForCampaignQuery,
  ApplicableWalletsForCampaignDocument,
  WalletRequestsQueryVariables,
  WalletRequestsQuery,
  WalletRequestsDocument,
  ApproveWalletRequestMutationVariables,
  ApproveWalletRequestMutation,
  ApproveWalletRequestDocument,
  WalletsByIdsQuery,
  WalletsByIdsDocument,
  SharedWalletsQueryVariables,
  SharedWalletsQuery,
  SharedWalletsDocument,
  UpdateSharedWalletStatusMutationVariables,
  UpdateSharedWalletStatusMutation,
  UpdateSharedWalletStatusDocument,
  SharedWalletByIdQueryVariables,
  SharedWalletByIdQuery,
  SharedWalletByIdDocument,
  CreateSharedWalletMutationVariables,
  CreateSharedWalletMutation,
  CreateSharedWalletDocument,
  UpdateSharedWalletMutationVariables,
  UpdateSharedWalletMutation,
  UpdateSharedWalletDocument,
  SharedWalletHistoryQueryVariables,
  SharedWalletHistoryQuery,
  SharedWalletHistoryDocument,
  WalletsQueryVariables,
  WalletsQuery,
  WalletSummaryQueryVariables,
  WalletSummaryQuery,
  WalletSummaryDocument,
  DeleteUploadedContractMutationVariables,
  DeleteUploadedContractMutation,
  DeleteUploadedContractDocument,
  GenerateContractPreSignedUrlMutationVariables,
  GenerateContractPreSignedUrlMutation,
  GenerateContractPreSignedUrlDocument,
  GetContractMetadataQueryVariables,
  GetContractMetadataQuery,
  GetContractMetadataDocument,
} from 'types';
import { AdvanceApolloContext, TMediaType } from '@/index';
import logger from '@/common/logger';
import { parseFileName } from '@/common/helpers';
import GRAPHQL_CLIENT from '../network/graphql.service';
import { HttpService } from '../network/http.service';

export default class WalletService extends HttpService {
  /**
   *
   * @param filters
   * @returns WalletResponse
   */

  async createWallet(input: WalletInput): Promise<Record<string, any>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateWalletDocument,
        variables: {
          input,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching Wallets');
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param ID
   * @param WalletsDocument
   * @returns WalletResponse
   */

  async updateWallet(id: any, input: WalletInput): Promise<Record<string, any>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateWalletDocument,
        variables: {
          id,
          input,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while updating Wallets');
      logger.error(error);
      throw error;
    }
  }

  async getAllTypedWallets(
    variables: WalletsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<WalletsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: WalletsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while fetching Wallets');
      logger.error(error);
      return undefined;
    }
  }

  /**
   *
   * @param QueryWalletsArgs
   * @param WalletsDocument
   * @returns WalletResponse
   */
  async getAllWallets(filters?: any, context?: AdvanceApolloContext): Promise<Record<string, any>> {
    try {
      const payload: any = {
        page: Number(filters?.pageNo),
        pageSize: Number(filters?.pageSize),
        filters: {},
      };
      if (filters.type && filters.type !== 'all') (payload as any).filters.type = filters.type;
      if (filters.status && filters.status !== 'all') (payload as any).filters.status = filters.status;
      if (filters.userGroupId && filters.userGroupId !== 'all')
        (payload as any).filters.userGroupId = filters.userGroupId;
      if (filters.advertiserId && filters.advertiserId !== 'all')
        (payload as any).filters.advertiserId = filters.advertiserId;
      if (filters.search) (payload as any).filters.search = filters.search;
      if (filters.sortBy && filters.sortType) (payload as any).sort = `${filters.sortType}${filters.sortBy}`;

      const response = await GRAPHQL_CLIENT.query({
        query: WalletsDocument,
        variables: payload,
        context,
      });
      return response.data.wallets;
    } catch (error) {
      logger.error('Error while fetching Wallets');
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param filters
   * @returns WalletResponse
   */

  async getALlTeams(filters?: any): Promise<Record<string, any>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UserGroupsDocument,
        variables: {
          page: filters.pageNo,
          pageSize: filters.pageSize,
        },
      });
      return response.data.userGroups;
    } catch (error) {
      logger.error('Error while fetching user group');
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param ID
   * @returns WalletResponse
   */

  async getWalletById(id: any, context?: AdvanceApolloContext): Promise<WalletByIdQuery> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: WalletByIdDocument,
        variables: {
          id,
        },
        context,
      });
      return response.data ?? {};
    } catch (error) {
      logger.error('Error while fetching wallet');
      logger.error(error);
      throw error;
    }
  }

  async getWalletsByIds(ids: string[]): Promise<FetchResult<WalletsByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: WalletsByIdsDocument,
        variables: {
          ids,
        },
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching wallet');
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param TransactionPayload
   * @returns TransactionResponse
   */

  async getAllTransaction(
    payload: QueryWalletHistoryArgs,
    context?: AdvanceApolloContext,
  ): Promise<WalletHistoryResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: WalletHistoryDocument,
        variables: {
          ...payload,
        },
        context,
      });
      return response.data.walletHistory as any;
      // return transaction;
    } catch (error) {
      logger.error('Error while fetching transaction');
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param LinkedUserPayload
   * @returns TransactionResponse
   */

  async getAllLinkedTeams(
    variables: UserGroupsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<UserGroupResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UserGroupsDocument,
        variables,
        context,
      });
      return response.data.userGroups as UserGroupResponse;
    } catch (error) {
      logger.error('Error while fetching linked teams');
      logger.error(error);
      throw error;
    }
  }

  async updateWalletStatus(
    variables: UpdateWalletStatusMutationVariables,
  ): Promise<FetchResult<UpdateWalletStatusMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateWalletStatusDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while suspending Wallet');
      logger.error(error);
      throw error;
    }
  }

  async updateWalletBalance(
    variables: UpdateWalletBalanceMutationVariables,
  ): Promise<FetchResult<UpdateWalletBalanceMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateWalletBalanceDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while updating Wallet Fund');
      logger.error(error);
      throw error;
    }
  }

  async applicableWalletsForCampaign(
    variables: ApplicableWalletsForCampaignQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<ApplicableWalletsForCampaignQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ApplicableWalletsForCampaignDocument,
        variables,
        context,
      });
      return response;
    } catch (error) {
      logger.error('Error while fetching applicable Wallets for campaign');
      logger.error(error);
      throw error;
    }
  }

  async uploadLegalContract(mediaFile: any, accountId: string, fileName?: string): Promise<TMediaType> {
    try {
      const formData = new FormData();
      formData.append('file', mediaFile, fileName);
      const response = await this.post(`/v1/wallets/upload/${accountId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      logger.error('unable to upload media file');
      logger.error(error);
      throw error;
    }
  }

  async triggerWalletDownloadBySignedURL(variables: GenerateContractPreSignedUrlMutationVariables): Promise<void> {
    try {
      const response = await this.generateContractPreSignedUrl(variables);

      const downloadBtn: HTMLAnchorElement = document.createElement('a');
      downloadBtn.setAttribute('href', response?.generateContractPreSignedUrl as string);
      downloadBtn.setAttribute('download', parseFileName(variables.fileId));
      downloadBtn.setAttribute('target', '_blank');
      document.body.appendChild(downloadBtn);
      downloadBtn.click();
      document.body.removeChild(downloadBtn);
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getWalletRequests(
    variables: WalletRequestsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<WalletRequestsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: WalletRequestsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async updateWalletRequestById(
    variables: ApproveWalletRequestMutationVariables,
  ): Promise<ApproveWalletRequestMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: ApproveWalletRequestDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  async getSharedWallets(
    variables: SharedWalletsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<SharedWalletsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: SharedWalletsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getSharedWalletById(
    variables: SharedWalletByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<SharedWalletByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: SharedWalletByIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async createSharedWallet(
    variables: CreateSharedWalletMutationVariables,
  ): Promise<CreateSharedWalletMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateSharedWalletDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async updateSharedWallet(
    variables: UpdateSharedWalletMutationVariables,
  ): Promise<UpdateSharedWalletMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateSharedWalletDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async updateSharedWalletStatus(
    variables: UpdateSharedWalletStatusMutationVariables,
  ): Promise<UpdateSharedWalletStatusMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateSharedWalletStatusDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getSharedWalletHistory(
    variables: SharedWalletHistoryQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<SharedWalletHistoryQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: SharedWalletHistoryDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getWalletSummary(
    variables: WalletSummaryQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<WalletSummaryQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: WalletSummaryDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async deleteUploadedContract(
    variables: DeleteUploadedContractMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<DeleteUploadedContractMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DeleteUploadedContractDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async generateContractPreSignedUrl(
    variables: GenerateContractPreSignedUrlMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<GenerateContractPreSignedUrlMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GenerateContractPreSignedUrlDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getContractMetadata(
    variables: GetContractMetadataQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<GetContractMetadataQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetContractMetadataDocument,
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
