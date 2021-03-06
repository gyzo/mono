import { mono } from '@mono/proto';
import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class ApiGithubService {
  private readonly apiUrl = 'https://api.github.com';

  private readonly accessToken = process.env.GITHUB_ACCESS_TOKEN ?? '';

  private readonly endpoints = {
    user: (userName: string) => `${this.apiUrl}/users/${userName}?access_token=${this.accessToken}`,
    repos: (userName: string) =>
      `${this.apiUrl}/users/${userName}/repos?access_token=${this.accessToken}`,
    languages: (userName: string, repoName: string) =>
      `${this.apiUrl}/repos/${userName}/${repoName}/languages?access_token=${this.accessToken}`,
  };

  public ping(): mono.Result {
    return mono.Result.fromObject({
      message:
        'Github service is online. Public methods: githubAccessToken, githubUser, githubUserRepos, githubUserReposLanguages.',
    });
  }

  public githubAccessToken(): string {
    return process.env.GITHUB_ACCESS_TOKEN ?? 'n/a';
  }

  public githubUser(userName?: string) {
    const url = this.endpoints.user(userName ?? '');
    // TODO: send request
    return of(url);
  }

  public githubUserRepos(userName?: string) {
    const url = this.endpoints.repos(userName ?? '');
    // TODO: send request
    return of(url);
  }

  public githubUserReposLanguages(userName?: string, repoName?: string) {
    const url = this.endpoints.languages(userName ?? '', repoName ?? '');
    // TODO: send request
    return of(url);
  }
}
