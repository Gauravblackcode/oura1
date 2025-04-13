export const notifications = {
  invalidEmail: 'Email Invalid. Try Again.',
  doesNotExist: 'Email/Password cannot be found.',
  incorrectLogin: 'Email/Password did not match any records.',
};

export const NOTIFICATION = {
  NO_TABLES_SELECTED_SOURCE: 'No Tables available for selected Source.',
  UNABLE_TO_FETCH_TABLES: 'Unable to fetch tables',
  UNABLE_TO_FETCH_TABLE_COLUMNS: 'Unable to fetch table columns',
  MAX_ALLOWED_CONDITIONS: 'Max Aggregation Limit Reached',
};

export const WORKFLOW = {
  NODES: {
    SOURCE_NODE: {
      TITLE: 'Source Node',
      MAIN_SOURCE: 'Main Source',
      SOURCE_TABLE: 'Source Table',
    },
  },
};

export const FETCH_ERROR_MESSAGES = {
  FETCH_TABLE_NAMES: 'Error fetching table names:',
  FETCH_DESTINATION_NAMES: 'Error fetching destination names:',
  FETCH_TABLE_COLUMNS: 'Error fetching table columns:',
};

export const FILTERS = {
  LESS_THAN_ONE_TEXT: '< 1',
  ERROR: {
    FETCH_COUNT_NOTIFY: 'Unable to fetch filters data count',
  },
  CUSTOM_FILTER: {
    SEGMENT_NAME: 'Segment Name',
    SYNC_DATA: 'Sync Data',
    DATA_POINTS: 'of data points',
  },
  FILTER_SELECT: {
    CONDITION: 'Condition',
    ADD_FILTER: '+ Add Filter (OR)',
    ADD_CONDITION: 'Add Condition (AND)',
  },
  APPLY_FILTER: 'Apply Filter',
  MAX_ALLOWED_CONDITIONS: 'You can add maximum of 10 filters per workflow.',
};
export const SAMPLE_DATA = {
  ERROR: {
    FETCH: 'Failed to fetch sample data',
    FETCH_CONSOLE: 'Error fetching sample table data: ',
  },
};

export const SOURCE = {
  DATA: {
    FETCH: {
      ERROR: 'Unable to fetch source data count',
    },
  },
  NAMES: {
    FETCH: {
      ERROR: 'Unable to fetch source names',
    },
  },
};

export const SEGMENT = {
  SYNC_NODE_MISSING_MESSAGE: 'Please sync/test all your segments before saving.',
  NO_SEGMENT_WARNING_MESSAGE:
    'Minimum rule should should be there to save the conditions. Please add atleast one rule and try again.',
  UNCONNECTEDNODES_MESSAGE: 'Please make sure all the segments are connected',
  SOURCE_NODE_CONNECTION_LIMIT: 'Max connection limit reached for source node.',
  FILTER_LEVEL_CONNECTION_LIMIT: (level: number) => `Max connection limit reached for LEVEL ${level} rule node.`,
  SEGMENT_TYPE: {
    FILTER: 'Rule',
  },
};

export const CONFIRM_MODAL = {
  DELETE_FILTER_TITLE: 'Delete Rule?',
  DELETE_FILTER_MESSAGE: 'Are you sure you want to delete this rule? All the connected forward rules will be deleted',
  DELETE_CONDITION_TITLE: 'Delete Condition',
  DELETE_CONDITION_MESSAAGE: 'Are you sure you want to delete this condition?',
};

export const AD_ITEMS_INSIGHTS_MODAL = {
  title: 'Next steps',
  subtitle: 'Since changes were made to the Ad Item, Select an option below to update the Ad Item status',
  submit: 'Save and Submit for Approval',
  draft: 'Save as Draft',
};

export const COMMON = {
  SOURCE: 'Source',
  CANCEL: 'Cancel',
  REMOVE_CONNECTION: 'Remove connection',
  SAVE_CONDITIONS: 'Save Conditions',
};
