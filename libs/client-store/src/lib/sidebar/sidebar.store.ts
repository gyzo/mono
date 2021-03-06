import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { setState, toggleVisibility } from './sidebar.actions';
import {
  ISiedbarUiState,
  SIDEBAR_STATE_TOKEN,
  sidebarUiInitialState,
  TSidebarPayload,
} from './sidebar.interface';

export const sidebarUiActions = {
  setState,
  toggleVisibility,
};

@State<ISiedbarUiState>({
  name: SIDEBAR_STATE_TOKEN,
  defaults: {
    ...sidebarUiInitialState,
  },
})
@Injectable()
export class AppSidebarState {
  @Selector()
  public static getSidebar(state: ISiedbarUiState) {
    return state;
  }

  @Selector()
  public static getSidebarOpened(state: ISiedbarUiState) {
    return state.sidebarOpened;
  }

  @Action(setState)
  public setState(ctx: StateContext<ISiedbarUiState>, { payload }: TSidebarPayload) {
    return ctx.patchState(payload);
  }

  @Action(toggleVisibility)
  public toggleVisibility(ctx: StateContext<ISiedbarUiState>) {
    const sidebarOpened = !ctx.getState().sidebarOpened;
    return ctx.patchState({ sidebarOpened });
  }
}
