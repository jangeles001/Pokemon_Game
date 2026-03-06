import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { getEnv } from "../utils/getEnv";
import { SessionStore } from "./store/sessionStore"
import { GameEngine } from "./services/gameService"
import { createGameService } from "./services/createGameService"


const sessionStore = new SessionStore();
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

const server = new grpc.Server();
server.addService(gamePackage.GameService.service,
    gameServiceImpl
)