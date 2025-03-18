import { execSync } from "node:child_process";
import path from "node:path";
import { mkdir } from "..";

type ZipParams = {
  inputFolder: string;
  out: string;
};
export async function zip( { inputFolder, out }: ZipParams) {
  const currentFolder = process.cwd();

  execSync(`cd "${inputFolder}"`);
  const outFolder = path.dirname(out);

  await mkdir(outFolder);
  try {
    await new Promise((s) => {
      const r = execSync(`zip -r "${out}" ./*`);

      s(r);
    } );
  } catch (e: any) {
    if (!e.stdout.includes("Nothing to do"))
      throw e;
  }
  execSync(`cd ${currentFolder}`);
}
