import { DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';

import { ApiMailerController } from './controller/mailer.controller';
import { ApiMailerService } from './service/mailer.service';

const moduleProviders: Provider[] = [ApiMailerService];

@Module({
  controllers: [ApiMailerController],
})
export class ApiMailerModule implements OnModuleInit {
  public static forRoot(): DynamicModule {
    return {
      module: ApiMailerModule,
      providers: [...moduleProviders],
      exports: [...moduleProviders],
    };
  }

  constructor(private readonly mailerService: ApiMailerService) {}

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
