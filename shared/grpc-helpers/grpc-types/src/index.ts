import * as grpc from "@grpc/grpc-js";

export interface AuthenticatedUser { // Define an interface for the authenticated user
  id: string;
  role: string; // Can add more properties as needed, such as username, email, etc.
}

export interface AuthenticatedUnaryCall<Req, Res> extends grpc.ServerUnaryCall<Req, Res> { // Extend the original ServerUnaryCall with an authenticated user property
  user: AuthenticatedUser;
}