export const getSentryEnv = (appEnv: string | undefined): string => {
  if (!appEnv) {
    return 'N/A';
  }

  // If it's a known mismatch, use the associated Sentry env name
  appEnv = appEnv.toLowerCase();
  switch (appEnv) {
    case 'sbx':
      return 'SANDBOX';
    case 'development':
      return 'DEV';
    case 'stage':
    case 'staging':
      return 'STG';
    case 'prd':
    case 'production':
      return 'PPROD';
  }

  // In any other case, trust the env is correct (but use the uppercase version like all the known envs)
  return appEnv.toUpperCase();
};
