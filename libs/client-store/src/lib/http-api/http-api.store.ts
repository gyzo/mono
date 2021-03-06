import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { pingAuth, pingMailer } from './http-api.actions';
import {
  HTTP_API_STATE_TOKEN,
  httpApiInitialState,
  IAppHttpApiState,
  IAppHttpApiStatePayload,
  THttpApiPayload,
} from './http-api.interface';
import { AppHttpApiService } from './http-api.service';

export const httpApiActions = {
  pingAuth,
  pingMailer,
};

@State<IAppHttpApiState>({
  name: HTTP_API_STATE_TOKEN,
  defaults: {
    ...httpApiInitialState,
  },
})
@Injectable()
export class AppHttpApiState {
  constructor(private readonly api: AppHttpApiService) {}

  @Selector()
  public static allData(state: IAppHttpApiState) {
    return state;
  }

  @Selector()
  public static pingAuth(state: IAppHttpApiState) {
    return state.pingAuth;
  }

  @Action(pingAuth)
  public pingAuth(ctx: StateContext<IAppHttpApiState>, { payload }: THttpApiPayload) {
    return this.api.pingAuth().pipe(
      tap(result => {
        const pingPayload: IAppHttpApiStatePayload = {
          pingAuth: result.message,
        };
        ctx.patchState(pingPayload);
      }),
    );
  }

  @Action(pingMailer)
  public pingMailer(ctx: StateContext<IAppHttpApiState>, { payload }: THttpApiPayload) {
    return this.api.pingMailer().pipe(
      tap(result => {
        const pingPayload: IAppHttpApiStatePayload = {
          pingMailer: result.message,
        };
        ctx.patchState(pingPayload);
      }),
    );
  }
}
