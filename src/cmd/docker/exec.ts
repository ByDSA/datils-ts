import { execSync } from "child_process";
import { EnvObj, stringifyDockerEnvObj } from "../env/index.ts";
import { getSudoStr } from "../params.ts";
import { DockerContainerParams } from "./container.ts";

type DockerExecParams =
DockerContainerParams & {
  cmd: string;
} & {
  env?: EnvObj;
};

// eslint-disable-next-line require-await
export default async function exec(params: DockerExecParams) {
  const sudo = `${getSudoStr(params)} `;
  const envs = params.env ? stringifyDockerEnvObj(params.env) : null;
  const cmd1 = `${sudo}docker exec`;
  const cmd2 = `-i ${params.container} ${params.cmd}`;
  const cmdWithEnv = joinCmd(cmd1, cmd2, envs);
  const cmdHiddenEnv = joinCmd(cmd1, cmd2, envs ? "*HIDDEN ENV*" : null);

  console.log(`Executing: ${cmdHiddenEnv}`);
  execSync(cmdWithEnv);
}

function joinCmd(cmd1: string, cmd2: string, envsStr: string | null) {
  if (envsStr)
    return `${cmd1} ${envsStr} ${cmd2}`;

  return `${cmd1} ${cmd2}`;
}
