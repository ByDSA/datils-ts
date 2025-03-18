import { execSync } from "child_process";
import { getSudoStr, SudoParams } from "../params";

export type Container = string;

export type DockerContainerParams = Partial<SudoParams> & {
  container: Container;
};

function getContainerFromParams(params: Container | DockerContainerParams): Container {
  if (typeof params === "string")
    return params;

  return params.container;
}

export function stopContainer(params: Container | DockerContainerParams) {
  return containerCmd("stop", params);
}

export function startContainer(params: Container | DockerContainerParams) {
  return containerCmd("start", params);
}

export function removeContainer(params: Container | DockerContainerParams) {
  return containerCmd("rm", params);
}

function containerCmd(cmd: string, params: Container | DockerContainerParams) {
  const container = getContainerFromParams(params);
  const sudo = typeof params === "string" ? false : `${getSudoStr(params)} `;

  return new Promise((s) => {
    const r = execSync(`${sudo}docker container ${cmd} ${container}`);

    s(r);
  } );
}
