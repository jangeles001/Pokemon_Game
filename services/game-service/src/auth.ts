import * as grpc from "@grpc/grpc-js";
import * as jwt from "jsonwebtoken";
import { getEnv } from "../utils/getEnv";   

export async function verifyAuth(metadata: grpc.Metadata) {
  const vals = metadata.get("authorization") as (string | Buffer)[]; // gRPC metadata values can be strings or buffers
  const raw = vals && vals[0]; // Expecting a single "authorization" header; if multiple are present, we take the first one
  if (!raw) {  // No authorization header found
    const err: any = new Error("Missing authorization"); // Create an error object with a message indicating the issue
    err.code = grpc.status.UNAUTHENTICATED; // Set the gRPC status code to UNAUTHENTICATED to indicate an authentication failure
    throw err;
  }
  const tokenStr = (typeof raw === "string" ? raw : raw.toString()).replace(/^Bearer\s+/i, ""); // Convert the raw value to a string if it's a buffer, and remove any "Bearer " prefix (case-insensitive) to extract the token
  const secret = getEnv("JWT_SECRET") || "dev-secret"; // Retrieve the JWT secret from environment variables, or use a default value if not set
  try {
    return jwt.verify(tokenStr, secret); // Verify the token using the secret; if valid, this will return the decoded token payload. If invalid, it will throw an error which we catch below.
  } catch (e: any) {
    const err: any = new Error("Invalid token"); // Create an error object with a message indicating that the token is invalid
    err.code = grpc.status.UNAUTHENTICATED; // Set the gRPC status code to UNAUTHENTICATED to indicate an authentication failure
    throw err; // Throw the error to be handled by the caller, which will typically result in an appropriate gRPC error response being sent back to the client
  }
}

export function attachAuth(impl: Record<string, any>) {
  const wrapped: Record<string, any> = {}; // Create a new object to hold the wrapped implementations
  for (const key of Object.keys(impl)) { // Iterate over each key in the implementation object
    const fn = impl[key]; // Get the function associated with the current key
    if (typeof fn !== "function") continue;  // Skip any properties that are not functions (e.g., if the implementation object has non-function properties)
    // unary RPCs typically have (call, callback) => {}
    if (fn.length === 2) { // If the function has two parameters, we assume it's a unary RPC handler with the signature (call, callback) => {}
      wrapped[key] = (call: any, callback: any) => {
        try {
          verifyAuth(call.metadata);  // Attempt to verify the authentication using the metadata from the call. If the verification fails, it will throw an error which we catch below.
        } catch (err: any) { // If an error occurs during authentication verification, we catch it and return an appropriate gRPC error response using the callback. The error message is included in the response to provide more context about the failure.
          return callback({ code: grpc.status.UNAUTHENTICATED, message: err.message });
        }
        return fn.call(impl, call, callback);
      };
    } else {
      // streaming handlers have signature (call) => {}
      wrapped[key] = (call: any) => {
        try {
          verifyAuth(call.metadata);
        } catch (err: any) {
          // prefer destroying the call for streaming handlers
          return call.destroy && call.destroy({ code: grpc.status.UNAUTHENTICATED, message: err.message });
        }
        return fn.call(impl, call);
      };
    }
  }
  return wrapped;
}