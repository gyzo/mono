import { ApiEnvironment } from '@mono/api-interface';

/**
 * Production environment variables.
 */
export const environment: ApiEnvironment = {
  production: true,
  firebase: true,
  appName: 'Nx Ng Starter API',
  wsPort: 8081,
};
