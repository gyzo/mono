import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { startProgress, stopProgress } from './http-progress.actions';
import {
  HTTP_PROGRESS_STATE_TOKEN,
  httpProgressInitialState,
  IAppHttpProgressState,
  THttpProgressPayload,
} from './http-progress.interface';

export const httpProgressActions = {
  startProgress,
  stopProgress,
};

@State<IAppHttpProgressState>({
  name: HTTP_PROGRESS_STATE_TOKEN,
  defaults: {
    ...httpProgressInitialState,
  },
})
@Injectable()
export class AppHttpProgressState {
  @Selector()
  public static allProgress(state: IAppHttpProgressState) {
    return state;
  }

  @Selector()
  public static mainViewProgress(state: IAppHttpProgressState) {
    return state.mainView;
  }

  @Action(startProgress)
  public startProgress(
    ctx: StateContext<IAppHttpProgressState>,
    { payload }: THttpProgressPayload,
  ) {
    return ctx.patchState(payload);
  }

  @Action(stopProgress)
  public stopProgress(ctx: StateContext<IAppHttpProgressState>, { payload }: THttpProgressPayload) {
    return ctx.patchState(payload);
  }
}
