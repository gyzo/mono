import { HttpModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { BackendGithubService } from './github.service';

describe('BackendGithubService', () => {
  let service: BackendGithubService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [HttpModule.register({})],
      providers: [BackendGithubService],
    }).compile();

    service = app.get<BackendGithubService>(BackendGithubService);
  });

  describe('ping', () => {
    it('should return "Github service is online. Public methods: githubAccessToken, githubUser, githubUserRepos, githubUserReposLanguages."', () => {
      expect(service.ping()).toEqual({
        message:
          'Github service is online. Public methods: githubAccessToken, githubUser, githubUserRepos, githubUserReposLanguages.',
      });
    });
  });
});
