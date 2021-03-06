import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { ApiGithubService } from './github.service';

describe('ApiGithubService', () => {
  let service: ApiGithubService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      providers: [ApiGithubService],
    }).compile();

    service = app.get<ApiGithubService>(ApiGithubService);
  });

  describe('ping', () => {
    it('should return "Github service is online. Public methods: githubAccessToken, githubUser, githubUserRepos, githubUserReposLanguages"', () => {
      expect(service.ping()).toEqual({
        message:
          'Github service is online. Public methods: githubAccessToken, githubUser, githubUserRepos, githubUserReposLanguages',
      });
    });
  });
});
