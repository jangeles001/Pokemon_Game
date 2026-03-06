import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url) // Gets file path
const __dirname = path.dirname(__filename,)  // Gets directory name
dotenv.config( { path: path.resolve(__dirname, "../../.env") }); //always resolves file path from server/ root

const env: Record<string, string | undefined> = process.env;

export function getEnv(key: string): string{
if(env[key] === undefined){
    throw new Error("Failed to find key");
}

  return env[key];
}
