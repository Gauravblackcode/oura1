import { FetchResult } from '@apollo/client';
import {
  CreateVariableDocument,
  CreateVariableMutation,
  CreateVariableMutationVariables,
  DeleteVariableByIdDocument,
  DeleteVariableByIdMutation,
  DeleteVariableByIdMutationVariables,
  VariablesDocument,
  VariablesQuery,
  VariablesQueryVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class VariableService {
  async createVariable(variables: CreateVariableMutationVariables): Promise<FetchResult<CreateVariableMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateVariableDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while creating variable');
      logger.error(error);
      throw error;
    }
  }

  async createMultipleVariables(
    items: CreateVariableMutationVariables[],
  ): Promise<FetchResult<CreateVariableMutation>[]> {
    try {
      const createVariableAPICalls = items.map(variable => this.createVariable(variable));
      const response = await Promise.all(createVariableAPICalls);
      return response;
    } catch (error) {
      logger.error('Error while creating variable');
      logger.error(error);
      throw error;
    }
  }

  async getVariables(
    parameter: VariablesQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<VariablesQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: VariablesDocument,
        variables: parameter,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while fetching variables');
      logger.error(error);
      return undefined;
    }
  }

  async deleteVariable(
    variables: DeleteVariableByIdMutationVariables,
  ): Promise<FetchResult<DeleteVariableByIdMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: DeleteVariableByIdDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while deleting variable');
      logger.error(error);
      throw error;
    }
  }

  async deleteMultipleVariables(
    variables: DeleteVariableByIdMutationVariables[],
  ): Promise<FetchResult<DeleteVariableByIdMutation>[] | undefined> {
    try {
      const deleteMultipleVariableAPICalls = variables.map(item => this.deleteVariable(item));
      const response = await Promise.all(deleteMultipleVariableAPICalls);
      return response;
    } catch (error) {
      logger.error('Error while deleting variables');
      logger.error(error);
      return undefined;
    }
  }
}
