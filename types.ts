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
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export enum ActionType {
  ChangeInDueDate = 'CHANGE_IN_DUE_DATE',
  GoalCreation = 'GOAL_CREATION',
  StatusUpdate = 'STATUS_UPDATE',
  TaskCreation = 'TASK_CREATION',
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
  /** The field name to filter on */
  field: Scalars['String']['input'];
  /** Array of values to match against */
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
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
  totalRecords: Scalars['Int']['output'];
};

export type BooleanFilterDto = {
  /** The field name to filter on */
  field: Scalars['String']['input'];
  /** Boolean value to match against */
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
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
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
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
  totalRecords: Scalars['Int']['output'];
};

export type CheckListItem = {
  __typename?: 'CheckListItem';
  _id: Scalars['String']['output'];
  closedAt?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']['output']>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']['output']>;
  isClosed: Scalars['Boolean']['output'];
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['String']['output']>;
};

export type CheckListItemResponse = {
  __typename?: 'CheckListItemResponse';
  data: Array<CheckListItem>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
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
  fieldsGeneratedByAI?: InputMaybe<Array<Scalars['String']['input']>>;
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
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  fieldsGeneratedByAI?: InputMaybe<Array<Scalars['String']['input']>>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Priority>;
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
  /** Array of MongoDB record _id */
  eventIds?: InputMaybe<Array<Scalars['String']['input']>>;
  fieldsGeneratedByAI?: InputMaybe<Array<Scalars['String']['input']>>;
  /** MongoDB record _id */
  goalId?: InputMaybe<Scalars['String']['input']>;
  isGeneratedByAime?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of MongoDB record _id */
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Array of MongoDB record _id */
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateNotificationDto = {
  content?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  goalId?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
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
  fieldsGeneratedByAI?: InputMaybe<Array<Scalars['String']['input']>>;
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
  Wed = 'WED',
}

export type Event = {
  __typename?: 'Event';
  _id: Scalars['String']['output'];
  checkList?: Maybe<Array<CheckListItem>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endedAt?: Maybe<Scalars['String']['output']>;
  fieldsGeneratedByAI?: Maybe<Array<Scalars['String']['output']>>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']['output']>;
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
};

export type EventResponse = {
  __typename?: 'EventResponse';
  data: Array<Event>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
  totalRecords: Scalars['Int']['output'];
};

export type FieldValueBetweenFilterDto = {
  /** The field name to filter on */
  field: Scalars['String']['input'];
  /** The start value of the range */
  fromValue: Scalars['String']['input'];
  /** The end value of the range */
  toValue: Scalars['String']['input'];
};

/** A flexible filtering system that supports various comparison operators and logical combinations for querying data */
export type FiltersDto = {
  /** Combines multiple filters with AND logic */
  and_?: InputMaybe<Array<FiltersDto>>;
  /** Matches records where the specified value falls between two field values */
  betweenFields?: InputMaybe<ValueBetweenFieldsFilterDto>;
  /** Matches records where the field value falls between two specified values */
  betweenValues?: InputMaybe<FieldValueBetweenFilterDto>;
  /** Matches records where the field value equals the specified boolean value */
  boolean?: InputMaybe<BooleanFilterDto>;
  /** Matches records where the field value contains the specified substring */
  contains?: InputMaybe<GenericFilterDto>;
  /** Matches records where the field equals the specified value */
  eq?: InputMaybe<GenericFilterDto>;
  /** Matches records where the field exists or does not exist */
  exists?: InputMaybe<BooleanFilterDto>;
  /** Matches records where the field value is greater than the specified value */
  gt?: InputMaybe<GenericFilterDto>;
  /** Matches records where the field value is greater than or equal to the specified value */
  gte?: InputMaybe<GenericFilterDto>;
  /** Matches records where the field value is in the specified array of values */
  in_?: InputMaybe<ArrayFilterDto>;
  /** Matches records where the field value is less than the specified value */
  lt?: InputMaybe<GenericFilterDto>;
  /** Matches records where the field value is less than or equal to the specified value */
  lte?: InputMaybe<GenericFilterDto>;
  /** Matches records where the field does not equal the specified value */
  ne?: InputMaybe<GenericFilterDto>;
  /** Matches records where the field value is not in the specified array of values */
  nin?: InputMaybe<ArrayFilterDto>;
  /** Combines multiple filters with OR logic */
  or_?: InputMaybe<Array<FiltersDto>>;
};

export enum Frequency {
  Custom = 'CUSTOM',
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Once = 'ONCE',
  Weekly = 'WEEKLY',
}

export type GenericFilterDto = {
  /** The field name to filter on */
  field: Scalars['String']['input'];
  /** The value to match against */
  value: Scalars['String']['input'];
};

export type Goal = {
  __typename?: 'Goal';
  _id: Scalars['String']['output'];
  activityLogs?: Maybe<Array<ActivityLog>>;
  checkList?: Maybe<Array<CheckListItem>>;
  completedTaskCount?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Event>>;
  fieldsGeneratedByAI?: Maybe<Array<Scalars['String']['output']>>;
  inProgressTaskCount?: Maybe<Scalars['Float']['output']>;
  isGeneratedByAime?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Array<Note>>;
  priority?: Maybe<Priority>;
  recurrenceDetails?: Maybe<RecurrenceDetails>;
  startDate?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Tag>>;
  taskIds?: Maybe<Array<Scalars['String']['output']>>;
  tasks?: Maybe<Array<Task>>;
  title: Scalars['String']['output'];
  totalTaskCount?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum GoalStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Overdue = 'OVERDUE',
  Todo = 'TODO',
}

export type GoalsResponse = {
  __typename?: 'GoalsResponse';
  data: Array<Goal>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
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
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  goalId?: Maybe<Scalars['String']['output']>;
  isCompleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type MilestoneResponse = {
  __typename?: 'MilestoneResponse';
  data: Array<Milestone>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
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
  createNotification: Notification;
  createReminder: Reminder;
  createTag: Tag;
  /** Create a new task with the provided details */
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
  /** Delete a task by its ID */
  deleteTask: Task;
  login: LoginResponseDto;
  logout: Scalars['Boolean']['output'];
  readAllNotification?: Maybe<Array<Notification>>;
  readNotification?: Maybe<Notification>;
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
  /** Update an existing task with new information */
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

export type MutationCreateNotificationArgs = {
  createNotificationDto: CreateNotificationDto;
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

export type MutationReadNotificationArgs = {
  id: Scalars['String']['input'];
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
  eventIds?: Maybe<Array<Scalars['String']['output']>>;
  events?: Maybe<Array<Event>>;
  fieldsGeneratedByAI?: Maybe<Array<Scalars['String']['output']>>;
  goal?: Maybe<Goal>;
  goalId: Scalars['String']['output'];
  isGeneratedByAime?: Maybe<Scalars['Boolean']['output']>;
  tagIds?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Tag>>;
  taskIds?: Maybe<Array<Scalars['String']['output']>>;
  tasks?: Maybe<Array<Task>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type NoteResponse = {
  __typename?: 'NoteResponse';
  data: Array<Note>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
  totalRecords: Scalars['Int']['output'];
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']['output']>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  readAt?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type NotificationsResponse = {
  __typename?: 'NotificationsResponse';
  data: Array<Notification>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
  totalRecords: Scalars['Int']['output'];
};

/** Defines pagination parameters for querying data, including page number and size */
export type PaginationDto = {
  /** The page number to retrieve (1-based index) */
  pageNo: Scalars['Int']['input'];
  /** Number of records to include in each page */
  pageSize: Scalars['Int']['input'];
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
}

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
  /** Get checklist items for a specific task. If no items exist, they will be generated using the LLM service */
  getChecklistItems: Array<CheckListItem>;
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
  notification: Notification;
  notificationCount: Scalars['Float']['output'];
  notifications: NotificationsResponse;
  personalityReport: UserPersonalityReportResponse;
  /** Get a single task by its unique identifier */
  task: Task;
  /** Get the total count of tasks matching the provided filters */
  taskCount: Scalars['Float']['output'];
  /** Get a paginated list of tasks with optional filtering, sorting, and pagination */
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

export type QueryGetChecklistItemsArgs = {
  taskId: Scalars['String']['input'];
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

export type QueryNotificationArgs = {
  id: Scalars['String']['input'];
};

export type QueryNotificationCountArgs = {
  filters?: InputMaybe<FiltersDto>;
};

export type QueryNotificationsArgs = {
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
  description?: Maybe<Scalars['String']['output']>;
  eventId: Scalars['String']['output'];
  goalId?: Maybe<Scalars['String']['output']>;
  scheduledAt: Scalars['String']['output'];
  tagIds?: Maybe<Array<Scalars['String']['output']>>;
  taskId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ReminderResponse = {
  __typename?: 'ReminderResponse';
  data: Array<Reminder>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
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

/** Defines sorting parameters for querying data, including the field to sort by and the sort order */
export type SortDto = {
  /** The field name to sort the results by */
  field: Scalars['String']['input'];
  /** The direction to sort the results in (ASC or DESC) */
  order: SortOrder;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['String']['output'];
  color: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TagResponse = {
  __typename?: 'TagResponse';
  data: Array<Tag>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
  totalRecords: Scalars['Int']['output'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['String']['output'];
  activityLogs?: Maybe<Array<ActivityLog>>;
  checkList?: Maybe<Array<CheckListItem>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  events?: Maybe<Array<Event>>;
  fieldsGeneratedByAI?: Maybe<Array<Scalars['String']['output']>>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']['output']>;
  isGeneratedByAime?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Array<Note>>;
  priority: TaskPriority;
  recurrenceDetails?: Maybe<RecurrenceDetails>;
  status: TaskStatus;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export enum TaskPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
}

export type TaskResponse = {
  __typename?: 'TaskResponse';
  data: Array<Task>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
  totalRecords: Scalars['Int']['output'];
};

export enum TaskStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Overdue = 'OVERDUE',
  Todo = 'TODO',
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
  fieldsGeneratedByAI?: InputMaybe<Array<Scalars['String']['input']>>;
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
  fieldsGeneratedByAI?: InputMaybe<Array<Scalars['String']['input']>>;
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
  fieldsGeneratedByAI?: InputMaybe<Array<Scalars['String']['input']>>;
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
  fieldsGeneratedByAI?: InputMaybe<Array<Scalars['String']['input']>>;
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
  Pending = 'PENDING',
}

export type UserInvitationsResponse = {
  __typename?: 'UserInvitationsResponse';
  data: Array<UserInvitation>;
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
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
  /** Current page number in the paginated result set */
  pageNo?: Maybe<Scalars['Int']['output']>;
  /** Number of records per page in the result set */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** Total number of records available across all pages */
  totalRecords: Scalars['Int']['output'];
};

export type UserSettingsResponse = {
  __typename?: 'UserSettingsResponse';
  data: Scalars['JSON']['output'];
};

export type ValueBetweenFieldsFilterDto = {
  /** The field name representing the start of the range */
  fromField: Scalars['String']['input'];
  /** The field name representing the end of the range */
  toField: Scalars['String']['input'];
  /** The value to check if it falls between the fromField and toField values */
  value: Scalars['String']['input'];
};

export type SignupMutationVariables = Exact<{
  payload: SignupDto;
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: {
    __typename?: 'LoginResponseDto';
    accessToken: string;
    idToken: string;
    user: {
      __typename?: 'User';
      _id: string;
      dateOfBirth?: any | null;
      deactivationReasonCode?: string | null;
      email: string;
      emailVerified: boolean;
      invalidEmailVerificationAttempts: number;
      invalidLoginAttempts: number;
      lastLoginAt?: any | null;
      name: string;
      occupation?: string | null;
      personalityReportUrl?: string | null;
      phone?: string | null;
      profilePicture?: string | null;
    };
  };
};

export type LoginMutationVariables = Exact<{
  payload: LoginDto;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginResponseDto';
    accessToken: string;
    idToken: string;
    user: {
      __typename?: 'User';
      _id: string;
      dateOfBirth?: any | null;
      deactivationReasonCode?: string | null;
      email: string;
      emailVerified: boolean;
      invalidEmailVerificationAttempts: number;
      invalidLoginAttempts: number;
      lastLoginAt?: any | null;
      name: string;
      occupation?: string | null;
      personalityReportUrl?: string | null;
      phone?: string | null;
      profilePicture?: string | null;
    };
  };
};

export type EventQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type EventQuery = {
  __typename?: 'Query';
  event: {
    __typename?: 'Event';
    _id: string;
    createdAt: any;
    description?: string | null;
    endedAt?: string | null;
    goalId?: string | null;
    isGeneratedByAime?: boolean | null;
    noteIds?: Array<string> | null;
    scheduledEndsAt: string;
    scheduledStartsAt: string;
    startedAt?: string | null;
    tagIds?: Array<string> | null;
    taskIds?: Array<string> | null;
    title: string;
  };
};

export type EventCountQueryVariables = Exact<{
  filters?: InputMaybe<FiltersDto>;
}>;

export type EventCountQuery = { __typename?: 'Query'; eventCount: number };

export type EventsQueryVariables = Exact<{
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
}>;

export type EventsQuery = {
  __typename?: 'Query';
  events: {
    __typename?: 'EventResponse';
    pageNo?: number | null;
    pageSize?: number | null;
    totalRecords: number;
    data: Array<{
      __typename?: 'Event';
      _id: string;
      createdAt: any;
      description?: string | null;
      endedAt?: string | null;
      goalId?: string | null;
      isGeneratedByAime?: boolean | null;
      noteIds?: Array<string> | null;
      scheduledEndsAt: string;
      scheduledStartsAt: string;
      startedAt?: string | null;
      tagIds?: Array<string> | null;
      taskIds?: Array<string> | null;
      title: string;
    }>;
  };
};

export type CreateEventMutationVariables = Exact<{
  createEventDto: CreateEventDto;
}>;

export type CreateEventMutation = {
  __typename?: 'Mutation';
  createEvent: {
    __typename?: 'Event';
    _id: string;
    createdAt: any;
    description?: string | null;
    endedAt?: string | null;
    goalId?: string | null;
    isGeneratedByAime?: boolean | null;
    noteIds?: Array<string> | null;
    scheduledEndsAt: string;
    scheduledStartsAt: string;
    startedAt?: string | null;
    tagIds?: Array<string> | null;
    taskIds?: Array<string> | null;
    title: string;
  };
};

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteEventMutation = { __typename?: 'Mutation'; deleteEvent: boolean };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateEventDto: UpdateEventDto;
}>;

export type UpdateEventMutation = {
  __typename?: 'Mutation';
  updateEvent: {
    __typename?: 'Event';
    _id: string;
    createdAt: any;
    description?: string | null;
    endedAt?: string | null;
    goalId?: string | null;
    isGeneratedByAime?: boolean | null;
    noteIds?: Array<string> | null;
    scheduledEndsAt: string;
    scheduledStartsAt: string;
    startedAt?: string | null;
    tagIds?: Array<string> | null;
    taskIds?: Array<string> | null;
    title: string;
  };
};

export type GoalsQueryVariables = Exact<{
  filters?: InputMaybe<FiltersDto>;
  sort?: InputMaybe<SortDto>;
  pagination?: InputMaybe<PaginationDto>;
}>;

export type GoalsQuery = {
  __typename?: 'Query';
  goals: {
    __typename?: 'GoalsResponse';
    pageNo?: number | null;
    pageSize?: number | null;
    totalRecords: number;
    data: Array<{
      __typename?: 'Goal';
      _id: string;
      completedTaskCount?: number | null;
      createdAt: any;
      description?: string | null;
      endDate?: string | null;
      inProgressTaskCount?: number | null;
      isGeneratedByAime?: boolean | null;
      startDate?: string | null;
      tagIds?: Array<string> | null;
      taskIds?: Array<string> | null;
      title: string;
      totalTaskCount?: number | null;
      updatedAt: any;
      activityLogs?: Array<{
        __typename?: 'ActivityLog';
        _id: string;
        actionType?: ActionType | null;
        goalId?: string | null;
        module?: string | null;
        newValue?: string | null;
        prevValue?: string | null;
        taskId?: string | null;
      }> | null;
      checkList?: Array<{
        __typename?: 'CheckListItem';
        _id: string;
        closedAt?: string | null;
        content: string;
        eventId?: string | null;
        goalId?: string | null;
        isClosed: boolean;
        taskId?: string | null;
        event?: {
          __typename?: 'Event';
          _id: string;
          createdAt: any;
          description?: string | null;
          endedAt?: string | null;
          goalId?: string | null;
          isGeneratedByAime?: boolean | null;
          noteIds?: Array<string> | null;
          scheduledEndsAt: string;
          scheduledStartsAt: string;
          startedAt?: string | null;
          tagIds?: Array<string> | null;
          taskIds?: Array<string> | null;
          title: string;
          recurrenceDetails?: {
            __typename?: 'RecurrenceDetails';
            daysOfWeek?: Array<DaysOfWeek> | null;
            endDate?: any | null;
            frequency: Frequency;
            hour?: number | null;
            interval?: number | null;
            minute: number;
          } | null;
        } | null;
      }> | null;
    }>;
  };
};

export type GoalQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GoalQuery = {
  __typename?: 'Query';
  goal: {
    __typename?: 'Goal';
    _id: string;
    completedTaskCount?: number | null;
    createdAt: any;
    description?: string | null;
    endDate?: string | null;
    inProgressTaskCount?: number | null;
    isGeneratedByAime?: boolean | null;
    startDate?: string | null;
    tagIds?: Array<string> | null;
    taskIds?: Array<string> | null;
    title: string;
    totalTaskCount?: number | null;
    updatedAt: any;
    activityLogs?: Array<{
      __typename?: 'ActivityLog';
      _id: string;
      actionType?: ActionType | null;
      goalId?: string | null;
      module?: string | null;
      newValue?: string | null;
      prevValue?: string | null;
      taskId?: string | null;
    }> | null;
    checkList?: Array<{
      __typename?: 'CheckListItem';
      _id: string;
      closedAt?: string | null;
      content: string;
      eventId?: string | null;
      goalId?: string | null;
      isClosed: boolean;
      taskId?: string | null;
      event?: {
        __typename?: 'Event';
        _id: string;
        createdAt: any;
        description?: string | null;
        endedAt?: string | null;
        goalId?: string | null;
        isGeneratedByAime?: boolean | null;
        noteIds?: Array<string> | null;
        scheduledEndsAt: string;
        scheduledStartsAt: string;
        startedAt?: string | null;
        tagIds?: Array<string> | null;
        taskIds?: Array<string> | null;
        title: string;
        recurrenceDetails?: {
          __typename?: 'RecurrenceDetails';
          daysOfWeek?: Array<DaysOfWeek> | null;
          endDate?: any | null;
          frequency: Frequency;
          hour?: number | null;
          interval?: number | null;
          minute: number;
        } | null;
      } | null;
    }> | null;
  };
};

export type CreateGoalMutationVariables = Exact<{
  createGoalDto: CreateGoalDto;
}>;

export type CreateGoalMutation = { __typename?: 'Mutation'; createGoal: { __typename?: 'Goal'; _id: string } };

export type DeleteGoalMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteGoalMutation = { __typename?: 'Mutation'; deleteGoal: boolean };

export type UpdateGoalMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateGoalDto: UpdateGoalDto;
}>;

export type UpdateGoalMutation = { __typename?: 'Mutation'; updateGoal?: { __typename?: 'Goal'; _id: string } | null };

export type NoteQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type NoteQuery = {
  __typename?: 'Query';
  note: {
    __typename?: 'Note';
    _id: string;
    content?: string | null;
    createdAt: any;
    eventIds?: Array<string> | null;
    goalId: string;
    isGeneratedByAime?: boolean | null;
    tagIds?: Array<string> | null;
    taskIds?: Array<string> | null;
    title?: string | null;
  };
};

export type NoteCountQueryVariables = Exact<{
  filters?: InputMaybe<FiltersDto>;
}>;

export type NoteCountQuery = { __typename?: 'Query'; noteCount: number };

export type NotesQueryVariables = Exact<{
  filters?: InputMaybe<FiltersDto>;
  pagination?: InputMaybe<PaginationDto>;
  sort?: InputMaybe<SortDto>;
}>;

export type NotesQuery = {
  __typename?: 'Query';
  notes: {
    __typename?: 'NoteResponse';
    pageNo?: number | null;
    pageSize?: number | null;
    totalRecords: number;
    data: Array<{
      __typename?: 'Note';
      _id: string;
      content?: string | null;
      createdAt: any;
      eventIds?: Array<string> | null;
      goalId: string;
      isGeneratedByAime?: boolean | null;
      tagIds?: Array<string> | null;
      taskIds?: Array<string> | null;
      title?: string | null;
    }>;
  };
};

export type CreateNoteMutationVariables = Exact<{
  createNoteDto: CreateNoteDto;
}>;

export type CreateNoteMutation = {
  __typename?: 'Mutation';
  createNote: {
    __typename?: 'Note';
    _id: string;
    content?: string | null;
    createdAt: any;
    eventIds?: Array<string> | null;
    goalId: string;
    isGeneratedByAime?: boolean | null;
    tagIds?: Array<string> | null;
    taskIds?: Array<string> | null;
    title?: string | null;
  };
};

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteNoteMutation = { __typename?: 'Mutation'; deleteNote: { __typename?: 'Note'; _id: string } };

export type UpdateNoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateNoteDto: UpdateNoteDto;
}>;

export type UpdateNoteMutation = {
  __typename?: 'Mutation';
  updateNote: {
    __typename?: 'Note';
    _id: string;
    content?: string | null;
    createdAt: any;
    eventIds?: Array<string> | null;
    goalId: string;
    isGeneratedByAime?: boolean | null;
    tagIds?: Array<string> | null;
    taskIds?: Array<string> | null;
    title?: string | null;
  };
};

export type TaskQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type TaskQuery = {
  __typename?: 'Query';
  task: {
    __typename?: 'Task';
    _id: string;
    createdAt: any;
    description?: string | null;
    dueDate?: any | null;
    goalId?: string | null;
    isGeneratedByAime?: boolean | null;
    priority: TaskPriority;
    status: TaskStatus;
    title: string;
  };
};

export type TaskCountQueryVariables = Exact<{
  filters?: InputMaybe<FiltersDto>;
}>;

export type TaskCountQuery = { __typename?: 'Query'; taskCount: number };

export type TasksQueryVariables = Exact<{
  sort?: InputMaybe<SortDto>;
  pagination?: InputMaybe<PaginationDto>;
  filters?: InputMaybe<FiltersDto>;
}>;

export type TasksQuery = {
  __typename?: 'Query';
  tasks: {
    __typename?: 'TaskResponse';
    pageNo?: number | null;
    pageSize?: number | null;
    totalRecords: number;
    data: Array<{
      __typename?: 'Task';
      _id: string;
      createdAt: any;
      description?: string | null;
      dueDate?: any | null;
      goalId?: string | null;
      isGeneratedByAime?: boolean | null;
      priority: TaskPriority;
      status: TaskStatus;
      title: string;
    }>;
  };
};

export type CreateTaskMutationVariables = Exact<{
  createTaskDto: CreateTaskDto;
}>;

export type CreateTaskMutation = {
  __typename?: 'Mutation';
  createTask: {
    __typename?: 'Task';
    _id: string;
    createdAt: any;
    description?: string | null;
    dueDate?: any | null;
    goalId?: string | null;
    isGeneratedByAime?: boolean | null;
    priority: TaskPriority;
    status: TaskStatus;
    title: string;
  };
};

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteTaskMutation = {
  __typename?: 'Mutation';
  deleteTask: {
    __typename?: 'Task';
    _id: string;
    createdAt: any;
    description?: string | null;
    dueDate?: any | null;
    goalId?: string | null;
    isGeneratedByAime?: boolean | null;
    priority: TaskPriority;
    status: TaskStatus;
    title: string;
  };
};

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateTaskDto: UpdateTaskDto;
}>;

export type UpdateTaskMutation = {
  __typename?: 'Mutation';
  updateTask: {
    __typename?: 'Task';
    _id: string;
    createdAt: any;
    description?: string | null;
    dueDate?: any | null;
    goalId?: string | null;
    isGeneratedByAime?: boolean | null;
    priority: TaskPriority;
    status: TaskStatus;
    title: string;
  };
};

export const SignupDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Signup' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payload' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'SignupDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signup' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payload' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payload' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'idToken' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dateOfBirth' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'deactivationReasonCode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'invalidEmailVerificationAttempts' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'invalidLoginAttempts' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastLoginAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'occupation' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'personalityReportUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'profilePicture' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payload' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'LoginDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payload' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payload' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'idToken' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dateOfBirth' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'deactivationReasonCode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'invalidEmailVerificationAttempts' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'invalidLoginAttempts' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastLoginAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'occupation' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'personalityReportUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'profilePicture' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const EventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Event' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'noteIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scheduledEndsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scheduledStartsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventQuery, EventQueryVariables>;
export const EventCountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EventCount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDto' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'eventCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventCountQuery, EventCountQueryVariables>;
export const EventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Events' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDto' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationDto' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortDto' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pageNo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pageSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalRecords' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'noteIds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'scheduledEndsAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'scheduledStartsAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;
export const CreateEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'createEventDto' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateEventDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createEventDto' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'createEventDto' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'noteIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scheduledEndsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scheduledStartsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const DeleteEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const UpdateEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'updateEventDto' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateEventDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateEventDto' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'updateEventDto' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'noteIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scheduledEndsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scheduledStartsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;
export const GoalsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Goals' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDto' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortDto' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationDto' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'goals' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pageNo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pageSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalRecords' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'completedTaskCount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'inProgressTaskCount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'totalTaskCount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'activityLogs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'actionType' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'module' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'newValue' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'prevValue' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'taskId' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'checkList' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'closedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'eventId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'isClosed' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'taskId' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'event' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'endedAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'noteIds' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'scheduledEndsAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'scheduledStartsAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'recurrenceDetails' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'daysOfWeek' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'hour' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'interval' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'minute' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GoalsQuery, GoalsQueryVariables>;
export const GoalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Goal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'goal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'completedTaskCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'inProgressTaskCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalTaskCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'activityLogs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'actionType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'module' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'newValue' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'prevValue' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taskId' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'checkList' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'closedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'eventId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isClosed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taskId' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'event' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'endedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'noteIds' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'scheduledEndsAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'scheduledStartsAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'recurrenceDetails' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'daysOfWeek' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'hour' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'interval' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'minute' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GoalQuery, GoalQueryVariables>;
export const CreateGoalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateGoal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'createGoalDto' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateGoalDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createGoal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createGoalDto' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'createGoalDto' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateGoalMutation, CreateGoalMutationVariables>;
export const DeleteGoalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteGoal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteGoal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteGoalMutation, DeleteGoalMutationVariables>;
export const UpdateGoalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateGoal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'updateGoalDto' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateGoalDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateGoal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateGoalDto' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'updateGoalDto' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateGoalMutation, UpdateGoalMutationVariables>;
export const NoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Note' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'note' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eventIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NoteQuery, NoteQueryVariables>;
export const NoteCountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'NoteCount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDto' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'noteCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NoteCountQuery, NoteCountQueryVariables>;
export const NotesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Notes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDto' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationDto' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortDto' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'notes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pageNo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pageSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalRecords' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'eventIds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NotesQuery, NotesQueryVariables>;
export const CreateNoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateNote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'createNoteDto' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateNoteDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createNote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createNoteDto' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'createNoteDto' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eventIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateNoteMutation, CreateNoteMutationVariables>;
export const DeleteNoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteNote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteNote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const UpdateNoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateNote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'updateNoteDto' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateNoteDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateNote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateNoteDto' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'updateNoteDto' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eventIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tagIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taskIds' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const TaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Task' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'task' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dueDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TaskQuery, TaskQueryVariables>;
export const TaskCountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TaskCount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDto' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taskCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TaskCountQuery, TaskCountQueryVariables>;
export const TasksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Tasks' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortDto' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationDto' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDto' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tasks' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filters' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pageNo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pageSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalRecords' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dueDate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TasksQuery, TasksQueryVariables>;
export const CreateTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'createTaskDto' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateTaskDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createTaskDto' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'createTaskDto' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dueDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dueDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const UpdateTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'updateTaskDto' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateTaskDto' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateTaskDto' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'updateTaskDto' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dueDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'goalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isGeneratedByAime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
