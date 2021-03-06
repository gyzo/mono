import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { ApiGithubService } from '../service/github.service';
import { ApiGithubController } from './github.controller';

describe('ApiGithubController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      controllers: [ApiGithubController],
      providers: [ApiGithubService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "Github service is online. Public methods: login, logout, signup."', () => {
      const appController = app.get<ApiGithubController>(ApiGithubController);
      expect(appController.ping()).toEqual({
        message: 'Github service is online. Public methods: login, logout, signup.',
      });
    });
  });
});
