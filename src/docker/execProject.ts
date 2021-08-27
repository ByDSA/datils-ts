import { execSync } from "child_process";
import { logSection } from "../log";
import { getLastPartOf } from "../uri";
import { ArgDettachDefault, ArgDettachOpt, ArgPathOpt } from "./opts";
import { dockerRunSync, dockerStopSync } from "./run_stop";

type ExecProjectArgs = ArgPathOpt & ArgDettachOpt;
const ExecProjectDefaultArgs : ExecProjectArgs = {
  path: undefined,
  dettach: ArgDettachDefault
}
export default function execProject({
  path = ExecProjectDefaultArgs.path,
  dettach = ExecProjectDefaultArgs.dettach
}: ExecProjectArgs = {}) {
  let originalPath = getCurrentPath();

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

function getCurrentPath(): string {
  const fullPwd = execSync("pwd").toString();
  let originalPath = fullPwd.substr(0, fullPwd.length-1);
  return originalPath;
}