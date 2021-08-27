import { execSync } from "child_process";

export function getLastPartOf(uri: string) {
  return uri.substring(uri.lastIndexOf('/') + 1);
}

export function getPwdPath(): string {
  const fullPwd = execSync("pwd").toString();
  if (fullPwd === undefined)
    throw new Error("'pwd' returned undefined value.");
  let originalPath = fullPwd.substr(0, fullPwd.length-1);
  return originalPath;
}