import * as grpc from '@grpc/grpc-js';

// Define a standard interface for gRPC errors
export interface GrpcError extends Error {
  code: grpc.status;
  details?: string;
  metadata?: grpc.Metadata;
}