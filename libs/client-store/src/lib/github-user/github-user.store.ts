import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { setUserState } from './github-user.actions';
import { GITHUB_USER_STATE_TOKEN, IGithubUserState, TUserPayload } from './github-user.interface';

export const userActions = {
  setUserState,
};

@State<IGithubUserState>({
  name: GITHUB_USER_STATE_TOKEN,
  defaults: {
    profiles: [],
    userConfig: void 0,
    github: void 0,
    githubRepos: [],
    githubLanguages: void 0,
    githubLanguagesTotal: 0,
    githubLanguagesRate: void 0,
    githubLanguagesKeys: [],
    imgShow: {
      github: true,
      codepen: true,
      codewars: true,
      hackerrank: true,
      languageIcons: {},
    },
    githubOrgs: [],
    publicEvents: [],
  },
})
@Injectable({
  providedIn: 'root',
})
export class AppGithubUserState {
  /**
   * State selector.
   * @param state
   */
  @Selector([GITHUB_USER_STATE_TOKEN])
  public static getState(state: IGithubUserState) {
    return state;
  }

  /**
   * Set state action.
   * @param ctx
   * @param param1
   */
  @Action(setUserState)
  public setUserState(ctx: StateContext<IGithubUserState>, { payload }: TUserPayload) {
    return ctx.patchState(payload);
  }
}
