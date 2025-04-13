import {
  ApproveChangeRequestDocument,
  ApproveChangeRequestMutation,
  ChangeRequest,
  ChangeRequestByIdDocument,
  ChangeRequestCountDocument,
  ChangeRequestCountQuery,
  ChangeRequestCountQueryVariables,
  ChangeRequestInput,
  ChangeRequestResponse,
  ChangeRequestsDocument,
  ChangeRequestsQueryVariables,
  CreateChangeRequestDocument,
  CreateChangeRequestMutation,
  CreateChangeRequestMutationVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class ChangeRequestService {
  async getAllChangeRequests(
    options: ChangeRequestsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ChangeRequestResponse> {
    try {
      const { page, pageSize, filters, sort } = options;
      const response = await GRAPHQL_CLIENT.query({
        query: ChangeRequestsDocument,
        variables: {
          page,
          pageSize,
          filters: {
            ...filters,
            archived: false,
          },
          sort,
        },
        context,
      });
      return response.data.changeRequests;
    } catch (err) {
      logger.error('Error while fetching change requests', err);
      throw err;
    }
  }

  async getArchivedRequests(options: ChangeRequestsQueryVariables): Promise<ChangeRequestResponse> {
    try {
      const { page, pageSize, filters, sort } = options;
      const response = await GRAPHQL_CLIENT.query({
        query: ChangeRequestsDocument,
        variables: {
          page,
          pageSize,
          filters: {
            ...filters,
            archived: true,
          },
          sort,
        },
      });
      return response.data.changeRequests;
    } catch (err) {
      logger.error('Error while fetching change requests', err);
      throw err;
    }
  }

  async getChangeRequestById(id: string): Promise<ChangeRequest | undefined | null> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ChangeRequestByIdDocument,
        variables: {
          id,
        },
      });
      return response.data.changeRequestById;
    } catch (error) {
      logger.error('Error while fetching change requests', error);
      throw error;
    }
  }

  async getChangeRequestCount(
    variables: ChangeRequestCountQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ChangeRequestCountQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ChangeRequestCountDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async approveChangeRequest(
    id: string,
    changeRequest: ChangeRequestInput,
  ): Promise<ApproveChangeRequestMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: ApproveChangeRequestDocument,
        variables: {
          id,
          changeRequest,
        },
      });
      return response.data;
    } catch (error) {
      logger.error('Error while fetching change requests', error);
      return undefined;
    }
  }

  async createChangeRequest(
    variables: CreateChangeRequestMutationVariables,
  ): Promise<CreateChangeRequestMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateChangeRequestDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}
