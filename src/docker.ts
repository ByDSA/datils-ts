import { execSync, ExecSyncOptionsWithStringEncoding } from "child_process";

export type DockerExecOpts = {
  container: string;
  cmd: string;
  options?: ExecSyncOptionsWithStringEncoding;
}
export function dockerExecSync({container, cmd, options}: DockerExecOpts) {
  const finalCmd = `docker exec -i ${container} ${cmd}`;
  execSync(finalCmd, options);
}