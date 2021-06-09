import { BackendDotenvService } from '@mono/backend-core';
import { Test } from '@nestjs/testing';

import { BackendMailerService } from './mailer.service';

describe('BackendMailerService', () => {
  let service: BackendMailerService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [BackendMailerService, BackendDotenvService],
    }).compile();

    service = app.get<BackendMailerService>(BackendMailerService);
  });

  describe('getData', () => {
    it('should return "Mailer service is online. Public methods: mail."', () => {
      expect(service.ping()).toEqual({
        message: 'Mailer service is online. Public methods: mail.',
      });
    });
  });
});
