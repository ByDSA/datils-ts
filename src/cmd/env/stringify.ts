import { EnvObj } from "./types.ts";

export default function stringify(envObj: EnvObj) {
  const envStr = Object.entries(envObj);

  return envStr.map(([key, value]) => `${key}=${value}`).join(" ");
}
