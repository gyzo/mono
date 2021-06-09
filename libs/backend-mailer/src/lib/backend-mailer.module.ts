import { BackendDotenvService } from '@mono/backend-core';
import { DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';

import { BackendMailerController } from './controller/mailer.controller';
import { BackendMailerService } from './service/mailer.service';

const moduleProviders: Provider[] = [BackendMailerService];

@Module({
  providers: [BackendDotenvService],
  controllers: [BackendMailerController],
})
export class BackendMailerModule implements OnModuleInit {
  public static forRoot(): DynamicModule {
    return {
      module: BackendMailerModule,
      providers: [...moduleProviders],
      exports: [...moduleProviders],
    };
  }

  constructor(private readonly mailerService: BackendMailerService) {}

  public onModuleInit() {
    this.mailerService.mailTransporter.verify((err, success) => {
      if (err) {
        // eslint-disable-next-line no-console -- TODO: pass this to logger
        console.log('Mail transporter diag error >>', err);
      } else {
        // eslint-disable-next-line no-console -- TODO: pass this to logger
        console.log('Mail transporter diag success >>', success);
      }
    });
  }
}
