/// <reference types="node" />
export declare namespace ffmpeg {
    function exec(params?: readonly string[]): import("child_process").ChildProcessWithoutNullStreams;
}
export declare namespace m3u8 {
    type OptsType = {
        outPath?: string;
        filename?: string;
    };
    export function download(url: string, opts?: OptsType): import("child_process").ChildProcessWithoutNullStreams;
    export {};
}
