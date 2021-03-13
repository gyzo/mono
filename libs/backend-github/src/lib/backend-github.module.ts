import { DynamicModule, HttpModule, Module, Provider } from '@nestjs/common';

import { BackendGithubController } from './controller/github.controller';
import { BackendGithubService } from './service/github.service';

const moduleProviders: Provider[] = [BackendGithubService];

@Module({
  imports: [HttpModule],
  controllers: [BackendGithubController],
})
export class BackendGithubModule {
  public static forRoot(): DynamicModule {
    return {
      module: BackendGithubModule,
      providers: [...moduleProviders],
      exports: [...moduleProviders],
    };
  }
}
