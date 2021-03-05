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
};
