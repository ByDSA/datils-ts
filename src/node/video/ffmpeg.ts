import { spawn } from "node:child_process";

export function exec(params: readonly string[] = []) {
  if (!process.env.FFMPEG_PATH) {
    console.log("No env FFMPEG_PATH");
    process.exit(1);
  }

  return spawn(process.env.FFMPEG_PATH, params);
}
