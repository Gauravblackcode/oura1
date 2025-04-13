// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { getSentryEnv } from 'src/common/sentry-config';

Sentry.init({
  environment: getSentryEnv(process.env.NEXT_PUBLIC_APP_ENV),
  dsn: 'https://e1baecfe560da42dcd21c8e7fc0e4be7@o4506474711023616.ingest.sentry.io/4506551425499136',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
