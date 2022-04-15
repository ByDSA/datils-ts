import { $ } from "zx";
import { EnvParam, stringifyEnvObj } from "./env";

type Params = Partial<{
  env: EnvParam;
  dettach: boolean;
  sudo: boolean;
}>;

function params2String(params: Params) {
  const { env, dettach } = params;
  let preParamsStr = "";
  let postParamsStr = "";

  if (env)
    preParamsStr += `--env-file ${env} `;

  if (dettach)
    postParamsStr += "-d ";

  return {
    preParamsStr,
    postParamsStr,
  };
}

export function exec(service: string, cmd: string, params?: Params) {
  return dockerCompose(`exec ${service} ${cmd}`, params);
}

export function up(params?: Params) {
  return dockerCompose("up", params);
}

function dockerCompose(cmd: string, params?: Params) {
  const paramsStr = params2String(params ?? {
  } );
  const { postParamsStr } = paramsStr;
  let { preParamsStr } = paramsStr;
  let ret = "";

  if (params?.sudo)
    ret += "sudo ";

  if (typeof params?.env === "object")
    preParamsStr += `-e ${stringifyEnvObj(params.env)} `;

  ret += `docker-compose ${preParamsStr} ${cmd} ${postParamsStr}`;

  return $`${ret}`;
}

export function upDetach(params?: Params) {
  return dockerCompose("up", {
    ...params,
    dettach: true,
  } );
}

export function stop(params?: Params) {
  return dockerCompose("stop", params);
}

export function build(params?: Params) {
  return dockerCompose("build", params);
}
