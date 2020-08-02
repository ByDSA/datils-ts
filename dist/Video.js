"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m3u8 = exports.ffmpeg = void 0;
const child_process_1 = require("child_process");
const Files_1 = require("./Files");
const uri_1 = require("./uri");
var ffmpeg;
(function (ffmpeg) {
    function exec(params = []) {
        return child_process_1.spawn(Files_1.default.ffmpeg, params);
    }
    ffmpeg.exec = exec;
})(ffmpeg = exports.ffmpeg || (exports.ffmpeg = {}));
var m3u8;
(function (m3u8) {
    function download(url, opts = {}) {
        let outPath = opts.outPath || Files_1.default.ffmpegOut;
        let filename = opts.filename || uri_1.removeExtensionOf(uri_1.getLastPartOf(url));
        outPath += `/${filename}`;
        outPath = uri_1.getAvailableFile(outPath);
        return ffmpeg.exec(["-i", url, "-c", "copy", "-bsf:a", "aac_adtstoasc", outPath]);
    }
    m3u8.download = download;
    ;
})(m3u8 = exports.m3u8 || (exports.m3u8 = {}));
