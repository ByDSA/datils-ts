import { spawn } from "child_process";

export default function exec(cmd: string) {
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
