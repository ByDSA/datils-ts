const uri = require('./uri');
const spawn = require('child_process').spawn;

let ffmpeg = {};

ffmpeg.exec = (params = []) => {
    return spawn(ffmpeg.path, params);
}

let m3u8 = {};
m3u8.download = (url, opts = {}) => {
    let outPath = opts.outPath || ffmpeg.outPath;
    let filename = opts.filename || uri.removeExtensionOf(uri.getLastPartOf(url));
    outPath += `/${filename}`;
    return ffmpeg.exec(["-i", url, "-c", "copy", "-bsf:a", "aac_adtstoasc", outPath]);
};

module.exports.ffmpeg = ffmpeg;
module.exports.m3u8 = m3u8;