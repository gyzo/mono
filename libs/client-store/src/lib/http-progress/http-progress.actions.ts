import { actionPayloadConstructor } from '@mono/client-util';

import { HTTP_PROGRESS_STATE_TOKEN, THttpProgressPayload } from './http-progress.interface';

const createAction = actionPayloadConstructor(HTTP_PROGRESS_STATE_TOKEN.getName());

export const startProgress = createAction<THttpProgressPayload>('start');
export const stopProgress = createAction<THttpProgressPayload>('stop');
