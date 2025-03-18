import { execSync } from "node:child_process";
import { DBOptions } from "./opts";

export type MySQLDumpOptions = DBOptions & { outFile?: string };

export function mysqldump( { dockerContainer, password, name, outFile = "./backup.db" }: MySQLDumpOptions) {
  console.log(`Backup MySQL db "${name}" ...`);

  let cmd = "";

  if (dockerContainer)
    cmd += "sudo docker exec ";

  if (password)
    execSync(`MYSQL_PWD=${password}`);

  if (dockerContainer)
    cmd += `${dockerContainer} `;

  cmd += `mysqldump ${name} > ${outFile}`;

  const options = {};

  execSync(cmd, options);

  console.log(`Done! File: ${outFile}`);
}
