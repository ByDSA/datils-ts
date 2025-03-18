import path from "node:path";
import { config } from "dotenv";
import { getEnv } from "./getEnv";

type Params = Partial<{
  path: string;
  folder: string;
}>;

export function loadEnvFile(params?: Params) {
  const p = params?.path;
  let pEnv: string;

  if (p)
    pEnv = path.resolve(p);
  else
    pEnv = path.resolve(params?.folder ?? "", `./${getEnv()}.env`);

  config( {
    path: pEnv,
  } );
}
