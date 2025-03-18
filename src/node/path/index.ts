import { execSync } from "node:child_process";

export function getPwdPath(): string {
  const fullPwd = execSync("pwd").toString();

  if (fullPwd === undefined)
    throw new Error("'pwd' returned undefined value.");

  const originalPath = fullPwd.substring(0, fullPwd.length - 1);

  return originalPath;
}
