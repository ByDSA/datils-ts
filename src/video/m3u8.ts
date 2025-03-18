/* eslint-disable import/prefer-default-export */

import path from "path";
import { getAvailableFile, getLastPartOf, removeExtensionOf } from "../uri";
import * as ffmpeg from "./ffmpeg";

type OptsType = { outPath?: string; filename?: string };
export function download(url: string, opts: OptsType = {
} ) {
  let outPath = opts.outPath || "./";
  const filename: string = opts.filename || removeExtensionOf(getLastPartOf(url));

  outPath = path.resolve(outPath, filename);
  outPath = getAvailableFile(outPath);

  return ffmpeg.exec(["-i", url, "-c", "copy", "-bsf:a", "aac_adtstoasc", outPath]);
}
