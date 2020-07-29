export declare class String {
    static unicodeToChar: (text: string) => string;
    static fragment: (str: string, a: string, b: string, begin: boolean, end: boolean) => string;
}

export declare class Files {
    static paths: string;
}

export declare class Shell {
    static exec: (file: string, args: [], opts: {}) => any;
    static pause: () => void;
}

export declare class Video {
    static ffmpeg: {
        path: string;
        outPath: string;
        exec: (params: [], opts: {}) => any;
    }
    static m3u8: {
        download: (url: string, opts: {}) => void;
    }
}

export declare class Uri {
    getLastPartOf: (uri: string) => string;
    removeExtensionOf: (uri: string) => string;
}