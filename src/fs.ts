import { existsSync, mkdirSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { logError } from "./log";

export function checkFileExists(filePath: string) {
  if (!existsSync(filePath)) {
    const errorMsg = `File doesn't exist: ${filePath}`;

    logError(errorMsg);
    throw new Error(errorMsg);
  }
}

export function checkFileNotExists(filePath: string) {
  if (existsSync(filePath)) {
    const errorMsg = `File already exists: ${filePath}`;

    logError(errorMsg);
    throw new Error(errorMsg);
  }
}

export function mkdir(p: string) {
  return new Promise((s) => {
    const r = mkdirSync(p, "-p");

    s(r);
  } );
}

export function currentFolderPathOf(filePath: string = path.resolve(__filename)) {
  return path.resolve(dirname(fileURLToPath(filePath) ?? currentFilePath()));
}

export function parentFolderPathOf(filePath = path.resolve(__filename)) {
  return path.resolve(currentFolderPathOf(filePath), "..");
}

export function currentFilePath() {
  return path.resolve(fileURLToPath(path.resolve(__filename)));
}
