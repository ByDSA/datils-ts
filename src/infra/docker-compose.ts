import { Argv } from "../node/cmd/argv/Argv";
import { exec as execCmd } from "../node/os/process";
import { EnvParam, stringifyEnvObj } from "./env";

type Params = Partial<{
  env: EnvParam;
  dettach: boolean;
  sudo: boolean;
}>;

type ExecParams = Params & Partial<{
  disableTTY: boolean;
}>;

function generateArgs(params?: Params) {
  if (!params) {
    return {
      preParams: new Argv(),
      postParams: new Argv(),
    };
  }

  const { env, dettach } = params;
  const preParams = new Argv();
  const postParams = new Argv();

  if (env)
    preParams.push(`--env-file ${env}`);

  if (dettach)
    postParams.push("-d");

  return {
    preParams,
    postParams,
  };
}

export function exec(service: string, cmd: string, params?: ExecParams) {
  const argv = new Argv();

  argv.push("exec");

  if (params?.disableTTY)
    argv.push("-T");

  argv.push(service, cmd);

  return dockerCompose(argv.toString(), params);
}

export function up(params?: Params) {
  return dockerCompose("up", params);
}

function dockerCompose(cmd: string, params?: Params) {
  const argv = new Argv();

  if (params?.sudo)
    argv.push("sudo");

  argv.push("docker-compose");

  if (typeof params?.env === "object")
    argv.push(`-e ${stringifyEnvObj(params.env)}`);

  const argvPrePost = generateArgs(params);

  argv.push(
    argvPrePost.preParams,
    cmd,
    argvPrePost.postParams,
  );
  console.log(argv.toString());

  return execCmd(argv.toString());
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
