const exec = require('./shell').exec;
const uri = require('./uri');

let ffmpeg = {};

ffmpeg.path = "F:/Google Drive/dsa21may/Programas/Video/ffmpeg/ffmpeg.exe";
ffmpeg.outPath = "C:/Users/Daniel/Desktop";

ffmpeg.exec = async (params = [], opts = {}) => {
    return await exec(ffmpeg.path, params, opts);
}

let m3u8 = {};
m3u8.download = async (url, opts = {}) => {
    let outPath = opts.outPath || ffmpeg.outPath;
    let filename = opts.filename || uri.removeExtensionOf( uri.getLastPartOf(url) );
    outPath += `/${filename}`;
    return await ffmpeg.exec(["-i", url, "-c",  "copy", "-bsf:a", "aac_adtstoasc", outPath]);
};

module.exports.ffmpeg = ffmpeg;
module.exports.m3u8 = m3u8;