import { spawn } from "node:child_process";

export function exec(cmd: string) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, [], {
      shell: true,
      stdio: "inherit",
    } );

    child.on("exit", (code) => {
      resolve(code);
    } );

    child.on("error", (err) => {
      reject(err);
    } );
  } );
}
