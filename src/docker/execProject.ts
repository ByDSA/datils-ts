import { execSync } from "child_process";
import { logSection } from "../log";
import { getLastPartOf, getPwdPath } from "../uri";
import { ArgDettachDefault, ArgDettachOpt, ArgPathOpt } from "./opts";
import { dockerRunSync, dockerStopSync } from "./run_stop";

type ExecProjectArgs = ArgPathOpt & ArgDettachOpt;
const ArgPathDefault = undefined;
export default function execProject({
  path = ArgPathDefault,
  dettach = ArgDettachDefault
}: ExecProjectArgs = {}) {
  let originalPath = getPwdPath();

  if (path)
    execSync(`cd ${path}`, {stdio: 'inherit'});

  const PROJECT_NAME = getLastPartOf(path);
  const opts = { sudo: true, dettach };
  logSection(`[${PROJECT_NAME}]`);
  dockerStopSync(opts);
  dockerRunSync(opts);

  if (path)
    execSync(`cd ${originalPath}`, {stdio: 'inherit'});
}