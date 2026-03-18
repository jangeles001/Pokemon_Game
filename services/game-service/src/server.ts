import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { getEnv } from "../utils/getEnv";
import { attachAuth } from "./auth";
import { authInterceptor } from "./authInterceptor";
import { SessionStore } from "./store/sessionStore"
import { GameEngine } from "./services/gameService"
import { createGameService } from "./services/createGameService"


const sessionStore: SessionStore = new SessionStore();
const gameEngine = new GameEngine();
const gameServiceImpl = createGameService(sessionStore, gameEngine);

const packageDef = protoLoader.loadSync(getEnv("PROTO_PATH"), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const grpcObject = grpc.loadPackageDefinition(packageDef) as grpc.GrpcObject;
const gamePackage = (grpcObject.game as any).v1;

const server = new grpc.Server({
    interceptors: [authInterceptor]
});
server.addService(gamePackage.GameService.service,
    gameServiceImpl
)

const securedImpl = attachAuth(gameServiceImpl);
server.addService(gamePackage.GameService.service, securedImpl);

const addr =  getEnv("GRPC_BIND_ADDRESS"); // e.g. 0.0.0:50051"
server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error("Server binding error:", err);
        process.exit(1);
    }
    console.log("Game service started with authentication.");
});