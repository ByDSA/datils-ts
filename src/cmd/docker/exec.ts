import { $ } from "zx";
import { getSudoStr } from "../params";
import { DockerContainerParams } from "./container";

type DockerExecParams =
DockerContainerParams & {
    cmd: string;
  };

export default function exec(params: DockerExecParams) {
  const sudo = `${getSudoStr(params)} `;

  return $`${sudo}docker exec -i ${params.container} ${params.cmd}`;
}
