import { mono } from '@mono/proto';
import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

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

  constructor(private readonly http: HttpService) {}

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
    /**
     * @note TODO: add type
     */
    return this.http.get(url).pipe(map(res => res.data));
  }

  public githubUserRepos(userName?: string) {
    const url = this.endpoints.repos(userName ?? '');
    /**
     * @note TODO: add type
     */
    return this.http.get(url).pipe(map(res => res.data));
  }

  public githubUserReposLanguages(userName?: string, repoName?: string) {
    const url = this.endpoints.languages(userName ?? '', repoName ?? '');
    /**
     * @note TODO: add type
     */
    return this.http.get(url).pipe(map(res => res.data));
  }
}
