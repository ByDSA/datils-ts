"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableFile = exports.removeExtensionOf = exports.getLastPartOf = void 0;
const fs = require("fs");
const path = require("path");
function getLastPartOf(uri) {
    return uri.substring(uri.lastIndexOf('/') + 1);
}
exports.getLastPartOf = getLastPartOf;
function removeExtensionOf(uri) {
    return uri.substring(0, uri.lastIndexOf("."));
}
exports.removeExtensionOf = removeExtensionOf;
;
function getAvailableFile(pathString) {
    if (fs.existsSync(pathString)) {
        const folders = path.dirname(pathString);
        const basename = path.basename(pathString);
        const lastPointIndex = basename.lastIndexOf(".");
        const nameWithoutExt = lastPointIndex < 0 ? basename : basename.substr(0, lastPointIndex);
        const extension = lastPointIndex < 0 ? "" : basename.substr(lastPointIndex + 1);
        const renamedNumber = getRenamedNumber(nameWithoutExt);
        if (renamedNumber.num < 0)
            renamedNumber.num = 1;
        return `${folders}/${renamedNumber.name} (${renamedNumber.num + 1}).${extension}`;
    }
    return pathString;
}
exports.getAvailableFile = getAvailableFile;
function getRenamedNumber(basenameWithoutExt) {
    const NOT_FOUND = { num: -1, name: basenameWithoutExt };
    const numberWithParsMatch = basenameWithoutExt.match('\\((\\d)+\\)$');
    if (!numberWithParsMatch)
        return NOT_FOUND;
    const numberWithPars = numberWithParsMatch[0];
    const renamedNumberMatch = numberWithPars.match("\\d+");
    if (!renamedNumberMatch)
        return NOT_FOUND;
    const nameWithoutNumber = basenameWithoutExt.substr(0, numberWithParsMatch.index).trim();
    return { num: +renamedNumberMatch[0], name: nameWithoutNumber };
}
