import { execSync, ExecSyncOptionsWithStringEncoding } from "child_process";
import dotenv from "dotenv";
import { existsSync } from "fs";

export type DockerExecOpts = {
  container: string;
  cmd: string;
  options?: ExecSyncOptionsWithStringEncoding;
}
export function dockerExecSync({container, cmd, options}: DockerExecOpts) {
  const finalCmd = `docker exec -i ${container} ${cmd}`;
  execSync(finalCmd, options);
}
type OptsPathOptional = { path? : string };
export type DockerRunOpts = OptsPathOptional & {
  dettach: boolean;
}
export function dockerRunSync({path = __dirname, dettach = false}: DockerRunOpts) {
  const dockerComposeFile = searchForDockerComposeFile(path);

  if (dockerComposeFile) {
    let args = "";
    if (dettach)
      args += "-d";
    execSync(`docker-compose -f ${dockerComposeFile} up ${args}`);
  }
}
export type DockerStopOpts = OptsPathOptional;
export function dockerStopSync({path = __dirname}: DockerStopOpts = {}) {
  const dockerComposeFile = searchForDockerComposeFile(path);

  if (dockerComposeFile) {
    execSync(`docker-compose -f ${dockerComposeFile} stop`);
  }
}

function searchForDockerComposeFile(path: string): string | null {
  loadEnvIfExists(path);

  const fileName = process.env.YAML ?? "docker-compose.yml";
  const filePath = `./${fileName}`;

  if (existsSync(filePath))
    return filePath;
  else
    return null;
}

function loadEnvIfExists(path: string) {
  dotenv.config();
}