import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ApiGrpcController } from './controller/grpc.controller';
import { apiGrpcClientOptions, MONO_GRPC_PACKAGE } from './grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MONO_GRPC_PACKAGE,
        ...apiGrpcClientOptions,
      },
    ]),
  ],
  controllers: [ApiGrpcController],
})
export class ApiGrpcModule {}
