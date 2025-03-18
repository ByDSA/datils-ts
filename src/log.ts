import chalk from "chalk";

export type VerboseLevel = "all" | "error" | "info" | "none";

let verboseLevel: VerboseLevel = "info";

export function logSetLevel(level: VerboseLevel) {
  verboseLevel = level;
}

export function logGetLevel(): VerboseLevel {
  return verboseLevel;
}

export function logInfo(msg: string) {
  switch (verboseLevel) {
    case "none":
    case "error":
      break;
    case "info":
    case "all":
    default:
      console.log(`${chalk.cyan(msg)}`);
      break;
  }
}

export function logInfoVerbose(msg: string) {
  switch (verboseLevel) {
    case "info":
    case "none":
    case "error":
      break;
    case "all":
    default:
      console.log(`${chalk.cyan(msg)}`);
      break;
  }
}

export function logSuccess(msg: string) {
  switch (verboseLevel) {
    case "none":
    case "error":
      break;
    case "info":
    case "all":
    default:
      console.log(`${chalk.green(msg)}`);
      break;
  }
}

export function logSuccessVerbose(msg: string) {
  switch (verboseLevel) {
    case "info":
    case "none":
    case "error":
      break;
    case "all":
    default:
      console.log(`${chalk.green(msg)}`);
      break;
  }
}

export function logError(msg: string) {
  switch (verboseLevel) {
    case "none":
      break;
    case "info":
    case "error":
    case "all":
    default:
      console.log(`${chalk.red(msg)}`);
      break;
  }
}

export function logSection(msg: string) {
  switch (verboseLevel) {
    case "error":
    case "none":
      break;
    case "info":
    case "all":
    default:
      console.log(`${chalk.yellow(msg)}`);
      break;
  }
}
