import { execSync } from "child_process";

export type DownloadOptions = {
    folder?: string,
    filename?: string
    filepath?: string
}

export function download(url: URL, opts: DownloadOptions = {}) {
    let opt: {} = { stdio: 'pipe' };
    let args: string[] = [];

    args.push("wget");

    if (opts.filepath)
        args.push("-O", opts.filepath);
    if (opts.folder && opts.filename) {
        args.push("-O", opts.filename + "/" + opts.filename);
    } else if (opts.folder) {
        args.push("--directory-prefix=" + opts.folder);
    } else if (opts.filename) {
        args.push("-O", opts.filename);
    } else {
        args.push("--content-disposition");
    }

    args.push(`"${url.toString()}"`);

    const cmd = `${args.reduce(str => " " + str)}`;
    execSync(cmd, opt);
}

// Source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export function isValidURL(str: string): boolean {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }