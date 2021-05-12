import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { BackendGithubService } from '../service/github.service';
import { BackendGithubController } from './github.controller';

describe('BackendGithubController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule.register({})],
      controllers: [BackendGithubController],
      providers: [BackendGithubService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "Github service is online. Public methods: githubAccessToken, githubUser, githubUserRepos, githubUserReposLanguages."', () => {
      const appController = app.get<BackendGithubController>(BackendGithubController);
      expect(appController.ping()).toEqual({
        message: 'Github service is online. Public methods: githubAccessToken, githubUser, githubUserRepos, githubUserReposLanguages.',
      });
    });
  });
});
