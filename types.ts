import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export enum ActionType {
  ChangeInDueDate = 'CHANGE_IN_DUE_DATE',
  GoalCreation = 'GOAL_CREATION',
  StatusUpdate = 'STATUS_UPDATE',
  TaskCreation = 'TASK_CREATION'
}

export type ActivityLog = {
  __typename?: 'ActivityLog';
  _id: Scalars['String']['output'];
  actionType?: Maybe<ActionType>;
  goalId?: Maybe<Scalars['String']['output']>;
  module?: Maybe<Scalars['String']['output']>;
  newValue?: Maybe<Scalars['String']['output']>;
  prevValue?: Maybe<Scalars['String']['output']>;
  taskId?: Maybe<Scalars['String']['output']>;
};

export type ArrayFilterDto = {
  field: Scalars['String']['input'];
  value?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AssessmentQuestion = {
  __typename?: 'AssessmentQuestion';
  _id: Scalars['String']['output'];
  answer?: Maybe<Scalars['JSON']['output']>;
  measurement: Scalars['String']['output'];
  options: Scalars['JSON']['output'];
  question: Scalars['String']['output'];
};

export type AssessmentQuestionsResponse = {
  __typename?: 'AssessmentQuestionsResponse';
  data: Array<AssessmentQuestion>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type BooleanFilterDto = {
  field: Scalars['String']['input'];
  value: Scalars['Boolean']['input'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  createdAt: Scalars['DateTime']['output'];
  message: Scalars['String']['output'];
  role: Scalars['String']['output'];
  sessionId?: Maybe<Scalars['String']['output']>;
  threadId: Scalars['String']['output'];
};

export type ChatMessagesResponse = {
  __typename?: 'ChatMessagesResponse';
  data: Array<ChatMessage>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type ChatThread = {
  __typename?: 'ChatThread';
  createdAt: Scalars['DateTime']['output'];
  lastMessage?: Maybe<ChatMessage>;
  threadId: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type ChatThreadsResponse = {
  __typename?: 'ChatThreadsResponse';
  data: Array<ChatThread>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type CheckListItem = {
  __typename?: 'CheckListItem';
  _id: Scalars['String']['output'];
  closedAt?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']['output']>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']['output']>;
  isClosed: Scalars['Boolean']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type CheckListItemResponse = {
  __typename?: 'CheckListItemResponse';
  data: Array<CheckListItem>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type CommonRecurrenceDetails = {
  daysOfWeek?: InputMaybe<DaysOfWeek>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  frequency: Frequency;
  hour?: InputMaybe<Scalars['Float']['input']>;
  interval?: InputMaybe<Scalars['Float']['input']>;
  minute: Scalars['Float']['input'];
};

export type CreateChecklistItemDto = {
  closedAt?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  eventId?: InputMaybe<Scalars['String']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isClosed?: InputMaybe<Scalars['Boolean']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEventDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  endedAt?: InputMaybe<Scalars['DateTime']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  noteIds?: InputMaybe<Array<Scalars['String']['input']>>;
  placeholder?: InputMaybe<Scalars['Boolean']['input']>;
  recurrenceDetails?: InputMaybe<CommonRecurrenceDetails>;
  scheduledEndsAt: Scalars['DateTime']['input'];
  scheduledStartsAt: Scalars['DateTime']['input'];
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateGoalDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  recurrenceDetails?: InputMaybe<CommonRecurrenceDetails>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<GoalStatus>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateMilestoneDto = {
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type CreateNoteDto = {
  content?: InputMaybe<Scalars['String']['input']>;
  eventIds?: InputMaybe<Array<Scalars['String']['input']>>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateReminderDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  scheduledAt: Scalars['DateTime']['input'];
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateTagDto = {
  color: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateTaskDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<TaskPriority>;
  recurrenceDetails?: InputMaybe<CommonRecurrenceDetails>;
  status?: InputMaybe<TaskStatus>;
  title: Scalars['String']['input'];
};

export enum DaysOfWeek {
  Fri = 'FRI',
  Mon = 'MON',
  Sat = 'SAT',
  Sun = 'SUN',
  Thurs = 'THURS',
  Tue = 'TUE',
  Wed = 'WED'
}

export type Event = {
  __typename?: 'Event';
  _id: Scalars['String']['output'];
  checkList?: Maybe<Array<CheckListItem>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endedAt?: Maybe<Scalars['String']['output']>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  isGeneratedByAime?: Maybe<Scalars['Boolean']['output']>;
  noteIds?: Maybe<Array<Scalars['String']['output']>>;
  notes?: Maybe<Array<Note>>;
  recurrenceDetails?: Maybe<RecurrenceDetails>;
  scheduledEndsAt: Scalars['String']['output'];
  scheduledStartsAt: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Tag>>;
  taskIds?: Maybe<Array<Scalars['String']['output']>>;
  tasks?: Maybe<Array<Task>>;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type EventResponse = {
  __typename?: 'EventResponse';
  data: Array<Event>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type FieldValueBetweenFilterDto = {
  field: Scalars['String']['input'];
  fromValue: Scalars['String']['input'];
  toValue: Scalars['String']['input'];
};

export type FiltersDto = {
  and_?: InputMaybe<Array<FiltersDto>>;
  betweenFields?: InputMaybe<ValueBetweenFieldsFilterDto>;
  betweenValues?: InputMaybe<FieldValueBetweenFilterDto>;
  boolean?: InputMaybe<BooleanFilterDto>;
  contains?: InputMaybe<GenericFilterDto>;
  eq?: InputMaybe<GenericFilterDto>;
  exists?: InputMaybe<BooleanFilterDto>;
  gt?: InputMaybe<GenericFilterDto>;
  gte?: InputMaybe<GenericFilterDto>;
  in_?: InputMaybe<ArrayFilterDto>;
  lt?: InputMaybe<GenericFilterDto>;
  lte?: InputMaybe<GenericFilterDto>;
  ne?: InputMaybe<GenericFilterDto>;
  nin?: InputMaybe<ArrayFilterDto>;
  or_?: InputMaybe<Array<FiltersDto>>;
};

export enum Frequency {
  Custom = 'CUSTOM',
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Once = 'ONCE',
  Weekly = 'WEEKLY'
}

export type GenericFilterDto = {
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Goal = {
  __typename?: 'Goal';
  _id: Scalars['String']['output'];
  activityLogs?: Maybe<Array<ActivityLog>>;
  checkList?: Maybe<Array<CheckListItem>>;
  completedTaskCount?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Event>>;
  inProgressTaskCount?: Maybe<Scalars['Float']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  isGeneratedByAime?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Array<Note>>;
  recurrenceDetails?: Maybe<RecurrenceDetails>;
  startDate?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Tag>>;
  taskIds?: Maybe<Array<Scalars['String']['output']>>;
  tasks?: Maybe<Array<Task>>;
  title: Scalars['String']['output'];
  totalTaskCount?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export enum GoalStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Overdue = 'OVERDUE',
  Todo = 'TODO'
}

export type GoalsResponse = {
  __typename?: 'GoalsResponse';
  data: Array<Goal>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type LoginDto = {
  device: SessionDeviceDto;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponseDto = {
  __typename?: 'LoginResponseDto';
  accessToken: Scalars['String']['output'];
  idToken: Scalars['String']['output'];
  user: User;
};

export type Milestone = {
  __typename?: 'Milestone';
  _id: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  goalId?: Maybe<Scalars['String']['output']>;
  isCompleted: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type MilestoneResponse = {
  __typename?: 'MilestoneResponse';
  data: Array<Milestone>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  answerAssessmentQuestion: Scalars['Boolean']['output'];
  createCheckListItem: CheckListItem;
  createEvent: Event;
  createGoal: Goal;
  createMilestone: Milestone;
  createNote: Note;
  createReminder: Reminder;
  createTag: Tag;
  createTask: Task;
  deleteChatThread: Scalars['Boolean']['output'];
  deleteCheckListItem: CheckListItem;
  deleteEvent: Scalars['Boolean']['output'];
  deleteGoal: Scalars['Boolean']['output'];
  deleteMilestone: Milestone;
  deleteMyAccount: Scalars['Boolean']['output'];
  deleteNote: Note;
  deleteReminder: Reminder;
  deleteTag: Tag;
  deleteTask: Task;
  login: LoginResponseDto;
  logout: Scalars['Boolean']['output'];
  removeInvitation: Scalars['Boolean']['output'];
  sendForgotPasswordEmail: User;
  sendInvitation: UserInvitation;
  sendVerificationEmail: User;
  setPassword: User;
  signup: LoginResponseDto;
  updateChatThread: ChatThread;
  updateCheckListItem: CheckListItem;
  updateEvent: Event;
  updateGoal?: Maybe<Goal>;
  updateMilestone: Milestone;
  updateNewPassword: User;
  updateNote: Note;
  updatePassword: User;
  updateReminder: Reminder;
  updateTag: Tag;
  updateTask: Task;
  updateUser: User;
  /** Update user settings */
  updateUserSettings: UserSettingsResponse;
  validateEmailToken: User;
  verifyEmailAddress: User;
};


export type MutationAnswerAssessmentQuestionArgs = {
  answer: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
};


export type MutationCreateCheckListItemArgs = {
  createItemDto: CreateChecklistItemDto;
};


export type MutationCreateEventArgs = {
  createEventDto: CreateEventDto;
};


export type MutationCreateGoalArgs = {
  createGoalDto: CreateGoalDto;
};


export type MutationCreateMilestoneArgs = {
  createMilestoneDto: CreateMilestoneDto;
};


export type MutationCreateNoteArgs = {
  createNoteDto: CreateNoteDto;
};


export type MutationCreateReminderArgs = {
  createReminderDto: CreateReminderDto;
};


export type MutationCreateTagArgs = {
  createTagDto: CreateTagDto;
};


export type MutationCreateTaskArgs = {
  createTaskDto: CreateTaskDto;
};


export type MutationDeleteChatThreadArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCheckListItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteGoalArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMilestoneArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteNoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteReminderArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  payload: LoginDto;
};


export type MutationRemoveInvitationArgs = {
  invitationId: Scalars['String']['input'];
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendInvitationArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendVerificationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetPasswordArgs = {
  setPasswordDto: SetPasswordDto;
};


export type MutationSignupArgs = {
  payload: SignupDto;
};


export type MutationUpdateChatThreadArgs = {
  id: Scalars['String']['input'];
  updateChatThreadDto: UpdateChatThreadDto;
};


export type MutationUpdateCheckListItemArgs = {
  id: Scalars['String']['input'];
  updateItemDto: UpdateChecklistItemDto;
};


export type MutationUpdateEventArgs = {
  id: Scalars['String']['input'];
  updateEventDto: UpdateEventDto;
};


export type MutationUpdateGoalArgs = {
  id: Scalars['String']['input'];
  updateGoalDto: UpdateGoalDto;
};


export type MutationUpdateMilestoneArgs = {
  id: Scalars['String']['input'];
  updateMilestoneDto: UpdateMilestoneDto;
};


export type MutationUpdateNewPasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  resetCode: Scalars['String']['input'];
};


export type MutationUpdateNoteArgs = {
  id: Scalars['String']['input'];
  updateNoteDto: UpdateNoteDto;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordDto: UpdatePasswordDto;
};


export type MutationUpdateReminderArgs = {
  id: Scalars['String']['input'];
  updateReminderDto: UpdateReminderDto;
};


export type MutationUpdateTagArgs = {
  id: Scalars['String']['input'];
  updateTagDto: UpdateTagDto;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['String']['input'];
  updateTaskDto: UpdateTaskDto;
};


export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDto;
};


export type MutationUpdateUserSettingsArgs = {
  settings: Scalars['JSON']['input'];
};


export type MutationValidateEmailTokenArgs = {
  emailToken: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyEmailAddressArgs = {
  emailToken: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Note = {
  __typename?: 'Note';
  _id: Scalars['String']['output'];
  checkList?: Maybe<Array<CheckListItem>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  eventIds?: Maybe<Array<Scalars['String']['output']>>;
  events?: Maybe<Array<Event>>;
  goal?: Maybe<Goal>;
  goalId: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isGeneratedByAime?: Maybe<Scalars['Boolean']['output']>;
  tagIds?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Tag>>;
  taskIds?: Maybe<Array<Scalars['String']['output']>>;
  tasks?: Maybe<Array<Task>>;
  title?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type NoteResponse = {
  __typename?: 'NoteResponse';
  data: Array<Note>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type PaginationDto = {
  pageNo: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Get all Assessment Questions */
  assessmentQuestions: AssessmentQuestionsResponse;
  chatMessages: ChatMessagesResponse;
  chatThreadById?: Maybe<ChatThread>;
  chatThreads: ChatThreadsResponse;
  checklistItem: CheckListItem;
  checklistItems: CheckListItemResponse;
  event: Event;
  eventCount: Scalars['Float']['output'];
  events: EventResponse;
  getMilestoneById: Milestone;
  getMilestones: MilestoneResponse;
  getReminderById: Reminder;
  getReminders: ReminderResponse;
  getTagById: Tag;
  getTags: TagResponse;
  goal: Goal;
  goalCount: Scalars['Float']['output'];
  goals: GoalsResponse;
  /** Get all invitations for the organization */
  invitations: UserInvitationsResponse;
  me: User;
  name: Scalars['String']['output'];
  note: Note;
  noteCount: Scalars['Float']['output'];
  notes: NoteResponse;
  personalityReport: UserPersonalityReportResponse;
  task: Task;
  taskCount: Scalars['Float']['output'];
  tasks: TaskResponse;
  /** Get user settings */
  userSettings: UserSettingsResponse;
  users: UserResponse;
  version: Scalars['String']['output'];
};


export type QueryAssessmentQuestionsArgs = {
  stage: Scalars['String']['input'];
};


export type QueryChatMessagesArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryChatThreadByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryChatThreadsArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryChecklistItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryChecklistItemsArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryEventArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventCountArgs = {
  filters?: InputMaybe<FiltersDto>;
};


export type QueryEventsArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryGetMilestoneByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetMilestonesArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryGetReminderByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetRemindersArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryGetTagByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTagsArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryGoalArgs = {
  id: Scalars['String']['input'];
};


export type QueryGoalCountArgs = {
  filters?: InputMaybe<FiltersDto>;
};


export type QueryGoalsArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryInvitationsArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryNoteArgs = {
  id: Scalars['String']['input'];
};


export type QueryNoteCountArgs = {
  filters?: InputMaybe<FiltersDto>;
};


export type QueryNotesArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryTaskArgs = {
  id: Scalars['String']['input'];
};


export type QueryTaskCountArgs = {
  filters?: InputMaybe<FiltersDto>;
};


export type QueryTasksArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};


export type QueryUsersArgs = {
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
};

export type RecurrenceDetails = {
  __typename?: 'RecurrenceDetails';
  daysOfWeek?: Maybe<Array<DaysOfWeek>>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  frequency: Frequency;
  hour?: Maybe<Scalars['Float']['output']>;
  interval?: Maybe<Scalars['Float']['output']>;
  minute: Scalars['Float']['output'];
};

export type Reminder = {
  __typename?: 'Reminder';
  _id: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eventId: Scalars['String']['output'];
  goalId?: Maybe<Scalars['String']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  scheduledAt: Scalars['String']['output'];
  tagIds?: Maybe<Array<Scalars['String']['output']>>;
  taskId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type ReminderResponse = {
  __typename?: 'ReminderResponse';
  data: Array<Reminder>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type SessionDeviceDto = {
  apnsToken?: InputMaybe<Scalars['String']['input']>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  model: Scalars['String']['input'];
  osVersion: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  screenResolution?: InputMaybe<Scalars['String']['input']>;
  userAgent: Scalars['String']['input'];
};

export type SetPasswordDto = {
  newPassword: Scalars['String']['input'];
};

export type SignupDto = {
  additionalMessage?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth: Scalars['DateTime']['input'];
  device: SessionDeviceDto;
  email: Scalars['String']['input'];
  heardAboutUs?: InputMaybe<Scalars['String']['input']>;
  invitationToken?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  subscribeToNewsletters?: InputMaybe<Scalars['Boolean']['input']>;
  usageInterest?: InputMaybe<Scalars['String']['input']>;
};

export type SortDto = {
  field: Scalars['String']['input'];
  order: SortOrder;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['String']['output'];
  color: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  userId?: Maybe<Scalars['String']['output']>;
};

export type TagResponse = {
  __typename?: 'TagResponse';
  data: Array<Tag>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['String']['output'];
  activityLogs?: Maybe<Array<ActivityLog>>;
  checkList?: Maybe<Array<CheckListItem>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  events?: Maybe<Array<Event>>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  isGeneratedByAime?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Array<Note>>;
  priority: TaskPriority;
  recurrenceDetails?: Maybe<RecurrenceDetails>;
  status: TaskStatus;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export enum TaskPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type TaskResponse = {
  __typename?: 'TaskResponse';
  data: Array<Task>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export enum TaskStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Overdue = 'OVERDUE',
  Todo = 'TODO'
}

export type UpdateChatThreadDto = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChecklistItemDto = {
  closedAt?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isClosed?: InputMaybe<Scalars['Boolean']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  endedAt?: InputMaybe<Scalars['DateTime']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  noteIds?: InputMaybe<Array<Scalars['String']['input']>>;
  recurrenceDetails?: InputMaybe<CommonRecurrenceDetails>;
  scheduledEndsAt?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledStartsAt?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGoalDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  recurrenceDetails?: InputMaybe<CommonRecurrenceDetails>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<GoalStatus>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMilestoneDto = {
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNoteDto = {
  content?: InputMaybe<Scalars['String']['input']>;
  eventIds?: InputMaybe<Array<Scalars['String']['input']>>;
  goalId: Scalars['String']['input'];
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePasswordDto = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdateReminderDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  scheduledAt?: InputMaybe<Scalars['DateTime']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  taskId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagDto = {
  color?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  eventIds?: InputMaybe<Array<Scalars['String']['input']>>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  noteIds?: InputMaybe<Array<Scalars['String']['input']>>;
  priority?: InputMaybe<TaskPriority>;
  recurrenceDetails?: InputMaybe<CommonRecurrenceDetails>;
  status?: InputMaybe<TaskStatus>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserDto = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  deactivationReasonCode?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  invalidEmailVerificationAttempts: Scalars['Float']['output'];
  invalidLoginAttempts: Scalars['Float']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  occupation?: Maybe<Scalars['String']['output']>;
  personalityReportUrl?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
};

export type UserInvitation = {
  __typename?: 'UserInvitation';
  _id: Scalars['String']['output'];
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  declinedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  invitationCode: Scalars['String']['output'];
  invitedAt?: Maybe<Scalars['DateTime']['output']>;
  inviterId: Scalars['String']['output'];
  status: UserInvitationStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserInvitationStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING'
}

export type UserInvitationsResponse = {
  __typename?: 'UserInvitationsResponse';
  data: Array<UserInvitation>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type UserPersonalityReport = {
  __typename?: 'UserPersonalityReport';
  url: Scalars['String']['output'];
};

export type UserPersonalityReportResponse = {
  __typename?: 'UserPersonalityReportResponse';
  data: UserPersonalityReport;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  data: Array<User>;
  pageNo?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalRecords: Scalars['Int']['output'];
};

export type UserSettingsResponse = {
  __typename?: 'UserSettingsResponse';
  data: Scalars['JSON']['output'];
};

export type ValueBetweenFieldsFilterDto = {
  fromField: Scalars['String']['input'];
  toField: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type SignupMutationVariables = Exact<{
  payload: SignupDto;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'LoginResponseDto', accessToken: string, idToken: string, user: { __typename?: 'User', _id: string, dateOfBirth?: any | null, deactivationReasonCode?: string | null, email: string, emailVerified: boolean, invalidEmailVerificationAttempts: number, invalidLoginAttempts: number, lastLoginAt?: any | null, name: string, occupation?: string | null, personalityReportUrl?: string | null, phone?: string | null, profilePicture?: string | null } } };

export type LoginMutationVariables = Exact<{
  payload: LoginDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseDto', accessToken: string, idToken: string, user: { __typename?: 'User', _id: string, dateOfBirth?: any | null, deactivationReasonCode?: string | null, email: string, emailVerified: boolean, invalidEmailVerificationAttempts: number, invalidLoginAttempts: number, lastLoginAt?: any | null, name: string, occupation?: string | null, personalityReportUrl?: string | null, phone?: string | null, profilePicture?: string | null } } };

export type GoalsQueryVariables = Exact<{
  filters?: InputMaybe<FiltersDto>;
  sort?: InputMaybe<SortDto>;
  pagination?: InputMaybe<PaginationDto>;
}>;


export type GoalsQuery = { __typename?: 'Query', goals: { __typename?: 'GoalsResponse', pageNo?: number | null, pageSize?: number | null, totalRecords: number, data: Array<{ __typename?: 'Goal', _id: string, completedTaskCount?: number | null, createdAt: any, deletedAt?: any | null, description?: string | null, endDate?: string | null, inProgressTaskCount?: number | null, isDeleted: boolean, isGeneratedByAime?: boolean | null, startDate?: string | null, tagIds?: Array<string> | null, taskIds?: Array<string> | null, title: string, totalTaskCount?: number | null, updatedAt: any, userId: string, activityLogs?: Array<{ __typename?: 'ActivityLog', _id: string, actionType?: ActionType | null, goalId?: string | null, module?: string | null, newValue?: string | null, prevValue?: string | null, taskId?: string | null }> | null, checkList?: Array<{ __typename?: 'CheckListItem', _id: string, closedAt?: string | null, content: string, deletedAt?: string | null, eventId?: string | null, goalId?: string | null, isClosed: boolean, isDeleted?: boolean | null, taskId?: string | null, userId: string, event?: { __typename?: 'Event', _id: string, createdAt: any, deletedAt?: string | null, description?: string | null, endedAt?: string | null, goalId?: string | null, isDeleted: boolean, isGeneratedByAime?: boolean | null, noteIds?: Array<string> | null, scheduledEndsAt: string, scheduledStartsAt: string, startedAt?: string | null, tagIds?: Array<string> | null, taskIds?: Array<string> | null, title: string, userId: string, recurrenceDetails?: { __typename?: 'RecurrenceDetails', daysOfWeek?: Array<DaysOfWeek> | null, endDate?: any | null, frequency: Frequency, hour?: number | null, interval?: number | null, minute: number } | null } | null }> | null }> } };

export type GoalQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GoalQuery = { __typename?: 'Query', goal: { __typename?: 'Goal', _id: string, completedTaskCount?: number | null, createdAt: any, deletedAt?: any | null, description?: string | null, endDate?: string | null, inProgressTaskCount?: number | null, isDeleted: boolean, isGeneratedByAime?: boolean | null, startDate?: string | null, tagIds?: Array<string> | null, taskIds?: Array<string> | null, title: string, totalTaskCount?: number | null, updatedAt: any, userId: string, activityLogs?: Array<{ __typename?: 'ActivityLog', _id: string, actionType?: ActionType | null, goalId?: string | null, module?: string | null, newValue?: string | null, prevValue?: string | null, taskId?: string | null }> | null, checkList?: Array<{ __typename?: 'CheckListItem', _id: string, closedAt?: string | null, content: string, deletedAt?: string | null, eventId?: string | null, goalId?: string | null, isClosed: boolean, isDeleted?: boolean | null, taskId?: string | null, userId: string, event?: { __typename?: 'Event', _id: string, createdAt: any, deletedAt?: string | null, description?: string | null, endedAt?: string | null, goalId?: string | null, isDeleted: boolean, isGeneratedByAime?: boolean | null, noteIds?: Array<string> | null, scheduledEndsAt: string, scheduledStartsAt: string, startedAt?: string | null, tagIds?: Array<string> | null, taskIds?: Array<string> | null, title: string, userId: string, recurrenceDetails?: { __typename?: 'RecurrenceDetails', daysOfWeek?: Array<DaysOfWeek> | null, endDate?: any | null, frequency: Frequency, hour?: number | null, interval?: number | null, minute: number } | null } | null }> | null } };

export type CreateGoalMutationVariables = Exact<{
  createGoalDto: CreateGoalDto;
}>;


export type CreateGoalMutation = { __typename?: 'Mutation', createGoal: { __typename?: 'Goal', _id: string } };

export type DeleteGoalMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteGoalMutation = { __typename?: 'Mutation', deleteGoal: boolean };

export type UpdateGoalMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateGoalDto: UpdateGoalDto;
}>;


export type UpdateGoalMutation = { __typename?: 'Mutation', updateGoal?: { __typename?: 'Goal', _id: string } | null };


export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"idToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"deactivationReasonCode"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"invalidEmailVerificationAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"invalidLoginAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"personalityReportUrl"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"idToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"deactivationReasonCode"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"invalidEmailVerificationAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"invalidLoginAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"personalityReportUrl"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GoalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Goals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FiltersDto"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDto"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageNo"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completedTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"inProgressTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"isGeneratedByAime"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"tagIds"}},{"kind":"Field","name":{"kind":"Name","value":"taskIds"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activityLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"goalId"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"newValue"}},{"kind":"Field","name":{"kind":"Name","value":"prevValue"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"checkList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"goalId"}},{"kind":"Field","name":{"kind":"Name","value":"isClosed"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"goalId"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"isGeneratedByAime"}},{"kind":"Field","name":{"kind":"Name","value":"noteIds"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEndsAt"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStartsAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"tagIds"}},{"kind":"Field","name":{"kind":"Name","value":"taskIds"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daysOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"hour"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"minute"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GoalsQuery, GoalsQueryVariables>;
export const GoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Goal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completedTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"inProgressTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"isGeneratedByAime"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"tagIds"}},{"kind":"Field","name":{"kind":"Name","value":"taskIds"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activityLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"goalId"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"newValue"}},{"kind":"Field","name":{"kind":"Name","value":"prevValue"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"checkList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"goalId"}},{"kind":"Field","name":{"kind":"Name","value":"isClosed"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"goalId"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"isGeneratedByAime"}},{"kind":"Field","name":{"kind":"Name","value":"noteIds"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEndsAt"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStartsAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"tagIds"}},{"kind":"Field","name":{"kind":"Name","value":"taskIds"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daysOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"hour"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"minute"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GoalQuery, GoalQueryVariables>;
export const CreateGoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGoal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createGoalDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGoalDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createGoalDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createGoalDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateGoalMutation, CreateGoalMutationVariables>;
export const DeleteGoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGoal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteGoalMutation, DeleteGoalMutationVariables>;
export const UpdateGoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGoal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateGoalDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGoalDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateGoalDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateGoalDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateGoalMutation, UpdateGoalMutationVariables>;