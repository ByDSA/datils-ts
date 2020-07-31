const removeExtensionOf = require('./uri').removeExtensionOf;
const getLastPartOf = require('./uri').getLastPartOf;
const Files = require('./Files');
const spawn = require('child_process').spawn;

let ffmpeg = {};

ffmpeg.exec = (params = []) => {
    return spawn(Files.paths.ffmpeg, params);
}

let m3u8 = {};
m3u8.download = (url, opts = {}) => {
    let outPath = opts.outPath || Files.paths.ffmpegOut;
    let filename = opts.filename || removeExtensionOf(getLastPartOf(url));
    outPath += `/${filename}`;
    return ffmpeg.exec(["-i", url, "-c", "copy", "-bsf:a", "aac_adtstoasc", outPath]);
};

module.exports.ffmpeg = ffmpeg;
module.exports.m3u8 = m3u8;