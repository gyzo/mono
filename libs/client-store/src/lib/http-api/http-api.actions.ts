import { actionPayloadConstructor } from '@mono/client-util';

import { HTTP_API_STATE_TOKEN, THttpApiPayload } from './http-api.interface';

const createAction = actionPayloadConstructor(HTTP_API_STATE_TOKEN.getName());

export const pingAuth = createAction<THttpApiPayload>('ping auth service');
export const pingMailer = createAction<THttpApiPayload>('ping mailer service');
