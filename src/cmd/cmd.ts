/* eslint-disable import/prefer-default-export */
import { question } from "zx";

function getBooleanSure(sure: string) {
  switch (sure) {
    case "y":
    case "yes":
    case "true":
    case "1":
      return true;
    default:
      return false;
  }
}

export async function questionYesNo(str: string) {
  const sure = await question(str);

  return getBooleanSure(sure);
}
