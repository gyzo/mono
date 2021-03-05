import { actionPayloadConstructor } from '@mono/client-util';

import { HTTP_API_STATE_TOKEN, THttpApiPayload } from './http-api.interface';

const createAction = actionPayloadConstructor(HTTP_API_STATE_TOKEN.getName());

export const ping = createAction<THttpApiPayload>('ping');
