import { actionPayloadConstructor } from '@mono/client-util';

import { SIDEBAR_STATE_TOKEN, TSidebarPayload } from './sidebar.interface';

const createAction = actionPayloadConstructor(SIDEBAR_STATE_TOKEN.getName());

export const setState = createAction<TSidebarPayload>('set state');

export const toggleVisibility = createAction('toggle visibility');
