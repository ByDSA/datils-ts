import { execSync } from "child_process";
import path from "path";
import { exec } from "../docker/index";
import DBDump, { DBDumpParams } from "./DBDump";

export default class PgDump extends DBDump {
  async dump() {
    const { dockerContainer, password, host, port, name, username }: DBDumpParams = this.params;

    console.log(`Backup Postgres db "${name}" from "${host}:${port}" ...`);

    const outFile = this.params.outFile ?? "./backup.db";
    const outFileAbs = path.resolve(outFile);
    const params = {
      env: {
        PGPASSWORD: password,
      },
    };
    const cmd = `pg_dump -h ${host} -p ${port} -U ${username} -v -Fc ${name} > "${outFileAbs}"`;

    if (dockerContainer) {
      await exec( {
        ...params,
        sudo: true,
        container: dockerContainer,
        cmd,
      } );
    } else {
      const options = {
      };

      await execSync(cmd, options);
    }
  }
}
