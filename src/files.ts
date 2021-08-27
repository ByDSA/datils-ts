import { existsSync } from "fs";
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