import { ApiEnvironment } from '@mono/backend-interfaces';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { BackendGrpcController } from './controller/grpc.controller';
import { backendGrpcClientOptions, MONO_GRPC_PACKAGE } from './grpc-client.options';

@Module({
  controllers: [BackendGrpcController],
})
export class BackendGrpcModule {
  public static forRoot(env: ApiEnvironment): DynamicModule {
    const grpcClientOptions = backendGrpcClientOptions(env);

    return {
      module: BackendGrpcModule,
      imports: [
        ClientsModule.register([
          {
            name: MONO_GRPC_PACKAGE,
            ...grpcClientOptions,
          },
        ]),
      ],
    };
  }
}
