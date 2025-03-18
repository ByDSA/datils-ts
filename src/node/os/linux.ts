import { execSync as execSyncImported, ExecSyncOptionsWithStringEncoding } from "node:child_process";
import { download, isValidURL } from "../net";
import longnames from "./longnames.json";

export function isInstalled(application: string): boolean {
  const count = getCount(application);

  return count >= 1;
}

function getCount(name: string) {
  const cmd = `sudo dpkg-query -s "${name}" | grep -c "Status: install"`;

  try {
    const p = execSyncImported(cmd);

    return +p.toString();
  } catch (error: any) {
    return error.stdout.toString();
  }
}

function getURLFromRegistry(app: string): URL | null {
  switch (app) {
    case "code":
      return new URL("https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64");
    default: return null;
  }
}

function getLongName(app: string): string {
  return (longnames as Record<string, string> | undefined)?.[app] ?? app;
}

export type InstallOptions = {
    y: boolean;
};
const defaultInstallOptions: InstallOptions = {
  y: true,
};

export function install(app: string): boolean {
  let ret = false;

  if (isValidURL(app))
    ret = installUrl(new URL(app));
  else {
    if (isInstalled(app)) {
      console.log(`${getLongName(app)} already installed!`);

      return false;
    }

    const urlRegistry = getURLFromRegistry(app.toLowerCase());

    if (urlRegistry)
      ret = installUrl(urlRegistry);
    else
      ret = installApt(app);
  }

  if (ret)
    console.log("Installed!");

  return ret;
}

function installApt(app: string, opts = defaultInstallOptions): boolean {
  const optsArray: string[] = [];

  if (opts.y)
    optsArray.push("-y");

  execSync("sudo", "apt", "install", app, ...optsArray);

  return true;
}

function installUrl(url: URL): boolean {
  const filepath = "./tmp.deb";

  download(url, {
    filepath,
  } );

  const ret = installApt(filepath);

  if (ret) {
    execSyncImported(`rm ${filepath}`);
    console.log(`Removed ${filepath}`);
  }

  return ret;
}

export function execSync(...args: string[]): void {
  const options: ExecSyncOptionsWithStringEncoding = {
    stdio: "pipe",
    encoding: "utf-8",
  };
  const cmd = args.reduce((prev, current, i) => (i > 0 ? `${prev} ${current}` : current));

  execSyncImported(cmd, options);
}
