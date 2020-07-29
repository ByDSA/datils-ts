const spawn = require('child_process').spawn;

let shell = {};

shell.exec = (file, args = [], opts = {}) => {
    let shellInstance = spawn(file, args);
    shellInstance.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    shellInstance.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    shellInstance.on('exit', function (code) {
        if (code)
            console.log('Process exited with code ' + code.toString());
    });

    return shellInstance;
};

shell.pause = () => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
};

module.exports = shell;