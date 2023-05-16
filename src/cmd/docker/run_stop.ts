import { execSync } from "child_process";

import dotenv from "dotenv";

import { existsSync } from "fs";

import { logInfoVerbose } from "../../log.ts";

import { ArgDettachDefault, ArgDettachOpt, ArgPathOpt, ArgSudoDefault, ArgSudoOpt } from "./opts.ts";

export type DockerRunOpts = ArgDettachOpt & ArgPathOpt & ArgSudoOpt;

export function dockerRunSync( { dettach = ArgDettachDefault,

  sudo = ArgSudoDefault }: DockerRunOpts = {

} ) {
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

export function dockerStopSync( { sudo = ArgSudoDefault }: DockerStopOpts = {

} ) {
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
