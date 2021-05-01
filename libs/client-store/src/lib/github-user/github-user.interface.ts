import { IActionPayload } from '@mono/client-util';
import { StateToken } from '@ngxs/store';
import { Observable } from 'rxjs';

import {
  IGithubRepoLanguages,
  IGithubRepoLanguagesRate,
  IGithubUserOrganization,
  IGithubUserPublicEvent,
  IGithubUserRepo,
  IGuthubUser,
} from './github-api.interface';
import { IUserConfig, IUserConfigProfile } from './github-user.config';

export interface IGithubUserState {
  profiles: IUserConfigProfile[];
  userConfig?: IUserConfig;
  github?: IGuthubUser;
  githubRepos: IGithubUserRepo[];
  githubLanguages?: IGithubRepoLanguages;
  githubLanguagesTotal: number;
  githubLanguagesRate?: IGithubRepoLanguagesRate;
  githubLanguagesKeys: string[];
  imgShow: {
    github: boolean;
    codepen: boolean;
    codewars: boolean;
    hackerrank: boolean;
    languageIcons: {
      [key: string]: boolean;
    };
  };
  githubOrgs: IGithubUserOrganization[];
  publicEvents: IGithubUserPublicEvent<unknown>[];
}

export type TUserPayload = IActionPayload<Partial<IGithubUserState>>;

export interface IUserService {
  readonly githubOrgs$: Observable<IGithubUserOrganization[]>;
  readonly publicEvents$: Observable<IGithubUserPublicEvent<unknown>[]>;
}

export const GITHUB_USER_STATE_TOKEN = new StateToken<IGithubUserState>('githubUser');
