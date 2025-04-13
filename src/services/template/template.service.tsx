import { FetchResult } from '@apollo/client';
import {
  CreateTemplateDocument,
  CreateTemplateMutation,
  CreateTemplateMutationVariables,
  DeleteTemplateByIdDocument,
  DeleteTemplateByIdMutation,
  DeleteTemplateByIdMutationVariables,
  TemplateByIdDocument,
  TemplateByIdQuery,
  TemplateByIdQueryVariables,
  TemplateResponse,
  TemplatesDocument,
  TemplatesQueryVariables,
  UpdateTemplateDocument,
  UpdateTemplateMutation,
  UpdateTemplateMutationVariables,
  UpdateTemplateStatusDocument,
  UpdateTemplateStatusMutation,
  UpdateTemplateStatusMutationVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class TemplateService {
  async getTemplates(variables: TemplatesQueryVariables, context?: AdvanceApolloContext): Promise<TemplateResponse> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: TemplatesDocument,
        variables,
        context,
      });
      return response.data.templates;
    } catch (err) {
      logger.error('Error while fetching templates');
      logger.error(err);
      throw err;
    }
  }

  async getTemplateById(variables: TemplateByIdQueryVariables): Promise<TemplateByIdQuery> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: TemplateByIdDocument,
        variables,
      });
      return response.data;
    } catch (err) {
      logger.error('Error while fetching template');
      logger.error(err);
      throw err;
    }
  }

  async createTemplate(variables: CreateTemplateMutationVariables): Promise<FetchResult<CreateTemplateMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateTemplateDocument,
        variables,
      });
      return response;
    } catch (err) {
      logger.error('Error while creating template');
      logger.error(err);
      throw err;
    }
  }

  async updateTemplate(variables: UpdateTemplateMutationVariables): Promise<FetchResult<UpdateTemplateMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateTemplateDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while updating template');
      logger.error(error);
      throw error;
    }
  }

  async deleteTemplate(
    variables: DeleteTemplateByIdMutationVariables,
  ): Promise<FetchResult<DeleteTemplateByIdMutation> | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: DeleteTemplateByIdDocument,
        variables,
      });
      return response;
    } catch (err) {
      logger.error('Error while deleting template');
      logger.error(err);
      return undefined;
    }
  }

  async updateTemplateStatus(
    variables: UpdateTemplateStatusMutationVariables,
  ): Promise<FetchResult<UpdateTemplateStatusMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateTemplateStatusDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while suspending Template');
      logger.error(error);
      throw error;
    }
  }

  async updateMultipleTemplateStatus(
    campaigns: UpdateTemplateStatusMutationVariables[],
  ): Promise<FetchResult<UpdateTemplateStatusMutation>[]> {
    try {
      const APIcalls = campaigns.map(variables => this.updateTemplateStatus(variables));
      const response = await Promise.all(APIcalls);
      return response;
    } catch (error) {
      logger.error('Error while suspending Template');
      logger.error(error);
      throw error;
    }
  }
}
