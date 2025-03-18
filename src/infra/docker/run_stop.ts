import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import dotenv from "dotenv";
import { logInfoVerbose } from "../../log";
import { ARG_DETTACH_DEFAULT, ArgDettachOpt, ArgPathOpt, ARG_SUDO_DEFAULT, ArgSudoOpt } from "./opts";

export type DockerRunOpts = ArgDettachOpt & ArgPathOpt & ArgSudoOpt;

export function dockerRunSync( { dettach = ARG_DETTACH_DEFAULT,

  sudo = ARG_SUDO_DEFAULT }: DockerRunOpts = {} ) {
  const dockerComposeFile = searchForDockerComposeFile();

  if (dockerComposeFile) {
    let args = "";

    if (dettach)

      args += "-d";

    let cmd = "";

    if (sudo)

      cmd += "sudo ";

    cmd += `docker-compose -f ${dockerComposeFile} up ${args}`;

    logInfoVerbose(`Executing '${cmd}'`);

    execSync(cmd, {

      stdio: "inherit",

    } );
  }
}

export type DockerStopOpts = ArgPathOpt & ArgSudoOpt;

export function dockerStopSync( { sudo = ARG_SUDO_DEFAULT }: DockerStopOpts = {} ) {
  const dockerComposeFile = searchForDockerComposeFile();

  if (dockerComposeFile) {
    let cmd = "";

    if (sudo)

      cmd += "sudo ";

    cmd += `docker-compose -f ${dockerComposeFile} stop`;

    logInfoVerbose(`Executing '${cmd}'`);

    execSync(cmd, {

      stdio: "inherit",

    } );
  }
}

function searchForDockerComposeFile(): string | null {
  logInfoVerbose("Searching for docker-compose file ...");

  loadEnvIfExists();

  const fileName = process.env.YAML ?? "docker-compose.yml";
  const filePath = `./${fileName}`;

  if (existsSync(filePath))

    return filePath;

  return null;
}

function loadEnvIfExists() {
  logInfoVerbose("Loading env file ...");

  dotenv.config();
}
