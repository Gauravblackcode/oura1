    import { CreateGoalDocument, CreateGoalMutation, CreateGoalMutationVariables, DeleteGoalDocument, DeleteGoalMutation, DeleteGoalMutationVariables, GoalsDocument, GoalsQuery, GoalsQueryVariables, GoalDocument,  GoalQuery, GoalQueryVariables } from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class GoalsService {
  async getGoals(
    variables: GoalsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<GoalsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: GoalsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getGoalById(
    variables: GoalQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<GoalQuery | undefined> {
    try {       
      const response = await GRAPHQL_CLIENT.query({
        query: GoalDocument,
        variables,  
        context,
      });
      return response.data as GoalQuery;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async createGoal(
    variables: CreateGoalMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<CreateGoalMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateGoalDocument,
        variables,
        context,
      });
      return response.data as CreateGoalMutation;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async deleteGoal(
    variables: DeleteGoalMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<DeleteGoalMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: DeleteGoalDocument,
        variables,
        context,
      });
      return response.data as DeleteGoalMutation;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  } 
}
