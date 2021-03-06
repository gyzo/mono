import { mono } from '@mono/proto';
import { Controller, Get, Query } from '@nestjs/common';

import { ApiGithubService } from '../service/github.service';

type TQueryPatams<T> = T & Record<string, string>;

@Controller()
export class ApiGithubController {
  constructor(private readonly service: ApiGithubService) {}

  @Get('github')
  public ping(): mono.Result {
    return this.service.ping();
  }

  @Get('githubAccessToken')
  public githubAccessToken(): string {
    return this.service.githubAccessToken();
  }

  @Get('githubUser')
  public githubUser(@Query() query: TQueryPatams<{ username?: string }>) {
    return this.service.githubUser(query.username);
  }

  @Get('githubUserRepos')
  public githubUserRepos(@Query() query: TQueryPatams<{ username?: string }>) {
    return this.service.githubUserRepos(query.username);
  }

  @Get('githubUserReposLanguages')
  public githubUserReposLanguages(@Query() query: { username?: string; reponame?: string }) {
    return this.service.githubUserReposLanguages(query.username, query.reponame);
  }
}
