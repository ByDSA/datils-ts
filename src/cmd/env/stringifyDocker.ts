import { EnvObj } from "./types.ts";

export default function stringifyDocker(envObj: EnvObj) {
  const envStr = Object.entries(envObj);

  return `-e ${envStr.map(([key, value]) => `${key}=${value}`).join("-e ")}`;
}
