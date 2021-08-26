import { execSync } from "child_process";
import { constants, copyFileSync, existsSync, mkdirSync, rmdirSync } from "fs";
import { resolve } from "path";
import { DBOptions, pgDump } from "../db";
import { logInfo, logInfoVerbose, logSuccess, logSuccessVerbose } from "../log";
import { timestampOfNow } from "../time";

export type AppBackupArgs = {
  path: string;
  name?: string;
  dest?: string;
}

export type DBType = 'postgres';

export type DBOpts = {
  type: DBType
} & DBOptions;

function getFolderName(path: string) {
  const resolvedPath = resolve(path);
  return resolvedPath.substring(resolvedPath.lastIndexOf('/') + 1);
}

export class AppBackup {
  private path: string;
  private appName: string;
  private dest: string;
  private tmpFolder: string;
  private tmpDBsFolder: string;
  private tmpFilesFolder: string;
  private dbs: DBOpts[];
  private files: string[];
  private dateTimestamp: string;

  constructor({path, name, dest}: AppBackupArgs) {
    this.path = path;
    this.dest = dest ?? "..";
    this.appName = name ?? getFolderName(path);

    this.tmpFolder = `${path}/tmp`;
    this.tmpDBsFolder = `${this.tmpFolder}/dbs`;
    this.tmpFilesFolder = `${this.tmpFolder}/files`;
    this.dbs = [];
    this.files = [];
  }

  protected prepare() {
    this.dateTimestamp = timestampOfNow();
    this.removeTmp();
    logInfoVerbose(`Creating temp folder ${this.tmpFolder} ...`);
    mkdirSync(this.tmpFolder);
    
    if (this.files.length > 0)
      mkdirSync(this.tmpFilesFolder);

    if (this.dbs.length > 0)
      mkdirSync(this.tmpDBsFolder);
  }

  private removeTmp() {
    if (existsSync(this.tmpFolder)) {
      logInfoVerbose("Removing temp files ...");
      rmdirSync(this.tmpFolder, { recursive: true });
    }
  }

  make() {
    this.prepare();
    this.process();
    this.clear();
  }

  private clear() {
    this.removeTmp();
  }

  protected process() {
    this.prepare();
  
    try {
      this.backupDB();
      this.backupFiles();
      this.compress();
      this.clear();
      logSuccess(`${this.appName} backup is done!`);
    } catch(e) {
      throw e;
    };
  }

  private compress() {
    logInfo("Compressing files ...");
    const zipPath = `${this.dest}/${this.appName}-${this.dateTimestamp}.zip`;
    execSync(`cd ${this.tmpFolder} && zip -r ${zipPath} ./*`);
    logSuccessVerbose("Done!");
  }

  private backupFiles() {
    logInfoVerbose(`Backup files ...`);
    for(const file of this.files)
      this.backupFile(file);
    logSuccessVerbose("Files backup done!");
  }

  private backupFile(file: string) {
    logInfoVerbose(`Backup ${file} ...`);
    try {
      copyFileSync(`${this.path}/${file}`,
      `${this.tmpFilesFolder}/${file}`,
       constants.COPYFILE_EXCL);
    } catch(e) {
      throw e;
    }
    logSuccessVerbose(`File backup "${file}" done!`);
  }

  addDB(dbOpts: DBOpts) {
    this.dbs.push(dbOpts);
  }

  addFile(file: string) {
    this.files.push(file);
  }

  backupDB() {
    for(const db of this.dbs) {
      let dbEdited = db;
      if (!dbEdited.outFile) {
        const date = timestampOfNow();
        dbEdited.outFile = `${this.tmpDBsFolder}/${dbEdited.name}-${date}.db`;
      }
      if (dbEdited.type === 'postgres')
        pgDump(dbEdited);
    }
  }
}