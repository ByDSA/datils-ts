import { copyFileSync, existsSync, rmSync } from "fs";
import path from "path";
import DBDump from "../cmd/db/DBDump.ts";
import find from "../cmd/find.ts";
import zip from "../cmd/zip/index.ts";
import { mkdir } from "../fs.ts";
import { timestampOfNowUTC } from "../time.ts";

type TmpInfo = {
  folder: string;
  filesFolder: string;
  dbFolder: string;
};

type FileInfo = {
  path: string;
};

type Params = {
  basePath?: string;
  name?: string;
  filename?: string;
  outFolder?: string;
};

function givenOrPwd(given?: string) {
  if (given)
    return path.resolve(given);

  return path.resolve(`${process.cwd()}`);
}

export default class AppBackup {
  #basePath: string;

  #appName?: string;

  #outFolder: string;

  #filename?: string;

  #tmpInfo: TmpInfo;

  #dbs: DBDump[];

  #files: FileInfo[];

  #dateTimestamp!: string;

  constructor( { basePath, name, outFolder, filename }: Params) {
    this.#filename = filename ? path.resolve(filename) : undefined;
    this.#basePath = givenOrPwd(basePath);
    this.#outFolder = givenOrPwd(outFolder);

    this.#appName = name ?? path.basename(this.#basePath);

    const tmpFolder = `${this.#basePath}/.__tmp__`;

    this.#tmpInfo = {
      folder: tmpFolder,
      dbFolder: `${tmpFolder}/dbs`,
      filesFolder: `${tmpFolder}/files`,
    };
    this.#dbs = [];
    this.#files = [];
  }

  async #prepare() {
    this.#dateTimestamp = timestampOfNowUTC();
    this.#removeTmp();
    await mkdir(this.#tmpInfo.folder);

    if (this.#files.length > 0)
      await mkdir(this.#tmpInfo.filesFolder);

    if (this.#dbs.length > 0)
      await mkdir(this.#tmpInfo.dbFolder);
  }

  #removeTmp() {
    if (existsSync(this.#tmpInfo.folder)) {
      console.log("Removing temp files ...");
      rmSync(this.#tmpInfo.folder, {
        recursive: true,
      } );
    }
  }

  async make() {
    await this.#prepare();
    try {
      await this.#process();
    } finally {
      await this.#clear();
    }
  }

  #clear() {
    this.#removeTmp();
  }

  async #process() {
    await this.#backupDB();
    await this.#backupFiles();
    await this.#compress();
    await this.#clear();
    console.log(`${this.#appName} backup is done!`);
  }

  async #compress() {
    const filename = this.#filename ?? `${this.#appName}-${this.#dateTimestamp}.zip`;
    const zipPath = `${this.#outFolder}/${filename}`;

    await zip( {
      inputFolder: this.#tmpInfo.folder,
      out: zipPath,
    } );
  }

  async #backupFiles() {
    for (const file of this.#files)
      // eslint-disable-next-line no-await-in-loop
      await this.#backupFile(file.path);
  }

  async #backupFile(file: string) {
    const relativeFilePath = file.replace(this.#basePath, ".");
    const destPath = path.resolve(`${this.#tmpInfo.filesFolder}/${relativeFilePath}`);
    const filePath = path.resolve(`${relativeFilePath}`);

    await mkdir(path.dirname(destPath));
    copyFileSync(filePath, destPath);
  }

  // eslint-disable-next-line require-await
  async addDB(db: DBDump) {
    this.#dbs.push(db);

    return this;
  }

  // eslint-disable-next-line require-await
  async addFile(file: FileInfo) {
    this.#files.push(file);

    return this;
  }

  async addFiles(pattern: string) {
    const files = find( {
      pattern,
      folder: this.#basePath,
    } );

    for (const envFile of files) {
      // eslint-disable-next-line no-await-in-loop
      await this.addFile( {
        path: envFile,
      } );
    }

    return this;
  }

  #backupDB() {
    for (const db of this.#dbs) {
      let { outFile } = db.params;

      if (!outFile) {
        const { name } = db.params;
        const timestamp = timestampOfNowUTC();

        outFile = `${this.#tmpInfo.dbFolder}/${name}-${timestamp}.db`;
      }

      db.dump( {
        ...db.params,
        outFile,
      } );
    }
  }
}
