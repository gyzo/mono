import * as $protobuf from "protobufjs";
/** Namespace mono. */
export namespace mono {

    /** Properties of an Entity. */
    interface IEntity {

        /** Entity id */
        id?: (string|null);

        /** Entity num1 */
        num1?: (number|null);

        /** Entity num2 */
        num2?: (number|null);

        /** Entity boolean1 */
        boolean1?: (boolean|null);

        /** Entity float1 */
        float1?: (number|null);

        /** Entity any1 */
        any1?: (google.protobuf.IAny|null);

        /** Entity subEntities */
        subEntities?: (mono.ISubEntity[]|null);
    }

    /** Represents an Entity. */
    class Entity implements IEntity {

        /**
         * Constructs a new Entity.
         * @param [p] Properties to set
         */
        constructor(p?: mono.IEntity);

        /** Entity id. */
        public id: string;

        /** Entity num1. */
        public num1: number;

        /** Entity num2. */
        public num2: number;

        /** Entity boolean1. */
        public boolean1: boolean;

        /** Entity float1. */
        public float1: number;

        /** Entity any1. */
        public any1?: (google.protobuf.IAny|null);

        /** Entity subEntities. */
        public subEntities: mono.ISubEntity[];

        /**
         * Creates an Entity message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns Entity
         */
        public static fromObject(d: { [k: string]: any }): mono.Entity;

        /**
         * Creates a plain object from an Entity message. Also converts values to other types if specified.
         * @param m Entity
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: mono.Entity, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Entity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SubEntity. */
    interface ISubEntity {

        /** SubEntity id */
        id?: (string|null);
    }

    /** Represents a SubEntity. */
    class SubEntity implements ISubEntity {

        /**
         * Constructs a new SubEntity.
         * @param [p] Properties to set
         */
        constructor(p?: mono.ISubEntity);

        /** SubEntity id. */
        public id: string;

        /**
         * Creates a SubEntity message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns SubEntity
         */
        public static fromObject(d: { [k: string]: any }): mono.SubEntity;

        /**
         * Creates a plain object from a SubEntity message. Also converts values to other types if specified.
         * @param m SubEntity
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: mono.SubEntity, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubEntity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EntityById. */
    interface IEntityById {

        /** EntityById id */
        id?: (string|null);
    }

    /** Represents an EntityById. */
    class EntityById implements IEntityById {

        /**
         * Constructs a new EntityById.
         * @param [p] Properties to set
         */
        constructor(p?: mono.IEntityById);

        /** EntityById id. */
        public id: string;

        /**
         * Creates an EntityById message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns EntityById
         */
        public static fromObject(d: { [k: string]: any }): mono.EntityById;

        /**
         * Creates a plain object from an EntityById message. Also converts values to other types if specified.
         * @param m EntityById
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: mono.EntityById, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityById to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Result. */
    interface IResult {

        /** Result message */
        message?: (string|null);
    }

    /** Represents a Result. */
    class Result implements IResult {

        /**
         * Constructs a new Result.
         * @param [p] Properties to set
         */
        constructor(p?: mono.IResult);

        /** Result message. */
        public message: string;

        /**
         * Creates a Result message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns Result
         */
        public static fromObject(d: { [k: string]: any }): mono.Result;

        /**
         * Creates a plain object from a Result message. Also converts values to other types if specified.
         * @param m Result
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: mono.Result, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Result to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Email. */
    interface IEmail {

        /** Email id */
        id?: (string|null);

        /** Email name */
        name?: (string|null);

        /** Email email */
        email?: (string|null);

        /** Email header */
        header?: (string|null);

        /** Email message */
        message?: (string|null);

        /** Email domain */
        domain?: (string|null);
    }

    /** Represents an Email. */
    class Email implements IEmail {

        /**
         * Constructs a new Email.
         * @param [p] Properties to set
         */
        constructor(p?: mono.IEmail);

        /** Email id. */
        public id: string;

        /** Email name. */
        public name: string;

        /** Email email. */
        public email: string;

        /** Email header. */
        public header: string;

        /** Email message. */
        public message: string;

        /** Email domain. */
        public domain: string;

        /**
         * Creates an Email message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns Email
         */
        public static fromObject(d: { [k: string]: any }): mono.Email;

        /**
         * Creates a plain object from an Email message. Also converts values to other types if specified.
         * @param m Email
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: mono.Email, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Email to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EmailById. */
    interface IEmailById {

        /** EmailById id */
        id?: (string|null);
    }

    /** Represents an EmailById. */
    class EmailById implements IEmailById {

        /**
         * Constructs a new EmailById.
         * @param [p] Properties to set
         */
        constructor(p?: mono.IEmailById);

        /** EmailById id. */
        public id: string;

        /**
         * Creates an EmailById message from a plain object. Also converts values to their respective internal types.
         * @param d Plain object
         * @returns EmailById
         */
        public static fromObject(d: { [k: string]: any }): mono.EmailById;

        /**
         * Creates a plain object from an EmailById message. Also converts values to other types if specified.
         * @param m EmailById
         * @param [o] Conversion options
         * @returns Plain object
         */
        public static toObject(m: mono.EmailById, o?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EmailById to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents an EntityService */
    class EntityService extends $protobuf.rpc.Service {

        /**
         * Constructs a new EntityService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls FindOne.
         * @param request EntityById message or plain object
         * @param callback Node-style callback called with the error, if any, and Entity
         */
        public findOne(request: mono.IEntityById, callback: mono.EntityService.FindOneCallback): void;

        /**
         * Calls FindOne.
         * @param request EntityById message or plain object
         * @returns Promise
         */
        public findOne(request: mono.IEntityById): Promise<mono.Entity>;

        /**
         * Calls FindMany.
         * @param request EntityById message or plain object
         * @param callback Node-style callback called with the error, if any, and Entity
         */
        public findMany(request: mono.IEntityById, callback: mono.EntityService.FindManyCallback): void;

        /**
         * Calls FindMany.
         * @param request EntityById message or plain object
         * @returns Promise
         */
        public findMany(request: mono.IEntityById): Promise<mono.Entity>;
    }

    namespace EntityService {

        /**
         * Callback as used by {@link mono.EntityService#findOne}.
         * @param error Error, if any
         * @param [response] Entity
         */
        type FindOneCallback = (error: (Error|null), response?: mono.Entity) => void;

        /**
         * Callback as used by {@link mono.EntityService#findMany}.
         * @param error Error, if any
         * @param [response] Entity
         */
        type FindManyCallback = (error: (Error|null), response?: mono.Entity) => void;
    }

    /** Represents a MailerService */
    class MailerService extends $protobuf.rpc.Service {

        /**
         * Constructs a new MailerService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls FindOne.
         * @param request EmailById message or plain object
         * @param callback Node-style callback called with the error, if any, and Email
         */
        public findOne(request: mono.IEmailById, callback: mono.MailerService.FindOneCallback): void;

        /**
         * Calls FindOne.
         * @param request EmailById message or plain object
         * @returns Promise
         */
        public findOne(request: mono.IEmailById): Promise<mono.Email>;

        /**
         * Calls FindMany.
         * @param request EmailById message or plain object
         * @param callback Node-style callback called with the error, if any, and Email
         */
        public findMany(request: mono.IEmailById, callback: mono.MailerService.FindManyCallback): void;

        /**
         * Calls FindMany.
         * @param request EmailById message or plain object
         * @returns Promise
         */
        public findMany(request: mono.IEmailById): Promise<mono.Email>;
    }

    namespace MailerService {

        /**
         * Callback as used by {@link mono.MailerService#findOne}.
         * @param error Error, if any
         * @param [response] Email
         */
        type FindOneCallback = (error: (Error|null), response?: mono.Email) => void;

        /**
         * Callback as used by {@link mono.MailerService#findMany}.
         * @param error Error, if any
         * @param [response] Email
         */
        type FindManyCallback = (error: (Error|null), response?: mono.Email) => void;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param d Plain object
             * @returns Any
             */
            public static fromObject(d: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param m Any
             * @param [o] Conversion options
             * @returns Plain object
             */
            public static toObject(m: google.protobuf.Any, o?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
