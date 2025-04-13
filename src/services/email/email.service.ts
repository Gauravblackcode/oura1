import {
  GeneratePreSignedUrlFromEmailLinkDocument,
  GeneratePreSignedUrlFromEmailLinkQuery,
  GeneratePreSignedUrlFromEmailLinkQueryVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class EmailService {
  async generatePreSignedUrlFromLink(
    variables: GeneratePreSignedUrlFromEmailLinkQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<GeneratePreSignedUrlFromEmailLinkQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GeneratePreSignedUrlFromEmailLinkDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while fetching presigned url');
      logger.error(error);
      return undefined;
    }
  }
}
