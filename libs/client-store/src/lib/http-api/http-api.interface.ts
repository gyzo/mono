import { IActionPayload } from '@mono/client-util';
import { StateToken } from '@ngxs/store';
import { Observable } from 'rxjs';

export interface IPingResponse {
  message: string;
}

export interface IAppHttpApiState {
  pingAuth: string;
  pingMailer: string;
}

export interface IAppHttpApiStatePayload {
  pingAuth?: string;
  pingMailer?: string;
}

export const httpApiInitialState = {
  pingAuth: '',
  pingMailer: '',
};

export const HTTP_API_STATE_TOKEN = new StateToken<IAppHttpApiState>('httpApi');

export type THttpApiPayload = IActionPayload<void>;

export interface IHttpApiHandlersActions {
  cached(): Observable<string>;
  request(): Observable<IPingResponse | string>;
}
