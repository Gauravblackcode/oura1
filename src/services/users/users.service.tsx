import { ApolloQueryResult, FetchResult } from '@apollo/client';
import {
  AcceptTermsAndConditionsDocument,
  AcceptTermsAndConditionsMutationVariables,
  AcceptTermsAndConditionsUserAdvancedDocument,
  CreateUserAdvancedDocument,
  CreateUserAdvancedMutationVariables,
  CreateUserGroupDocument,
  CreateUserGroupMutation,
  CreateUserGroupMutationVariables,
  DeleteUserByIdDocument,
  DeleteUserByIdMutation,
  Maybe,
  GenerateApiKeyDocument,
  GenerateApiKeyMutation,
  GenerateApiKeyMutationVariables,
  InValidateApiKeyDocument,
  InValidateApiKeyMutation,
  InValidateApiKeyMutationVariables,
  PermissionsByUserIdDocument,
  ResendInviteDocument,
  ResendInviteMutation,
  ToggleUserActiveByIdDocument,
  ToggleUserActiveByIdMutation,
  ToggleUserActiveByIdMutationVariables,
  UpdateUserAdvancedDocument,
  UpdateUserAdvancedMutationVariables,
  UpdateUserGroupDocument,
  UpdateUserGroupMutation,
  UpdateUserGroupMutationVariables,
  User,
  UserAdvancedByIdDocument,
  UserAdvancedByIdQuery,
  UserAdvancedByIdQueryVariables,
  UserAdvancedByIdsDocument,
  UserAdvancedByIdsQuery,
  UserAdvancedByIdsQueryVariables,
  UserAdvancedFilters,
  UserByTokenDocument,
  UserGroupByIdDocument,
  UserGroupsDocument,
  UserGroupsQuery,
  UserGroupsQueryVariables,
  UsersAdvancedDocument,
  UsersAdvancedQuery,
  UsersNameListDocument,
  UsersNameListQuery,
  UsersNameListQueryVariables,
  UserGroupByIdQueryVariables,
  UserGroupByIdQuery,
  UpdateSelfDocument,
  UpdateSelfMutationVariables,
} from 'types';
import logger from '@/common/logger';
import GRAPHQL_CLIENT from '@/services/network/graphql.service';
import { DEFAULT_PASSWORD } from '@/common/constants';
import { setUser } from '@/redux/actions';
import { generatePassword } from '@/common/helpers';
import { AdvanceApolloContext } from '@/index';

interface GetAllUsers {
  page?: number;
  pageSize?: number;
  filters?: UserAdvancedFilters & { walletId?: string };
  sort?: string;
}

export default class UsersService {
  async getAllUsers(
    options?: GetAllUsers,
    context?: AdvanceApolloContext,
  ): Promise<ApolloQueryResult<UsersAdvancedQuery>> {
    try {
      const { page = 1, pageSize = 10, filters, sort } = options || {};
      const response: ApolloQueryResult<UsersAdvancedQuery> = await GRAPHQL_CLIENT.query({
        query: UsersAdvancedDocument,
        variables: {
          page,
          pageSize,
          filters: filters || {},
          sort: sort || '',
        },
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching users');
      logger.error(err);
      throw err;
    }
  }

  async getUsersNameList(
    variables: UsersNameListQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<UsersNameListQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UsersNameListDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getAllTeams(options?: GetAllUsers): Promise<Record<string, any>> {
    try {
      const { page = 1, pageSize = 10 }: any = options || {};
      const response = await GRAPHQL_CLIENT.query({
        query: UserGroupsDocument,
        variables: {
          page,
          pageSize,
          filters: {
            search: options?.filters?.search,
            ...(options?.filters?.walletId && {
              walletId: options?.filters?.walletId,
            }),
          },
        },
      });
      return response.data.userGroups;
    } catch (err) {
      logger.error('Error while fetching users');
      logger.error(err);
      throw err;
    }
  }

  async getAllTeamsTyped(
    variables: UserGroupsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<UserGroupsQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UserGroupsDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async createUser(args: Record<string, any>): Promise<Record<string, any>> {
    try {
      const userInput: CreateUserAdvancedMutationVariables = {
        name: `${args.firstName} ${args.lastName}`,
        accountId: args.accountId,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        userType: args.userType.toUpperCase(),
        phone: '000-000-0000',
        roleType: args.roleType.toUpperCase(),
        timeZoneName: args?.timeZoneName,
        password: generatePassword(),
        active: true,
        enableTwoFactorAuthentication: false,
        isFirstTimeLogin: true,
        useCustomBranding: false,
        permissions: args.permissions,
        advertiserAccess: args.advertiserAccess || null,
        allowAllAdvertisers: args.allowAllAdvertisers || false,
      };
      const userResponse = await GRAPHQL_CLIENT.mutate({
        mutation: CreateUserAdvancedDocument,
        variables: userInput,
      });
      return userResponse;
    } catch (err) {
      logger.error('Error while creating user');
      logger.error(err);
      throw err;
    }
  }

  async updateUser(id: string, args: Record<string, any>): Promise<Record<string, any>> {
    try {
      const userInput: UpdateUserAdvancedMutationVariables = {
        id,
        name: `${args.firstName} ${args.lastName}`,
        accountId: args.accountId,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        userType: args.userType.toUpperCase(),
        phone: '000-000-0000',
        roleType: args.roleType.toUpperCase(),
        timeZoneName: args?.timeZoneName,
        password: DEFAULT_PASSWORD,
        active: true,
        enableTwoFactorAuthentication: false,
        isFirstTimeLogin: true,
        useCustomBranding: false,
        permissions: args.permissions,
        acceptedTermsAndConditions: args.acceptedTermsAndConditions,
        allowAllAdvertisers: args.allowAllAdvertisers || false,
        ...(!(args.allowAllAdvertisers || false) && {
          advertiserAccess: args.advertiserAccess,
        }),
      };
      const userResponse = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateUserAdvancedDocument,
        variables: userInput,
      });
      return userResponse;
    } catch (err) {
      logger.error('Error while creating user');
      logger.error(err);
      throw err;
    }
  }
  async updateSelfUser(userId: string, args: Record<string, any>): Promise<Record<string, any>> {
    try {
      const variables: UpdateSelfMutationVariables = {
        id: userId,
        selfUpdateInput: {
          name: `${args.firstName} ${args.lastName}`,
          firstName: args.firstName,
          lastName: args.lastName,
          timeZoneName: args?.timeZoneName,
        },
      };
      const userResponse = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateSelfDocument,
        variables,
      });
      return userResponse;
    } catch (err) {
      logger.error('Error while creating user');
      logger.error(err);
      throw err;
    }
  }

  async createTeam(variables: CreateUserGroupMutationVariables): Promise<Maybe<CreateUserGroupMutation> | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateUserGroupDocument,
        variables,
      });
      return response.data;
    } catch (err) {
      logger.error('Error while creating team');
      logger.error(err);
      return undefined;
    }
  }

  async updateTeam(variables: UpdateUserGroupMutationVariables): Promise<Maybe<UpdateUserGroupMutation> | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateUserGroupDocument,
        variables,
      });
      return response.data;
    } catch (err) {
      logger.error('Error while updating team user');
      logger.error(err);
      return undefined;
    }
  }

  async getPermissionByUserId(id: string): Promise<Record<string, any>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: PermissionsByUserIdDocument,
        variables: {
          userId: id,
        },
      });
      return response.data.permissionsByUserId;
    } catch (err) {
      logger.error('Error while getting permissionsByUserId');
      logger.error(err);
      throw err;
    }
  }

  async getUserById(variables: UserAdvancedByIdQueryVariables): Promise<ApolloQueryResult<UserAdvancedByIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UserAdvancedByIdDocument,
        variables,
      });
      return response;
    } catch (err) {
      logger.error('Error while getting userById');
      logger.error(err);
      throw err;
    }
  }

  async getUsersByIds(variables: UserAdvancedByIdsQueryVariables): Promise<FetchResult<UserAdvancedByIdsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UserAdvancedByIdsDocument,
        variables,
      });
      return response;
    } catch (error) {
      logger.error('Error while getting userById');
      logger.error(error);
      throw error;
    }
  }

  async suspendUser(id: string): Promise<ApolloQueryResult<DeleteUserByIdMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: DeleteUserByIdDocument,
        variables: {
          id,
        },
      });
      return response;
    } catch (err) {
      logger.error('Error while deleting user by Id');
      logger.error(err);
      throw err;
    }
  }

  async acceptTermsAndConditions(userId: string, accept: boolean): Promise<Record<string, any>> {
    try {
      const variables: AcceptTermsAndConditionsMutationVariables = {
        userId,
        accept,
      };
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: AcceptTermsAndConditionsDocument,
        variables,
      });
      return response;
    } catch (err) {
      logger.error('Error while accepting Terms & condition by Id');
      logger.error(err);
      throw err;
    }
  }

  async acceptTermsAndConditionsAdvanced(userId: string, accept: boolean): Promise<Record<string, any>> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: AcceptTermsAndConditionsUserAdvancedDocument,
        variables: {
          userId,
          accept,
        },
      });
      return response;
    } catch (err) {
      logger.error('Error while accepting Terms & condition by Id');
      logger.error(err);
      throw err;
    }
  }

  async suspendMultipleUser(id: string[]): Promise<ApolloQueryResult<DeleteUserByIdMutation>[]> {
    try {
      const APICalls = id.map(item => this.suspendUser(item));
      const response = await Promise.all(APICalls);
      return response;
    } catch (err) {
      logger.error('Error while deleting user(s) by Id');
      logger.error(err);
      throw err;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UserByTokenDocument,
        context: {
          silent: false,
        },
      });
      const user = response.data.userByToken as User;
      setUser(user);
      return user;
    } catch (err) {
      logger.error('Error while getting current user');
      logger.error(err);
      throw err;
    }
  }

  async resendInvitation(userId: string): Promise<ApolloQueryResult<ResendInviteMutation>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ResendInviteDocument,
        variables: {
          userId,
        },
      });
      return response;
    } catch (err) {
      logger.error('Error while resending the invite');
      logger.error(err);
      throw err;
    }
  }

  async getUserGroupById(
    variables: UserGroupByIdQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<UserGroupByIdQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: UserGroupByIdDocument,
        variables,
        context,
      });
      return response.data;
    } catch (err) {
      logger.error('Error while getting user group by id');
      logger.error(err);
      throw err;
    }
  }

  async toggleUserActiveById(
    variables: ToggleUserActiveByIdMutationVariables,
  ): Promise<ToggleUserActiveByIdMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: ToggleUserActiveByIdDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error('Error while suspending user by Id');
      return undefined;
    }
  }

  async toggleMultipleUserActiveById(
    variables: ToggleUserActiveByIdMutationVariables[],
  ): Promise<(DeleteUserByIdMutation | null | undefined)[]> {
    try {
      const APICalls = variables.map(item => this.toggleUserActiveById(item));
      const response = await Promise.all(APICalls);
      return response;
    } catch (err) {
      logger.error('Error while suspending user(s) by Id');
      logger.error(err);
      throw err;
    }
  }

  async generateApiKey(
    variables?: GenerateApiKeyMutationVariables,
  ): Promise<GenerateApiKeyMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: GenerateApiKeyDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async invalidateApiKey(
    variables?: InValidateApiKeyMutationVariables,
  ): Promise<InValidateApiKeyMutation | null | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: InValidateApiKeyDocument,
        variables,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}
