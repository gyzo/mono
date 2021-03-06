import { mono } from '@mono/proto';
import { Controller, Get, Query } from '@nestjs/common';

import { ApiGithubService } from '../service/github.service';

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
  public githubUser(@Query() username: string) {
    return this.service.githubUser(username);
  }

  @Get('githubUserRepos')
  public githubUserRepos(@Query() username: string) {
    return this.service.githubUserRepos(username);
  }

  @Get('githubUserReposLanguages')
  public githubUserReposLanguages(@Query() username: string, @Query() reponame: string) {
    return this.service.githubUserReposLanguages(username, reponame);
  }
}
