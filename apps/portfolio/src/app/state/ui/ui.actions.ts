import { actionPayloadConstructor } from '@mono/client-util';

import { TUiPayload, UI_STATE_TOKEN } from './ui.interface';

const createAction = actionPayloadConstructor(UI_STATE_TOKEN.toString());

export const patchState = createAction<TUiPayload>('patch state');
export const toggleSidenav = createAction('toggle sidenav');
