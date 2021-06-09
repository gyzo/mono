import { BackendDotenvService } from '@mono/backend-core';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { BackendMailerService } from '../service/mailer.service';
import { BackendMailerController } from './mailer.controller';

describe('BackendMailerController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      controllers: [BackendMailerController],
      providers: [BackendMailerService, BackendDotenvService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "Mailer service is online. Public methods: mail."', () => {
      const appController = app.get<BackendMailerController>(BackendMailerController);
      expect(appController.ping()).toEqual({
        message: 'Mailer service is online. Public methods: mail.',
      });
    });
  });
});
