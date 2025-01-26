/**
 * @fileoverview gRPC-Web generated client stub for question
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.question = require('./question_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.question.QuestionServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

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
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.question.QuestionServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

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
 *   !proto.question.TitleRequest,
 *   !proto.question.QuestionsResponse>}
 */
const methodDescriptor_QuestionService_GetQuestionsByTitle = new grpc.web.MethodDescriptor(
  '/question.QuestionService/GetQuestionsByTitle',
  grpc.web.MethodType.UNARY,
  proto.question.TitleRequest,
  proto.question.QuestionsResponse,
  /**
   * @param {!proto.question.TitleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.question.QuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.question.TitleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.question.QuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.question.QuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.question.QuestionServiceClient.prototype.getQuestionsByTitle =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/question.QuestionService/GetQuestionsByTitle',
      request,
      metadata || {},
      methodDescriptor_QuestionService_GetQuestionsByTitle,
      callback);
};


/**
 * @param {!proto.question.TitleRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.question.QuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.question.QuestionServicePromiseClient.prototype.getQuestionsByTitle =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/question.QuestionService/GetQuestionsByTitle',
      request,
      metadata || {},
      methodDescriptor_QuestionService_GetQuestionsByTitle);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.question.TypeRequest,
 *   !proto.question.QuestionsResponse>}
 */
const methodDescriptor_QuestionService_GetQuestionsByType = new grpc.web.MethodDescriptor(
  '/question.QuestionService/GetQuestionsByType',
  grpc.web.MethodType.UNARY,
  proto.question.TypeRequest,
  proto.question.QuestionsResponse,
  /**
   * @param {!proto.question.TypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.question.QuestionsResponse.deserializeBinary
);


/**
 * @param {!proto.question.TypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.question.QuestionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.question.QuestionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.question.QuestionServiceClient.prototype.getQuestionsByType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/question.QuestionService/GetQuestionsByType',
      request,
      metadata || {},
      methodDescriptor_QuestionService_GetQuestionsByType,
      callback);
};


/**
 * @param {!proto.question.TypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.question.QuestionsResponse>}
 *     Promise that resolves to the response
 */
proto.question.QuestionServicePromiseClient.prototype.getQuestionsByType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/question.QuestionService/GetQuestionsByType',
      request,
      metadata || {},
      methodDescriptor_QuestionService_GetQuestionsByType);
};


module.exports = proto.question;

