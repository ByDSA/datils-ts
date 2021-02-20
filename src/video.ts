import { spawn } from 'child_process';

import { getLastPartOf, removeExtensionOf, getAvailableFile } from './uri';

export namespace ffmpeg {
    export function exec(params: readonly string[] = []) {
        if (!process.env.FFMPEG_PATH) {
            console.log("No env FFMPEG_PATH");
            process.exit(1);
        }
        return spawn(process.env.FFMPEG_PATH, params);
    }
}

export namespace M3U8 {
    type OptsType = { outPath?: string, filename?: string };
    export function download(url: string, opts: OptsType = {}) {
        let outPath = opts.outPath;
        let filename = opts.filename || removeExtensionOf(getLastPartOf(url));
        outPath += `/${filename}`;
        outPath = getAvailableFile(outPath);
        return ffmpeg.exec(["-i", url, "-c", "copy", "-bsf:a", "aac_adtstoasc", outPath]);
    };
}