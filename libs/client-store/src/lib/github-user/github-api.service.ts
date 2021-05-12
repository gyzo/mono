import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@mono/client-util';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppHttpHandlersService } from '../http-api/http-handlers.service';
import {
  IGithubAccessToken,
  IGithubApiEngpoints,
  IGithubOrganization,
  IGithubRepoLanguages,
  IGithubUserOrganization,
  IGithubUserPublicEvent,
  IGithubUserRepo,
  IGuthubUser,
} from './github-api.interface';

/**
 * Github service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppGithubApiService {
  /**
   * Github access token.
   */
  private githubAccessToken = '';

  /**
   * Github api base url.
   */
  private readonly githubApiBaseUrl = 'https://api.github.com';

  /**
   * ServiceAPI endpoints.
   */
  private readonly endpoints: IGithubApiEngpoints = {
    githubAccessToken: (): string => `${this.win.location.origin}/api/githubAccessToken`,
    user: (username: string): string => `${this.githubApiBaseUrl}/users/${username}`,
    repos: (username: string): string => `${this.githubApiBaseUrl}/users/${username}/repos`,
    languages: (username: string, reponame: string) => `${this.githubApiBaseUrl}/repos/${username}/${reponame}/languages`,
    organizations: (username: string): string => `${this.githubApiBaseUrl}/users/${username}/orgs`,
    organization: (organization: string): string => `${this.githubApiBaseUrl}/orgs/${organization}`,
    publicEvents: (username: string): string => `${this.githubApiBaseUrl}/users/${username}/events/public`,
  };

  constructor(
    private readonly http: HttpClient,
    private readonly handlers: AppHttpHandlersService,
    @Inject(WINDOW) private readonly win: Window,
  ) {}

  /**
   * Gets github access token.
   */
  public getGithubAccessToken(): Observable<IGithubAccessToken> {
    const url = this.endpoints.githubAccessToken();
    return this.handlers.pipeHttpResponse(
      this.http.get<IGithubAccessToken>(url).pipe(
        tap(res => {
          this.githubAccessToken = res.token;
        }),
      ),
    );
  }

  /**
   * Gets Github user profile.
   * @param username Github username
   */
  public getProfile(username: string): Observable<IGuthubUser> {
    const url = this.endpoints.user(username);
    const headers = this.getAuthHeaders();
    return this.handlers.pipeHttpResponse(
      this.http.get<IGuthubUser>(url, { headers }),
    );
  }

  /**
   * Gets Github user repos.
   * @param username Github username
   */
  public getRepos(username: string): Observable<IGithubUserRepo[]> {
    const url = this.endpoints.repos(username);
    const headers = this.getAuthHeaders();
    return this.handlers.pipeHttpResponse(
      this.http.get<IGithubUserRepo[]>(url, { headers }),
    );
  }

  /**
   * Get Github user repo languages.
   * @param username Github username
   * @param repo Github repo name
   */
  public getRepoLanguages(username: string, repo: string): Observable<IGithubRepoLanguages> {
    const url = this.endpoints.languages(username, repo);
    const headers = this.getAuthHeaders();
    return this.handlers.pipeHttpResponse(
      this.http.get<IGithubRepoLanguages>(url, { headers }),
    );
  }

  /**
   * Get Github user organizations.
   * @param username Github username
   */
  public getUserOrganizations(username: string): Observable<IGithubUserOrganization[]> {
    const url = this.endpoints.organizations(username);
    const headers = this.getAuthHeaders();
    return this.handlers.pipeHttpResponse(
      this.http.get<IGithubUserOrganization[]>(url, { headers }),
    );
  }

  /**
   * Get Github organization by name.
   * @param username Github organization name
   */
  public getOrganization(organization: string): Observable<IGithubOrganization> {
    const url = this.endpoints.organization(organization);
    const headers = this.getAuthHeaders();
    return this.handlers.pipeHttpResponse(
      this.http.get<IGithubOrganization>(url, { headers }),
    );
  }

  /**
   * Git Github user public events.
   * @param username Github username
   */
  public getPublicEvents(username: string): Observable<IGithubUserPublicEvent<unknown>[]> {
    const url = this.endpoints.publicEvents(username);
    const headers = this.getAuthHeaders();
    return this.handlers.pipeHttpResponse(
      this.http.get<IGithubUserPublicEvent<unknown>[]>(url, { headers }),
    );
  }

  /**
   * Gets authorization header.
   */
  private getAuthHeaders() {
    return new HttpHeaders({ Authorization: `token ${this.githubAccessToken}` });
  }
}
