import { Capacitor } from '@capacitor/core';
import { IWebClientAppEnvironment } from '@mono/client-util';

const platform: string = Capacitor.getPlatform();

/**
 * Production environment variables.
 */
export const environment: IWebClientAppEnvironment = {
  production: true,
  platform,
  appName: 'Portfolio',
  api:
    platform !== 'web'
      ? 'https://rfprod-2cda1.web.app/api'
      : window.location.origin.includes('localhost')
      ? 'http://localhost:8080/api'
      : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8082', // TODO
  sentry: {
    env: 'production',
    dsn: 'https://8d1b8e74d9e64ab7946fa0f0aac9704b@o551250.ingest.sentry.io/5674548',
    tracingOrigins: [
      'localhost:4200',
      'https://rfprod-2cda1.web.app',
      'https://rfprod-2cda1.firebaseapp.com',
    ],
  },
};
