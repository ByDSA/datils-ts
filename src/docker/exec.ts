import { execSync, ExecSyncOptionsWithStringEncoding } from "child_process";
import { ArgSudoDefault, ArgSudoOpt } from "./opts";

export type DockerExecOpts = {
  container: string;
  cmd: string;
  execSyncOpts?: ExecSyncOptionsWithStringEncoding;
} & ArgSudoOpt;
export default function dockerExecSync({
  container,
  cmd,
  execSyncOpts,
  sudo = ArgSudoDefault
}: DockerExecOpts) {
  let finalCmd = "";
  if (sudo)
    finalCmd += "sudo ";
  finalCmd += `docker exec -i ${container} ${cmd}`;
  execSync(finalCmd, execSyncOpts);
}