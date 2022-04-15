import { copyFileSync, existsSync, rmSync } from "fs";
import path from "path";
import { $, cd, quiet } from "zx";
import DBDump from "../cmd/db/DBDump";
import { timestampOfNowUTC } from "../time";

type TmpInfo = {
  folder: string;
  filesFolder: string;
  dbFolder: string;
};

type FileInfo = {
  path: string;
};

type Params = {
  path: string;
  name: string;
  dest: string;
};

export default class AppBackup {
  #path: string;

  #appName: string;

  #dest: string;

  #tmpInfo: TmpInfo;

  #dbs: DBDump[];

  #files: FileInfo[];

  #dateTimestamp!: string;

  constructor( { path: p, name, dest }: Params) {
    this.#path = path.resolve(p);
    this.#dest = path.resolve(dest ?? ".");
    this.#appName = name ?? path.basename(p);

    const tmpFolder = `${p}/tmp`;

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
    await createFolder(this.#tmpInfo.folder);

    if (this.#files.length > 0)
      await createFolder(this.#tmpInfo.filesFolder);

    if (this.#dbs.length > 0)
      await createFolder(this.#tmpInfo.dbFolder);
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
    await this.#process();
    await this.#clear();
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
    const zipPath = `${this.#dest}/${this.#appName}-${this.#dateTimestamp}.zip`;

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
    const filePath = path.resolve(`${this.#path}/${file}`);
    const destPath = path.resolve(`${this.#tmpInfo.filesFolder}/${file}`);

    await createFolder(path.dirname(destPath));
    copyFileSync(filePath, destPath);
  }

  addDB(db: DBDump) {
    this.#dbs.push(db);
  }

  addFile(file: FileInfo) {
    this.#files.push(file);
  }

  async findAndAddEnvFiles() {
    const envFiles = (await quiet($`find . -type f -name "*.env"`))
      .stdout
      .split("\n")
      .filter((n) => n);

    for (const envFile of envFiles) {
      this.addFile( {
        path: envFile,
      } );
    }
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

async function zip( { inputFolder, out } ) {
  const currentFolder = process.cwd();

  await cd(inputFolder);
  const outFolder = path.dirname(out);

  await createFolder(outFolder);
  try {
    await $`zip -r "${out}" ./*`;
  } catch (e: any) {
    if (!e.stdout.includes("Nothing to do"))
      throw e;
  }
  await cd(currentFolder);
}

function createFolder(p) {
  return $`mkdir -p "${p}"`;
}
