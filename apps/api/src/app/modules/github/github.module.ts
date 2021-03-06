import { DynamicModule, Module, Provider } from '@nestjs/common';

import { ApiGithubController } from './controller/github.controller';
import { ApiGithubService } from './service/github.service';

const moduleProviders: Provider[] = [ApiGithubService];

@Module({
  controllers: [ApiGithubController],
})
export class ApiGithubModule {
  public static forRoot(): DynamicModule {
    return {
      module: ApiGithubModule,
      providers: [...moduleProviders],
      exports: [...moduleProviders],
    };
  }
}
