import { 
  CreateNoteDocument, 
  CreateNoteMutation, 
  CreateNoteMutationVariables,
  DeleteNoteDocument, 
  DeleteNoteMutation, 
  DeleteNoteMutationVariables,
  NotesDocument, 
  NotesQuery, 
  NotesQueryVariables,
  NoteDocument,
  NoteQuery, 
  NoteQueryVariables,
  UpdateNoteDocument,
  UpdateNoteMutation,
  UpdateNoteMutationVariables
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

export default class NotesService {
  async getNotes(
    variables: NotesQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<NotesQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: NotesDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async getNoteById(
    variables: NoteQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<NoteQuery | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: NoteDocument,
        variables,
        context,
      });
      return response.data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async createNote(
    variables: CreateNoteMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<CreateNoteMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: CreateNoteDocument,
        variables,
        context,
      });
      return response.data?.createNote || undefined;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async updateNote(
    variables: UpdateNoteMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<UpdateNoteMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: UpdateNoteDocument,
        variables,
        context,
      });
      return response.data?.updateNote || undefined;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async deleteNote(
    variables: DeleteNoteMutationVariables,
    context?: AdvanceApolloContext,
  ): Promise<DeleteNoteMutation | undefined> {
    try {
      const response = await GRAPHQL_CLIENT.mutate({
        mutation: DeleteNoteDocument,
        variables,
        context,
      });
      return response.data?.deleteNote || undefined;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
} 