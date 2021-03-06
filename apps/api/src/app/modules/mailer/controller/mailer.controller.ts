import { mono } from '@mono/proto';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiMailerService } from '../service/mailer.service';

@Controller()
export class ApiMailerController {
  constructor(private readonly service: ApiMailerService) {}

  @Get('mailer')
  public ping(): mono.Result {
    return this.service.ping();
  }

  @Post('mail')
  public mail(@Body() formData: mono.Email) {
    return this.service.mail(formData);
  }
}
