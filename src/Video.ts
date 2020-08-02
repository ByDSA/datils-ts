import { spawn } from 'child_process';
import paths from './Files';
import { getLastPartOf, removeExtensionOf, getAvailableFile } from './uri';

export namespace ffmpeg {
    export function exec(params: readonly string[] = []) {
        return spawn(paths.ffmpeg, params);
    }
}

export namespace m3u8 {
    type OptsType = { outPath?: string, filename?: string };
    export function download(url: string, opts: OptsType = {}) {
        let outPath = opts.outPath || paths.ffmpegOut;
        let filename = opts.filename || removeExtensionOf(getLastPartOf(url));
        outPath += `/${filename}`;
        outPath = getAvailableFile(outPath);
        return ffmpeg.exec(["-i", url, "-c", "copy", "-bsf:a", "aac_adtstoasc", outPath]);
    };
}