import { execSync } from "child_process";

export function getLastPartOf(uri: string) {
  return uri.substring(uri.lastIndexOf('/') + 1);
}

export function getPwdPath(): string {
  const fullPwd = execSync("pwd").toString();
  let originalPath = fullPwd.substr(0, fullPwd.length-1);
  return originalPath;
}