import { getAuthHeader } from '@mono/backend-auth';
import { mono } from '@mono/proto';
import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class BackendGithubService {
  private readonly apiUrl = 'https://api.github.com';

  private readonly accessToken = process.env.GITHUB_ACCESS_TOKEN ?? '';

  private readonly endpoints = {
    user: (userName: string) => `${this.apiUrl}/users/${userName}`,
    repos: (userName: string) => `${this.apiUrl}/users/${userName}/repos`,
    languages: (userName: string, repoName: string) => `${this.apiUrl}/repos/${userName}/${repoName}/languages`,
  };

  constructor(private readonly http: HttpService) {}

  public ping(): mono.Result {
    return mono.Result.fromObject({
      message: 'Github service is online. Public methods: githubAccessToken, githubUser, githubUserRepos, githubUserReposLanguages.',
    });
  }

  public githubAccessToken(): { token: string } {
    const token = process.env.GITHUB_ACCESS_TOKEN ?? 'n/a';
    return { token };
  }

  public githubUser(userName?: string) {
    const url = this.endpoints.user(userName ?? '');
    const headers = getAuthHeader(this.accessToken);
    /**
     * @note TODO: add type
     */
    return this.http.get(url, { headers }).pipe(map(res => res.data));
  }

  public githubUserRepos(userName?: string) {
    const url = this.endpoints.repos(userName ?? '');
    const headers = getAuthHeader(this.accessToken);
    /**
     * @note TODO: add type
     */
    return this.http.get(url, { headers }).pipe(map(res => res.data));
  }

  public githubUserReposLanguages(userName?: string, repoName?: string) {
    const url = this.endpoints.languages(userName ?? '', repoName ?? '');
    const headers = getAuthHeader(this.accessToken);
    /**
     * @note TODO: add type
     */
    return this.http.get(url, { headers }).pipe(map(res => res.data));
  }
}
