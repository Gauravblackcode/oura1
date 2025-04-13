import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  DefaultOptions,
  from,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { GraphQLFormattedError } from 'graphql';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'cookies-next';
import { onError } from '@apollo/client/link/error';
import { ACCESS_TOKEN_COOKIE } from '@/common/constants';
import environments from '@/common/environments';
import { showLoader, showMessage } from '@/redux/actions';
import ROUTES from '@/common/routes';
import { getStore } from '@/redux/store';
import { windowRedirection } from '@/common/helpers';

const httpLink = createHttpLink({
  uri: `${environments.API_BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie(ACCESS_TOKEN_COOKIE);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const loadingLink = new ApolloLink((operation, forward) => {
  const isSilent = operation.getContext().silent;
  const isLoading = getStore()?.getState().common.loader;
  return new Observable(observer => {
    if (!isSilent) {
      showLoader(true);
    }
    forward(operation).subscribe({
      next: result => {
        if (isLoading || !isSilent) {
          showLoader(false);
        }
        observer.next(result);
      },
      error: error => {
        if (isLoading || !isSilent) {
          showLoader(false);
        }
        observer.error(error);
      },
      complete: () => {
        if (isLoading || !isSilent) {
          showLoader(false);
        }
        observer.complete();
      },
    });
  });
});

const logoutLink = onError(({ graphQLErrors, operation, forward }) => {
  const firstGraphqlError = graphQLErrors?.[0] as GraphQLFormattedError;
  const isTokenExpired =
    firstGraphqlError?.message?.toLowerCase()?.includes('invalid token') ||
    firstGraphqlError?.message?.toLowerCase()?.includes('token expired') ||
    firstGraphqlError?.message?.toLowerCase()?.includes('auth header must not be null');

  if (isTokenExpired) {
    showMessage('Session Expired, please login again to continue.');
    windowRedirection(ROUTES.AUTH.LOGOUT);
    return undefined;
  }

  const isUnAuthorized = firstGraphqlError?.extensions?.classification === 'UNAUTHORIZED';

  if (isUnAuthorized) {
    showMessage(`${graphQLErrors?.[0]?.message}`);
    windowRedirection(ROUTES.UNAUTHORIZED);
    return undefined;
  }

  const isForbiddenError = firstGraphqlError?.extensions?.classification === 'FORBIDDEN';

  if (isForbiddenError) {
    showMessage(`${graphQLErrors?.[0]?.message}`);
    windowRedirection(ROUTES.FORBIDDEN);
    return undefined;
  }

  if (graphQLErrors) {
    showMessage(`${graphQLErrors?.[0]?.message}`);
    return forward(operation);
  }
  return undefined;
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const GRAPHQL_CLIENT = new ApolloClient({
  link: from([loadingLink, authLink, logoutLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default GRAPHQL_CLIENT;
