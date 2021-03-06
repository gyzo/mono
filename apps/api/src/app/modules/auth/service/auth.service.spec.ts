import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { ApiAuthService } from './auth.service';

describe('ApiAuthService', () => {
  let service: ApiAuthService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      providers: [ApiAuthService],
    }).compile();

    service = app.get<ApiAuthService>(ApiAuthService);
  });

  describe('ping', () => {
    it('Auth service is online. Public methods: login, logout, signup."', () => {
      expect(service.ping()).toEqual({
        message: 'Auth service is online. Public methods: login, logout, signup.',
      });
    });
  });
});
