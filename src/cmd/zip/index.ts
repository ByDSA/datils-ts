import path from "path";
import { $, cd } from "zx";
import { mkdir } from "../../fs.ts";

type ZipParams = {
  inputFolder: string;
  out: string;
};
export default async function zip( { inputFolder, out }: ZipParams) {
  const currentFolder = process.cwd();

  await cd(inputFolder);
  const outFolder = path.dirname(out);

  await mkdir(outFolder);
  try {
    await $`zip -r "${out}" ./*`;
  } catch (e: any) {
    if (!e.stdout.includes("Nothing to do"))
      throw e;
  }
  await cd(currentFolder);
}
