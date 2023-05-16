import { config } from "dotenv";
import path from "path";
import getEnv from "../argv/getEnv.ts";

type Params = Partial<{
  path: string;
  folder: string;
}>;

export default function loadEnvFile(params?: Params) {
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
