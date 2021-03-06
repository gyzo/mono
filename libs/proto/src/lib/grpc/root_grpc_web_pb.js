/**
 * @fileoverview gRPC-Web generated client stub for mono
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var common_pb = require('./common_pb.js')
const proto = {};
proto.mono = require('./root_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.mono.EntityServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.mono.EntityServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mono.EntityById,
 *   !proto.mono.Entity>}
 */
const methodDescriptor_EntityService_FindOne = new grpc.web.MethodDescriptor(
  '/mono.EntityService/FindOne',
  grpc.web.MethodType.UNARY,
  common_pb.EntityById,
  common_pb.Entity,
  /**
   * @param {!proto.mono.EntityById} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.Entity.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.mono.EntityById,
 *   !proto.mono.Entity>}
 */
const methodInfo_EntityService_FindOne = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.Entity,
  /**
   * @param {!proto.mono.EntityById} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.Entity.deserializeBinary
);


/**
 * @param {!proto.mono.EntityById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.mono.Entity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mono.Entity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mono.EntityServiceClient.prototype.findOne =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mono.EntityService/FindOne',
      request,
      metadata || {},
      methodDescriptor_EntityService_FindOne,
      callback);
};


/**
 * @param {!proto.mono.EntityById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mono.Entity>}
 *     Promise that resolves to the response
 */
proto.mono.EntityServicePromiseClient.prototype.findOne =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mono.EntityService/FindOne',
      request,
      metadata || {},
      methodDescriptor_EntityService_FindOne);
};


module.exports = proto.mono;

