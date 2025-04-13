import { ApolloQueryResult, FetchResult } from '@apollo/client';
import {
  CreateParentCompanyDocument,
  CreateParentCompanyMutation,
  CreateParentCompanyMutationVariables,
  GetParentCompanyByIdDocument,
  GetParentCompanyByIdQuery,
  ParentCompaniesDocument,
  ParentCompaniesQuery,
  ParentCompaniesQueryVariables,
  UpdateParentCompanyDocument,
  UpdateParentCompanyMutation,
  UpdateParentCompanyMutationVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class ParentCompanyService {
  async getParentCompanies(
    variables: ParentCompaniesQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<ApolloQueryResult<ParentCompaniesQuery>> {
    const { pageSize, page, filters, sort } = variables;
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ParentCompaniesDocument,
        variables: {
          page,
          pageSize,
          filters,
          sort,
        },
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching parent companies', err);
      throw err;
    }
  }

  async createParentCompany(
    variables: CreateParentCompanyMutationVariables,
  ): Promise<FetchResult<CreateParentCompanyMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateParentCompanyDocument,
        variables,
      });
      return response;
    } catch (err) {
      logger.error('Error while creating parent company', err);
      throw err;
    }
  }

  async getParentCompanyById(id: string): Promise<GetParentCompanyByIdQuery> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetParentCompanyByIdDocument,
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

  async updateParentCompany(
    variables: UpdateParentCompanyMutationVariables,
  ): Promise<FetchResult<UpdateParentCompanyMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateParentCompanyDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error: Failed to update advertiser', error);
      throw error;
    }
  }
}
