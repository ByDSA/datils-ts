export type String = {
    unicodeToChar: (text: string) => string;
    fragment: (str: string, a: string, b: string, begin: boolean, end: boolean) => string;
}

export type Files = {
    paths: string;
}

export type Shell = {
    exec: (file: string, args: [], opts: {}) => any;
    pause: () => void;
}

export type Video = {
    ffmpeg: {
        path: string;
        outPath: string;
        exec: (params: [], opts: {}) => any;
    },
    m3u8: {
        download: (url: string, opts: {}) => void;
    }
}

export type Uri = {
    getLastPartOf: (uri: string) => string;
    removeExtensionOf: (uri: string) => string;
}