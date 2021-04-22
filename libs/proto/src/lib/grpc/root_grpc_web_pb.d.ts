import * as grpcWeb from 'grpc-web';

import * as common_pb from './common_pb';
import * as mailer_pb from './mailer_pb';


export class EntityServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  findOne(
    request: common_pb.EntityById,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: common_pb.Entity) => void
  ): grpcWeb.ClientReadableStream<common_pb.Entity>;

}

export class MailerServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  findOne(
    request: mailer_pb.EmailById,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: mailer_pb.Email) => void
  ): grpcWeb.ClientReadableStream<mailer_pb.Email>;

}

export class EntityServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  findOne(
    request: common_pb.EntityById,
    metadata?: grpcWeb.Metadata
  ): Promise<common_pb.Entity>;

}

export class MailerServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  findOne(
    request: mailer_pb.EmailById,
    metadata?: grpcWeb.Metadata
  ): Promise<mailer_pb.Email>;

}

