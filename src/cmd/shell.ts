/* eslint-disable import/prefer-default-export */
export function pause() {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", process.exit.bind(process, 0));
}
