import { backendGrpcClientOptions } from '@mono/backend-grpc';
import { defaultWsPort } from '@mono/backend-interfaces';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ExpressAdapter } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import e from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as process from 'process';

import { ApiAppModule } from './app/app.module';
import { environment } from './environments/environment';

/**
 * Express server.
 */
const server: e.Express = e();
/**
 * Default port value.
 */
const defaultPort = 8080;

/**
 * Bootstraps server.
 */
async function bootstrap(expressInstance: e.Express): Promise<unknown> {
  const app = await NestFactory.create(ApiAppModule, new ExpressAdapter(expressInstance));
  app.useWebSocketAdapter(new WsAdapter(app));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const corsOptions: CorsOptions = {
    origin: [/localhost/, /firebase\.app/, /web\.app/],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  const grpcClientOptions = backendGrpcClientOptions(environment);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservicesAsync();

  const port = typeof process.env.port !== 'undefined' ? process.env.port : defaultPort;
  await app.listen(port, () => {
    console.warn(`Listening at:
    - http://localhost:${port}/${globalPrefix}/auth
    - http://localhost:${port}/${globalPrefix}/signup
    - http://localhost:${port}/${globalPrefix}/login
    - http://localhost:${port}/${globalPrefix}/logout
    - http://localhost:${port}/${globalPrefix}/grpc
    - http://localhost:${port}/${globalPrefix}/grpc/:id
    - http://localhost:${port}/${globalPrefix}/mailer
    - http://localhost:${port}/${globalPrefix}/mail
    - http://localhost:${port}/${globalPrefix}/githubAccessToken
    - http://localhost:${port}/${globalPrefix}/githubUser
    - http://localhost:${port}/${globalPrefix}/githubUserRepos
    - http://localhost:${port}/${globalPrefix}/githubUserReposLanguages
    - ws://localhost:${defaultWsPort}/${globalPrefix}/events`);
  });

  return app.init();
}

void bootstrap(server);

/**
 * Firebase configuration.
 */
const firebaseConfig = process.env.FIREBASE_CONFIG;

/**
 * Initialize admin and export firebase functions only in cloud environment.
 */
if (typeof firebaseConfig !== 'undefined') {
  admin.initializeApp();
  /**
   * @note TODO: handle websocket events
   * (exports as Record<string, unknown>).events = functions.https.onRequest(server);
   */
  /**
   * @note try one main entry point
   */
  // (exports as Record<string, unknown>).api = functions.https.onRequest(server);
  //
  (exports as Record<string, unknown>).auth = functions.https.onRequest(server);
  (exports as Record<string, unknown>).signup = functions.https.onRequest(server);
  (exports as Record<string, unknown>).login = functions.https.onRequest(server);
  (exports as Record<string, unknown>).logout = functions.https.onRequest(server);
  (exports as Record<string, unknown>).mailer = functions.https.onRequest(server);
  (exports as Record<string, unknown>).mail = functions.https.onRequest(server);
  //
  (exports as Record<string, unknown>).githubAccessToken = functions.https.onRequest(server);
  (exports as Record<string, unknown>).githubUser = functions.https.onRequest(server);
  (exports as Record<string, unknown>).githubUserRepos = functions.https.onRequest(server);
  (exports as Record<string, unknown>).githubUserReposLanguages = functions.https.onRequest(server);
}
