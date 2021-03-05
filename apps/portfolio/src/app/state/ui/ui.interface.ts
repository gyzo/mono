import { IActionPayload } from '@mono/client-util';
import { StateToken } from '@ngxs/store';

export interface IUiState {
  sidenavOpened: boolean;
}

export const UI_STATE_TOKEN = new StateToken<IUiState>('ui');

export const uiStateInitialValue: IUiState = {
  sidenavOpened: false,
};

export type TUiPayload = IActionPayload<Partial<IUiState>>;
