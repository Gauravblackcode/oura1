export default {
  UNAUTHORIZED: '/unauthorized',
  FORBIDDEN: '/forbidden',
  DASHBOARD: '/dashboard',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
  },
  GOALS: '/goals',
  GOAL_DETAIL: (id: string) => `/goals/${id}`,
  NOTE_DETAIL: (goalId: string, noteId: string) => `/goals/${goalId}/notes/${noteId}`,
  CALENDAR: '/calendar',
};
