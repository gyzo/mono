import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { ApiMailerService } from '../service/mailer.service';
import { ApiMailerController } from './mailer.controller';

describe('ApiMailerController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      controllers: [ApiMailerController],
      providers: [ApiMailerService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "Mailer service is online. Public methods: mail."', () => {
      const appController = app.get<ApiMailerController>(ApiMailerController);
      expect(appController.ping()).toEqual({
        message: 'Mailer service is online. Public methods: mail.',
      });
    });
  });
});
