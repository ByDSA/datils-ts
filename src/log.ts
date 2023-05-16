/* eslint-disable default-case-last */
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
    default:
    case "info":
    case "all":
      console.log(`${chalk.cyan(msg)}`);
      break;
    case "none":
    case "error":
  }
}

export function logInfoVerbose(msg: string) {
  switch (verboseLevel) {
    default:
    case "all":
      console.log(`${chalk.cyan(msg)}`);
      break;
    case "info":
    case "none":
    case "error":
  }
}

export function logSuccess(msg: string) {
  switch (verboseLevel) {
    default:
    case "info":
    case "all":
      console.log(`${chalk.green(msg)}`);
      break;
    case "none":
    case "error":
  }
}

export function logSuccessVerbose(msg: string) {
  switch (verboseLevel) {
    default:
    case "all":
      console.log(`${chalk.green(msg)}`);
      break;
    case "info":
    case "none":
    case "error":
  }
}

export function logError(msg: string) {
  switch (verboseLevel) {
    default:
    case "info":
    case "error":
    case "all":
      console.log(`${chalk.red(msg)}`);
      break;
    case "none":
  }
}

export function logSection(msg: string) {
  switch (verboseLevel) {
    default:
    case "info":
    case "all":
      console.log(`${chalk.yellow(msg)}`);
      break;
    case "error":
    case "none":
  }
}
