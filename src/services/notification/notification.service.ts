import { FetchResult } from '@apollo/client';
import {
  Maybe,
  NotificationInput,
  NotificationStatusByTypeDocument,
  NotificationStatusByTypeQuery,
  NotificationsDocument,
  NotificationsQuery,
  NotificationsQueryVariables,
  UnreadNotificationDocument,
  UnreadNotificationQuery,
  UnreadNotificationQueryVariables,
  UpdateAllNotificationsDocument,
  UpdateAllNotificationsMutation,
  UpdateAllNotificationsMutationVariables,
  UpdateNotificationsDocument,
  UpdateNotificationsMutation,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class NotificationService {
  async getAllNotificationStatus(context?: AdvanceApolloContext): Promise<FetchResult<NotificationStatusByTypeQuery>> {
    try {
      return await GRAPHQL_CLIENT.query({
        query: NotificationStatusByTypeDocument,
        context,
      });
    } catch (err) {
      logger.error('Error while getting notification status');
      logger.error(err);
      throw err;
    }
  }

  async getAllNotificationsByType(
    variables: NotificationsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<NotificationsQuery>> {
    try {
      const resp = await GRAPHQL_CLIENT.query({
        query: NotificationsDocument,
        variables,
        context,
      });
      return resp;
    } catch (err) {
      logger.error('Error while getting notifications');
      logger.error(err);
      throw err;
    }
  }

  async getUnreadNotifications(
    variables: UnreadNotificationQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<UnreadNotificationQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UnreadNotificationDocument,
        variables,
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while getting notifications');
      logger.error(err);
      throw err;
    }
  }

  async updateNotifications(
    variables: NotificationInput,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<UpdateNotificationsMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateNotificationsDocument,
        variables: {
          input: { ...variables },
        },
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while updating campaign');
      logger.error(err);
      throw err;
    }
  }

  async updateAll(
    variables: UpdateAllNotificationsMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<Maybe<UpdateAllNotificationsMutation> | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateAllNotificationsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (err) {
      logger.error('Error while updating campaign');
      logger.error(err);
      return undefined;
    }
  }
}
