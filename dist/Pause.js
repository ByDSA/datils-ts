"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
};
