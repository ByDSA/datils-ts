import path from "path";
import { argv } from "zx";

export {
  default as getArgvEnv,
} from "./getEnv";

export function getArgvOutFolder() {
  return argv.outFolder ? path.resolve(argv.outFolder) : undefined;
}
