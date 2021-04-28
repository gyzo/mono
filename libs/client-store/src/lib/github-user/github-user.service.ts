import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable, timer } from 'rxjs';
import { concatMap, filter, map, mapTo, tap } from 'rxjs/operators';

import {
  IGithubRepoLanguages,
  IGithubUserOrganization,
  IGithubUserPublicEvent,
  IGithubUserRepo,
  IGuthubUser,
} from './github-api.interface';
import { AppGithubApiService } from './github-api.service';
import { IUserConfig } from './github-user.config';
import { GITHUB_USER_STATE_TOKEN, IUserService } from './github-user.interface';
import { AppGithubUserState, userActions } from './github-user.store';
import { AppUserConfigService } from './github-user-config.service';

@Injectable({
  providedIn: 'root',
})
export class AppGithubUserService implements IUserService {
  private readonly githubOrgsSubject = new BehaviorSubject<IGithubUserOrganization[]>([]);

  public readonly githubOrgs$ = this.githubOrgsSubject.asObservable();

  private readonly publicEventsSubject = new BehaviorSubject<IGithubUserPublicEvent<unknown>[]>([]);

  public readonly publicEvents$ = this.publicEventsSubject.asObservable();

  public readonly userData$ = this.store.select(AppGithubUserState.getState);

  public readonly languageIcons$ = this.store.select(AppGithubUserState.getState).pipe(
    filter(state => typeof state.userConfig?.languageIcons !== 'undefined'),
    map(state => state.userConfig?.languageIcons),
  );

  constructor(
    private readonly store: Store,
    private readonly userConfig: AppUserConfigService,
    private readonly githubApi: AppGithubApiService,
  ) {}

  /**
   * Gets user data and updates state.
   */
  public getUserData() {
    return this.githubApi.getGithubAccessToken().pipe(
      concatMap(() => this.getUserConfig()),
      concatMap(userConfig => {
        const username = userConfig.username.github;
        return combineLatest([
          this.getGithubProfile(username),
          this.getGithubUserOrganizations(username),
          this.getGithubUserPublicEvents(username),
          this.getGithubRepos(username),
        ]).pipe(
          map(([github, githubOrgs, publicEvents, githubRepos]) => ({
            userConfig,
            github,
            githubOrgs,
            publicEvents,
            githubRepos,
          })),
        );
      }),
    );
  }

  /**
   * Gets user config.
   */
  public getUserConfig() {
    return this.userConfig.getUserConfig().pipe(
      concatMap((data: IUserConfig) => {
        const userConfig = data;
        const profiles = data.profiles;
        return this.store
          .dispatch(new userActions.setUserState({ userConfig, profiles }))
          .pipe(mapTo(data));
      }),
    );
  }

  /**
   * Gets user Github profile.
   * @username github user name
   */
  public getGithubProfile(username: string) {
    return this.githubApi.getProfile(username).pipe(
      concatMap((data: IGuthubUser) => {
        const github = data;
        return this.store.dispatch(new userActions.setUserState({ github })).pipe(mapTo(data));
      }),
    );
  }

  /**
   * Gets user Github repos.
   * @username github user name
   */
  public getGithubRepos(username: string) {
    return this.githubApi.getRepos(username).pipe(
      concatMap((data: IGithubUserRepo[]) => {
        const githubRepos = data;
        return this.store
          .dispatch(new userActions.setUserState({ githubRepos }))
          .pipe(mapTo(githubRepos));
      }),
      concatMap((repos: IGithubUserRepo[]) => {
        const languageObservables: Observable<IGithubRepoLanguages>[] = [];
        for (let i = 0, max = repos.length; i < max; i = i + 1) {
          languageObservables.push(this.getGithubRepoLanguages(username, repos[i].name));
        }
        return combineLatest(languageObservables).pipe(mapTo(repos));
      }),
    );
  }

  /**
   * Gets user Github repo languages.
   * @username github user name
   * @repoName repository name
   */
  private getGithubRepoLanguages(username: string, repoName: string) {
    return this.githubApi.getRepoLanguages(username, repoName).pipe(
      concatMap(data =>
        this.store.selectOnce(GITHUB_USER_STATE_TOKEN).pipe(map(state => ({ state, data }))),
      ),
      map(({ state, data }) => {
        const githubLanguages: IGithubRepoLanguages = { ...state.githubLanguages };
        const githubLanguagesRate = { ...state.githubLanguagesRate };
        const imgShow = { ...state.imgShow };
        let githubLanguagesKeys = Object.keys(githubLanguages);
        let githubLanguagesTotal = state.githubLanguagesTotal;
        // eslint-disable-next-line no-labels -- label is needed here for performance optimization
        loop: for (const lang of Object.keys(data)) {
          if (lang.includes('$')) {
            // eslint-disable-next-line no-labels -- label is needed here for performance optimization
            break loop;
          }
          githubLanguagesTotal += data[lang];
          githubLanguages[lang] = githubLanguages[lang]
            ? githubLanguages[lang] + data[lang]
            : data[lang];

          githubLanguagesKeys = Object.keys(githubLanguages);

          imgShow.languageIcons = githubLanguagesKeys.reduce((accumulator, key: string) => {
            accumulator[key] = true;
            return accumulator;
          }, {} as { [key: string]: boolean });

          const multiplier = 100;
          const fixed = 2;

          githubLanguagesRate[lang] = (
            (githubLanguages[lang] * multiplier) /
            githubLanguagesTotal
          ).toFixed(fixed);
        }
        void this.store.dispatch(
          new userActions.setUserState({
            githubLanguagesTotal,
            githubLanguages,
            imgShow,
            githubLanguagesKeys,
            githubLanguagesRate,
          }),
        );
        return data;
      }),
    );
  }

  /**
   * Gets Github user organizations.
   * @username github user name
   */
  public getGithubUserOrganizations(username: string) {
    return this.githubApi.getUserOrganizations(username).pipe(
      concatMap((githubOrgs: IGithubUserOrganization[]) => {
        this.githubOrgsSubject.next(githubOrgs);
        return this.store
          .dispatch(new userActions.setUserState({ githubOrgs }))
          .pipe(mapTo(githubOrgs));
      }),
    );
  }

  /**
   * Gets GitHub public events.
   * @username github user name
   */
  public getGithubUserPublicEvents(username: string) {
    return this.githubApi.getPublicEvents(username).pipe(
      concatMap((publicEventsData: IGithubUserPublicEvent<unknown>[]) => {
        const publicEvents = publicEventsData.reverse();
        void timer(0)
          .pipe(
            tap(() => {
              this.publicEventsSubject.next(publicEvents);
            }),
          )
          .subscribe();
        return this.store
          .dispatch(new userActions.setUserState({ publicEvents }))
          .pipe(mapTo(publicEvents));
      }),
    );
  }
}
