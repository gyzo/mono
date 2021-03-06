import * as jspb from 'google-protobuf'



export class Email extends jspb.Message {
  getId(): string;
  setId(value: string): Email;

  getName(): string;
  setName(value: string): Email;

  getEmail(): string;
  setEmail(value: string): Email;

  getHeader(): string;
  setHeader(value: string): Email;

  getMessage(): string;
  setMessage(value: string): Email;

  getDomain(): string;
  setDomain(value: string): Email;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Email.AsObject;
  static toObject(includeInstance: boolean, msg: Email): Email.AsObject;
  static serializeBinaryToWriter(message: Email, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Email;
  static deserializeBinaryFromReader(message: Email, reader: jspb.BinaryReader): Email;
}

export namespace Email {
  export type AsObject = {
    id: string,
    name: string,
    email: string,
    header: string,
    message: string,
    domain: string,
  }
}

export class EmailById extends jspb.Message {
  getId(): string;
  setId(value: string): EmailById;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailById.AsObject;
  static toObject(includeInstance: boolean, msg: EmailById): EmailById.AsObject;
  static serializeBinaryToWriter(message: EmailById, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailById;
  static deserializeBinaryFromReader(message: EmailById, reader: jspb.BinaryReader): EmailById;
}

export namespace EmailById {
  export type AsObject = {
    id: string,
  }
}

