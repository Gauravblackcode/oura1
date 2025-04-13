import { FetchResult } from '@apollo/client';
import {
  AudienceTargetKeyValuesByIdDocument,
  AudienceTargetKeyValuesByIdQuery,
  AudienceTargetKeyValuesByIdQueryVariables,
  AudienceTargetKeyValuesDocument,
  AudienceTargetKeyValuesInput,
  AudienceTargetKeyValuesQuery,
  AudienceTargetKeyValuesQueryVariables,
  AudienceTargetKeywordsDocument,
  AudienceTargetKeywordsQuery,
  AudienceTargetKeywordsQueryVariables,
  CohortByIdDocument,
  CohortByIdQuery,
  CohortByIdQueryVariables,
  CohortsDocument,
  CohortsQuery,
  CohortsQueryVariables,
  CreateAudienceTargetKeyValuesDocument,
  CreateAudienceTargetKeyValuesMutation,
  DeleteAudienceTargetKeyValuesByIdDocument,
  DeleteAudienceTargetKeyValuesByIdMutation,
  DeleteAudienceTargetKeyValuesByIdMutationVariables,
  UpdateAudienceTargetKeyValuesDocument,
  UpdateAudienceTargetKeyValuesMutation,
  CreateCohortDocument,
  CreateCohortMutation,
  CreateCohortMutationVariables,
  UpdateCohortDocument,
  UpdateCohortMutation,
  UpdateCohortMutationVariables,
  DeleteCohortByIdDocument,
  DeleteCohortByIdMutation,
  UpdateCohortStatusDocument,
  UpdateCohortStatusMutation,
  UpdateCohortStatusMutationVariables,
  UpdateAudienceTargetKeyValuesStatusMutationVariables,
  UpdateAudienceTargetKeyValuesStatusMutation,
  UpdateAudienceTargetKeyValuesStatusDocument,
  DeleteUploadedCohortFileMutationVariables,
  DeleteUploadedCohortFileMutation,
  DeleteUploadedCohortFileDocument,
  GenerateCohortFilePreSignedUrlMutationVariables,
  GenerateCohortFilePreSignedUrlMutation,
  GenerateCohortFilePreSignedUrlDocument,
  GetCohortFileMetadataQueryVariables,
  GetCohortFileMetadataQuery,
  GetCohortFileMetadataDocument,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext, TMediaType } from '@/index';
import { parseFileName } from '@/common/helpers';
import GRAPHQL_CLIENT from '../network/graphql.service';
import { HttpService } from '../network/http.service';

export default class AudienceService extends HttpService {
  async getKeywords(
    variables: AudienceTargetKeywordsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<AudienceTargetKeywordsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AudienceTargetKeywordsDocument,
        variables,
        context,
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getKeyValues(
    variables: AudienceTargetKeyValuesQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<AudienceTargetKeyValuesQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AudienceTargetKeyValuesDocument,
        variables,
        context,
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getKeyValuesById(
    variables: AudienceTargetKeyValuesByIdQueryVariables,
  ): Promise<FetchResult<AudienceTargetKeyValuesByIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: AudienceTargetKeyValuesByIdDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getMultipleKeyValuesById(
    variables: AudienceTargetKeyValuesByIdQueryVariables[],
  ): Promise<FetchResult<AudienceTargetKeyValuesByIdQuery>[]> {
    try {
      const apiCalls = variables.map(item => this.getKeyValuesById(item));
      const response = await Promise.all(apiCalls);
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createCohort(variables: CreateCohortMutationVariables): Promise<FetchResult<CreateCohortMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateCohortDocument,
        variables,
      });
      return response;
    } catch (err) {
      logger.error('Error while creating campaign');
      logger.error(err);
      throw err;
    }
  }

  async updateCohort(variables: UpdateCohortMutationVariables): Promise<FetchResult<UpdateCohortMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateCohortDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while updating audience status');
      logger.error(error);
      throw error;
    }
  }

  async updateCohortStatus(
    variables: UpdateCohortStatusMutationVariables,
  ): Promise<FetchResult<UpdateCohortStatusMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateCohortStatusDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while updating cohort');
      logger.error(error);
      throw error;
    }
  }

  async updateMultipleCohortStatus(
    variables: UpdateCohortStatusMutationVariables[],
  ): Promise<FetchResult<UpdateCohortStatusMutation>[]> {
    try {
      const APICalls = variables.map(item => this.updateCohortStatus(item));
      const response = await Promise.all(APICalls);
      return response;
    } catch (error) {
      logger.error('Error while updating cohort');
      logger.error(error);
      throw error;
    }
  }

  async deleteCohort(cohortId: string): Promise<FetchResult<DeleteCohortByIdMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: DeleteCohortByIdDocument,
        variables: { id: cohortId },
      });
      return response;
    } catch (error) {
      logger.error('Error while deleting cohort');
      logger.error(error);
      throw error;
    }
  }

  async getCohorts(
    variables: CohortsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<CohortsQuery>> {
    try {
      const { page, pageSize, filters, sort } = variables;
      const response = await GRAPHQL_CLIENT.query({
        query: CohortsDocument,
        variables: {
          page,
          pageSize,
          filters,
          sort,
        },
        context,
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getCohortById(variables: CohortByIdQueryVariables): Promise<FetchResult<CohortByIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: CohortByIdDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getMultipleCohortById(variables: CohortByIdQueryVariables[]): Promise<FetchResult<CohortByIdQuery>[]> {
    try {
      const apiCalls = variables.map(item => this.getCohortById(item));
      const response = await Promise.all(apiCalls);
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createKeyValue(
    input: AudienceTargetKeyValuesInput,
  ): Promise<FetchResult<CreateAudienceTargetKeyValuesMutation>> {
    try {
      const keyValueResp = await GRAPHQL_CLIENT.mutate({
        mutation: CreateAudienceTargetKeyValuesDocument,
        variables: {
          audienceTargetKeyValuesInput: input,
        },
      });
      return keyValueResp;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateKeyValue(
    id: any,
    input: AudienceTargetKeyValuesInput,
  ): Promise<FetchResult<UpdateAudienceTargetKeyValuesMutation>> {
    try {
      const keyValueResp = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAudienceTargetKeyValuesDocument,
        variables: {
          id,
          audienceTargetKeyValuesInput: input,
        },
      });
      return keyValueResp;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteKeyValue(
    variables: DeleteAudienceTargetKeyValuesByIdMutationVariables,
  ): Promise<FetchResult<DeleteAudienceTargetKeyValuesByIdMutation>> {
    try {
      const keyValueResp = await GRAPHQL_CLIENT.mutate({
        mutation: DeleteAudienceTargetKeyValuesByIdDocument,
        variables,
      });
      return keyValueResp;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteMultipleKeyValue(
    variables: DeleteAudienceTargetKeyValuesByIdMutationVariables[],
  ): Promise<FetchResult<DeleteAudienceTargetKeyValuesByIdMutation>[]> {
    try {
      const keyValueReq = variables.map(variable => this.deleteKeyValue(variable));
      const keyValueResp = await Promise.all(keyValueReq);
      return keyValueResp;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateKeyValueStatus(
    variables: UpdateAudienceTargetKeyValuesStatusMutationVariables,
  ): Promise<FetchResult<UpdateAudienceTargetKeyValuesStatusMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAudienceTargetKeyValuesStatusDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateMultipleKeyValueStatus(
    variables: UpdateAudienceTargetKeyValuesStatusMutationVariables[],
  ): Promise<FetchResult<UpdateAudienceTargetKeyValuesStatusMutation>[]> {
    try {
      const requests = variables.map(item => this.updateKeyValueStatus(item));
      const responses = await Promise.all(requests);
      return responses;
    } catch (error) {
      return [];
    }
  }

  async uploadCohortFile(mediaFile: any, accountId: string, fileName?: string): Promise<TMediaType> {
    try {
      const formData = new FormData();
      formData.append('file', mediaFile, fileName);
      const response = await this.post(`/v1/audience-target/cohorts/upload/${accountId}`, formData, {
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

  async deleteUploadedCohortFile(
    variables: DeleteUploadedCohortFileMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<DeleteUploadedCohortFileMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DeleteUploadedCohortFileDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async generateCohortFilePreSignedUrl(
    variables: GenerateCohortFilePreSignedUrlMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<GenerateCohortFilePreSignedUrlMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GenerateCohortFilePreSignedUrlDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async triggerDownloadBySignedURL(variables: GenerateCohortFilePreSignedUrlMutationVariables): Promise<void> {
    try {
      const response = await this.generateCohortFilePreSignedUrl(variables);
      const downloadBtn: HTMLAnchorElement = document.createElement('a');
      downloadBtn.setAttribute('href', response?.generateCohortFilePreSignedUrl as string);
      downloadBtn.setAttribute('download', parseFileName(variables.fileId));
      document.body.appendChild(downloadBtn);
      downloadBtn.click();
      document.body.removeChild(downloadBtn);
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getCohortFileMetadata(
    variables: GetCohortFileMetadataQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<GetCohortFileMetadataQuery['getCohortFileMetadata'] | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GetCohortFileMetadataDocument,
        variables,
        context,
      });
      return response.data.getCohortFileMetadata;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}
