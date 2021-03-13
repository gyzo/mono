import { mono } from '@mono/proto';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { BackendMailerService } from '../service/mailer.service';

@Controller()
export class BackendMailerController {
  constructor(private readonly service: BackendMailerService) {}

  @Get('mailer')
  public ping(): mono.Result {
    return this.service.ping();
  }

  @Post('mail')
  public mail(@Body() formData: mono.Email) {
    return this.service.mail(formData);
  }
}
