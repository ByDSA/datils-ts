import { execSync } from "child_process";
import { checkFileExists, checkFileNotExists, logGetLevel, logInfo, logSuccessVerbose } from "..";
import { DBOptions } from "./opts";

export type MySQLDumpOptions = DBOptions & { outFile?: string };
export function mysqldump({dockerContainer, password, host, name, username, outFile = "./backup.db"}: MySQLDumpOptions) {
  logInfo(`Backup MySQL db "${name}" ...`);
  checkFileNotExists(outFile);
  
  let cmd = "";
  if (dockerContainer)
    cmd += `sudo docker exec `;
   
  if (password)
    execSync(`MYSQL_PWD=${password}`);
  
  if (dockerContainer)
    cmd += dockerContainer + " ";

  cmd += `mysqldump ${name} > ${outFile}`;

  let options = {};
  if (logGetLevel() !== 'all')
    options = {...options, stdio: 'ignore'};
  execSync(cmd, options);

  checkFileExists(outFile);

  logSuccessVerbose(`Done! File: ${outFile}`);
}