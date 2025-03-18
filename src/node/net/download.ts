import { execSync } from "node/os/linux";

export type DownloadOptions = {
  folder?: string;
  filename?: string;
  filepath?: string;
};

export function download(url: URL, opts: DownloadOptions = {} ) {
  const args: string[] = [];

  args.push("wget");

  if (opts.filepath)
    args.push("-O", opts.filepath);

  if (opts.folder && opts.filename)
    args.push("-O", `${opts.filename}/${opts.filename}`);
  else if (opts.folder)
    args.push(`--directory-prefix=${opts.folder}`);
  else if (opts.filename)
    args.push("-O", opts.filename);
  else
    args.push("--content-disposition");

  args.push(`"${url.toString()}"`);

  execSync(...args);
}
