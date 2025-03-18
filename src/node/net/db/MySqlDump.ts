import { execSync } from "node:child_process";
import path from "node:path";
import { DBDump, DBDumpParams } from "./DBDump";

export class MySqlDump extends DBDump {
  // GENERADO ENTERO POR COPILOT, NO PROBADO
  dump() {
    const { dockerContainer, password, host, port, name, username, outFile = "./backup.db" }: DBDumpParams = this.params;

    console.log(`Backup MySQL db "${name}" from "${host}:${port}" ...`);

    const outFileAbs = path.resolve(outFile);
    let cmd = "sudo ";

    if (dockerContainer)
      cmd += "docker exec -e";

    if (password)
      cmd += `MYSQL_PWD=${password} `;

    if (dockerContainer)
      cmd += `${dockerContainer} `;

    cmd += `mysqldump -h ${host} -P ${port} -u ${username} ${name} > "${outFileAbs}"`;

    const options = {};

    execSync(cmd, options);
  }
}
