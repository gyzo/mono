import { actionPayloadConstructor } from '@mono/client-util';

import { GITHUB_USER_STATE_TOKEN, TUserPayload } from './github-user.interface';

const createAction = actionPayloadConstructor(GITHUB_USER_STATE_TOKEN.toString());

export const setUserState = createAction<TUserPayload>('User: set state');
