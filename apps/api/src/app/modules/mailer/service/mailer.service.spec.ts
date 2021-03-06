import { Test } from '@nestjs/testing';

import { ApiMailerService } from './mailer.service';

describe('ApiMailerService', () => {
  let service: ApiMailerService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ApiMailerService],
    }).compile();

    service = app.get<ApiMailerService>(ApiMailerService);
  });

  describe('getData', () => {
    it('should return "Mailer service is online. Public methods: mail."', () => {
      expect(service.ping()).toEqual({
        message: 'Mailer service is online. Public methods: mail.',
      });
    });
  });
});
