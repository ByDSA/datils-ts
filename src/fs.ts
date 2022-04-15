import { existsSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { $ } from "zx";
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
  return $`mkdir -p "${p}"`;
}

export function currentFolderPathOf(filePath = import.meta.url) {
  return path.resolve(dirname(fileURLToPath(filePath) ?? currentFilePath()));
}

export function parentFolderPathOf(filePath = import.meta.url) {
  return path.resolve(currentFolderPathOf(filePath), "..");
}

export function currentFilePath() {
  return path.resolve(fileURLToPath(import.meta.url));
}
