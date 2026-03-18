import * as grpc from "@grpc/grpc-js";
import { verifyAuth } from "./auth";

export const authInterceptor: grpc.ServerInterceptor = (methodDefinition, next) => {
  // 1. Define the Listener (Handles INBOUND data: Metadata, Messages)
  const listener = new grpc.ServerListenerBuilder()
    .withOnReceiveMetadata(async (metadata, nextMetadata) => {
      try {
        const decoded = await verifyAuth(metadata);
        // Safely attach user to the metadata for the handler
        (metadata as any).user = decoded;
        
        // Success: pass metadata to the next listener
        nextMetadata(metadata);
      } catch (err: any) {
        // Error: Terminate the call with UNAUTHENTICATED
        // The callback expects a Metadata object OR a Status object
        nextMetadata({
          code: grpc.status.UNAUTHENTICATED,
          details: err?.message || "Unauthenticated",
        } as any);
      }
    })
    .build();

  // 2. Define the Responder (Handles OUTBOUND data: Metadata, Messages, Status)
  // We usually pass the outbound data through without modification
  const responder = new grpc.ResponderBuilder()
    .withStart((nextStart) => {
      // Start the call chain by passing our listener
      nextStart(listener);
    })
    .build();

  // 3. Return a new ServerInterceptingCall that links the two
  return new grpc.ServerInterceptingCall(next, responder);
};