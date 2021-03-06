import { UserLoginCredentials, UserLogoutCredentials, UserProfile } from '@mono/api-interface';
import { mono } from '@mono/proto';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiAuthService } from '../service/auth.service';

@Controller()
export class ApiAuthController {
  constructor(private readonly authService: ApiAuthService) {}

  @Get('auth')
  public ping(): mono.Result {
    return this.authService.ping();
  }

  @Post('login')
  public login(@Body() credentials: UserLoginCredentials): UserProfile {
    return this.authService.login(credentials);
  }

  @Post('logout')
  public logout(@Body() credentials: UserLogoutCredentials): mono.Result {
    return this.authService.logout(credentials);
  }

  @Post('signup')
  public signup(@Body() credentials: UserLoginCredentials): UserProfile {
    return this.authService.signup(credentials);
  }
}
