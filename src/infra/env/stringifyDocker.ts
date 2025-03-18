import { EnvObj } from "./types";

export function stringifyDocker(envObj: EnvObj) {
  const envStr = Object.entries(envObj);

  return `-e ${envStr.map(([key, value]) => `${key}=${value}`).join("-e ")}`;
}
