"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pause = void 0;
function pause() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}
exports.pause = pause;
;
