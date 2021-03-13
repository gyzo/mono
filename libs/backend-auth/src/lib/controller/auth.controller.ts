import { UserLoginCredentials, UserLogoutCredentials, UserProfile } from '@mono/backend-interfaces';
import { mono } from '@mono/proto';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { BackendAuthService } from '../service/auth.service';

@Controller()
export class BackendAuthController {
  constructor(private readonly authService: BackendAuthService) {}

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
